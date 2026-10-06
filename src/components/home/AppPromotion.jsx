export default function AppPromotion() {
  return (
    <section className="py-12 bg-gray-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 border border-green-500/30">
              📱 Download the App
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Order Smarter with<br />
              <span className="text-green-400">Kwikr App</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Get exclusive app-only deals, track your delivery live, and reorder your favorites in one tap.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: '🔔', text: 'Real-time delivery tracking' },
                { icon: '💸', text: 'App-exclusive discounts up to 30% off' },
                { icon: '⚡', text: '1-tap reorder for your regulars' },
                { icon: '📍', text: 'Save multiple delivery addresses' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-gray-300">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-56 h-96 bg-gray-800 rounded-[3rem] border-4 border-gray-700 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-1 bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-green-600 h-12 flex items-center justify-between px-4">
                    <div className="w-16 h-4 bg-black rounded-full mx-auto" />
                  </div>
                  <div className="bg-green-600 p-3 -mt-1">
                    <p className="text-white text-xs font-bold">📍 Delivering to Koramangala</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 bg-white/20 rounded-lg h-7 flex items-center px-2">
                        <span className="text-white/70 text-xs">🔍 Search groceries...</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="bg-orange-400 rounded-xl p-3 text-white">
                      <p className="text-xs font-bold">🚀 10 Min Delivery</p>
                      <p className="text-xs opacity-80">Track your order live</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['🥦', '🥛', '🍎', '🍞', '🥚', '🧀'].map((e, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-xl">{e}</div>
                          <div className="h-1.5 bg-gray-200 rounded mt-1" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                      <p className="text-xs font-bold text-green-700">🎉 App Exclusive Deal</p>
                      <p className="text-xs text-gray-500">30% off your first order</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-10 bg-white rounded-xl shadow-lg px-3 py-2 text-center border border-gray-100">
                <p className="text-lg font-black text-green-600">4.8</p>
                <p className="text-xs text-gray-400">★ Rating</p>
              </div>
              <div className="absolute -left-8 bottom-20 bg-green-600 rounded-xl shadow-lg px-3 py-2 text-center text-white">
                <p className="text-lg font-black">50K+</p>
                <p className="text-xs text-green-200">Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
