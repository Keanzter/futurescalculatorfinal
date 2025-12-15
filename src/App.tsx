import { useState, useEffect } from 'react';

export default function FuturesRiskCalculator() {
  const [riskAmount, setRiskAmount] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [tickSize, setTickSize] = useState('');
  const [tickValue, setTickValue] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [contracts, setContracts] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  const calculateContracts = () => {
    const risk = parseFloat(riskAmount);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopPrice);
    const target = parseFloat(targetPrice);
    const size = parseFloat(tickSize);
    const value = parseFloat(tickValue);

    if (!risk || !entry || !stop || !size || !value) return;
    if (entry === stop) return;

    const priceDiff = Math.abs(entry - stop);
    const ticks = priceDiff / size;
    const riskPerContract = ticks * value;
    const numContracts = Math.floor(risk / riskPerContract);
    const pointValue = value / size;

    let riskReward = null;
    if (target) {
      const rewardDiff = Math.abs(target - entry);
      const riskDiff = Math.abs(entry - stop);
      riskReward = (rewardDiff / riskDiff).toFixed(2);
    }

    setContracts({
      numContracts,
      riskPerContract: riskPerContract.toFixed(2),
      totalRisk: (numContracts * riskPerContract).toFixed(2),
      ticks: ticks.toFixed(2),
      points: priceDiff.toFixed(2),
      pointValue: pointValue.toFixed(2),
      riskReward
    });
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #000000)' }}>
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        } 
        input[type=number] { 
          -moz-appearance: textfield; 
        } 
        @keyframes float { 
          0%, 100% { transform: translateY(0) translateX(0); } 
          25% { transform: translateY(-20px) translateX(10px); } 
          50% { transform: translateY(-10px) translateX(-10px); } 
          75% { transform: translateY(-30px) translateX(5px); } 
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gray-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.3,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 0
        }}
      />

      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-center">
          <div className="flex gap-6 text-sm">
            <button 
              onClick={() => setCurrentPage('home')}
className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-white' : 'text-gray-400'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('contracts')} 
              className={`hover:text-white transition-colors ${currentPage === 'contracts' ? 'text-white' : 'text-gray-400'}`}
            >
              Contract Guide
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              className={`hover:text-white transition-colors ${currentPage === 'about' ? 'text-white' : 'text-gray-400'}`}
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {currentPage === 'home' && (
        <div className="pt-24 px-8 pb-16 flex items-center justify-center min-h-screen relative z-10">
          <div className="w-full max-w-3xl">
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-light mb-4">Position Size Calculator <span className="text-2xl text-gray-500">(for futures)</span></h1>
              <p className="text-gray-400">Calculate the exact number of contracts to trade based on your risk parameters.</p>
            </div>

            <div className="border border-white/10 p-8 bg-white/5 backdrop-blur-xl shadow-2xl rounded-lg">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Risk ($)</label>
                  <input
                    type="number"
                    value={riskAmount}
                    onChange={(e) => setRiskAmount(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Entry Price</label>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    step="0.01"
                    className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Stop Loss</label>
                  <input
                    type="number"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(e.target.value)}
                    step="0.01"
                    className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Take Profit</label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    step="0.01"
                    className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Tick Size</label>
                  <input
                    type="number"
                    value={tickSize}
                    onChange={(e) => setTickSize(e.target.value)}
                    step="0.00001"

className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase text-center">Tick Value ($)</label>
                  <input
                    type="number"
                    value={tickValue}
                    onChange={(e) => setTickValue(e.target.value)}
                    step="0.01"
                    className="w-full bg-transparent border-b border-gray-800 py-2 text-xl focus:outline-none focus:border-white text-center"
                  />
                </div>
              </div>
              
              {contracts && (
                <div className="border-t border-gray-800 pt-6 mb-6">
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-xs text-gray-500 uppercase">Contracts</span>
                    <span className="text-6xl font-light">{contracts.numContracts}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block mb-1">Risk/Contract</span>
                      <span>${contracts.riskPerContract}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Total Risk</span>
                      <span>${contracts.totalRisk}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Points</span>
                      <span>{contracts.points}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Ticks</span>
                      <span>{contracts.ticks}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Point Value</span>
                      <span>${contracts.pointValue}</span>
                    </div>
                    {contracts.riskReward && (
                      <div>
                        <span className="text-gray-500 block mb-1">Risk:Reward</span>
                        <span className="text-green-400">1:{contracts.riskReward}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={calculateContracts}
                className="w-full py-3 bg-white/10 border border-white/20 text-white text-sm uppercase tracking-wider hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Calculate →
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">Created by LK via Claude</p>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'contracts' && (
        <div className="pt-24 px-8 pb-16 flex items-center justify-center min-h-screen relative z-10">
          <div className="w-full max-w-5xl">
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-light mb-4">Contract Guide</h1>
              <p className="text-gray-400">Reference specifications for common futures contracts.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">E-mini Contracts</h2>
                <div className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 bg-gray-900 text-xs uppercase tracking-wider text-gray-400">
                    <div className="p-2 border-r border-gray-800">Instr.</div>
                    <div className="p-2 border-r border-gray-800">Description</div>


<div className="p-2 border-r border-gray-800">Tick Size</div>
                    <div className="p-2 border-r border-gray-800">Tick Val</div>
                    <div className="p-2">Point Val</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-cyan-400">ES</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">S&P 500</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">0.25</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">$12.50</div>
                    <div className="p-2 text-cyan-400">$50.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-emerald-400">NQ</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">Nasdaq 100</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">0.25</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">$5.00</div>
                    <div className="p-2 text-emerald-400">$20.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-blue-400">YM</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">Dow</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">1.00</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">$5.00</div>
                    <div className="p-2 text-blue-400">$5.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-green-400">RTY</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">Russell 2000</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">0.10</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">$5.00</div>
                    <div className="p-2 text-green-400">$50.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-teal-400">6E</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">Euro FX</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">0.0001</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">$6.25</div>
                    <div className="p-2 text-teal-400">$6.25</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-sky-400">CL</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">Crude Oil</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">0.01</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">$10.00</div>
                    <div className="p-2 text-sky-400">$1,000</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-indigo-400">GC</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">Gold</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">0.10</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">$10.00</div>
                    <div className="p-2 text-indigo-400">$100.00</div>
                  </div>

<div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-teal-500">ZB</div>
                    <div className="p-2 border-r border-gray-800 text-teal-500">30-Yr T-Bond</div>
                    <div className="p-2 border-r border-gray-800 text-teal-500">0.03125</div>
                    <div className="p-2 border-r border-gray-800 text-teal-500">$31.25</div>
                    <div className="p-2 text-teal-500">$1,000</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Micro Contracts</h2>
                <div className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 bg-gray-900 text-xs uppercase tracking-wider text-gray-400">
                    <div className="p-2 border-r border-gray-800">Instr.</div>
                    <div className="p-2 border-r border-gray-800">Description</div>
                    <div className="p-2 border-r border-gray-800">Tick Size</div>
                    <div className="p-2 border-r border-gray-800">Tick Val</div>
                    <div className="p-2">Point Val</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-cyan-400">MES</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">Micro S&P</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">0.25</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-400">$1.25</div>
                    <div className="p-2 text-cyan-400">$5.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-emerald-400">MNQ</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">Micro Nasdaq</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">0.25</div>
                    <div className="p-2 border-r border-gray-800 text-emerald-400">$0.50</div>
                    <div className="p-2 text-emerald-400">$2.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-blue-400">MYM</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">Micro Dow</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">1.00</div>
                    <div className="p-2 border-r border-gray-800 text-blue-400">$0.50</div>
                    <div className="p-2 text-blue-400">$0.50</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-green-400">M2K</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">Micro Russell</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">0.10</div>
                    <div className="p-2 border-r border-gray-800 text-green-400">$0.50</div>
                    <div className="p-2 text-green-400">$5.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-teal-400">M6E</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">Micro Euro</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">0.0001</div>
                    <div className="p-2 border-r border-gray-800 text-teal-400">$1.25</div>


<div className="p-2 text-teal-400">$1.25</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-sky-400">MCL</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">Micro Crude</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">0.01</div>
                    <div className="p-2 border-r border-gray-800 text-sky-400">$1.00</div>
                    <div className="p-2 text-sky-400">$100.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-indigo-400">MGC</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">Micro Gold</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">0.10</div>
                    <div className="p-2 border-r border-gray-800 text-indigo-400">$1.00</div>
                    <div className="p-2 text-indigo-400">$10.00</div>
                  </div>
                  <div className="grid grid-cols-5 text-xs border-t border-gray-800">
                    <div className="p-2 border-r border-gray-800 text-cyan-300">MBT</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-300">Micro Bitcoin</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-300">5.00</div>
                    <div className="p-2 border-r border-gray-800 text-cyan-300">$0.50</div>
                    <div className="p-2 text-cyan-300">$0.10</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">Created by LK via Claude</p>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'about' && (
        <div className="pt-24 px-8 pb-16 flex items-center justify-center min-h-screen relative z-10">
          <div className="w-full max-w-3xl">
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-light mb-4">About</h1>
            </div>
            
            <div>
              <p className="text-3xl font-light text-gray-300 mb-8 text-center">
                Empowering traders with risk management.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6 text-center">
                Professional futures traders know that position sizing is the foundation of risk management. This calculator helps you determine exactly how many contracts to trade based on your risk tolerance, ensuring you never overextend your account.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6 text-center">
                Whether you're trading E-mini indices, commodities, or micro contracts, accurate position sizing keeps you in control of your trading journey.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed text-center">
                Simply input your risk amount, contract specifications, entry price, and stop loss to calculate the optimal number of contracts for your trade.
              </p>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">Created by LK via Claude</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





