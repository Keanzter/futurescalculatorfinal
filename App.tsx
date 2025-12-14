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