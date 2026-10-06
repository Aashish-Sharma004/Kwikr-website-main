const features = [
  { icon: '🌱', title: 'Fresh Daily Stock', desc: 'Restocked every morning directly from farms and distributors' },
  { icon: '🚀', title: 'Fastest Delivery', desc: '10-minute delivery powered by our hyperlocal dark stores' },
  { icon: '🏷️', title: 'Lowest Prices', desc: 'We negotiate directly with farmers to give you the best deal' },
  { icon: '📦', title: '5000+ Products', desc: 'From fruits to household — everything under one roof' },
  { icon: '🛡️', title: 'Quality Assured', desc: 'Every product is quality-checked before it reaches you' },
  { icon: '🤝', title: 'Trusted by Locals', desc: 'Trusted by 50,000+ families across Bengaluru and growing' },
];

export default function WhyKwikr() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Why Choose Kwikr?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Thousands of families trust Kwikr for their daily groceries. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <div key={i} className="text-center p-5 rounded-2xl hover:bg-green-50 transition-colors group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-green-600 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '50,000+', label: 'Happy Customers' },
              { value: '10 Min', label: 'Avg. Delivery Time' },
              { value: '5000+', label: 'Products Available' },
              { value: '4.8★', label: 'App Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-black">{stat.value}</p>
                <p className="text-green-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
