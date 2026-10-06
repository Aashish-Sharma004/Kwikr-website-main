const promises = [
  { icon: '⚡', title: '10-Minute Delivery', desc: 'We promise to deliver your order in 10 minutes or your next order is on us.', color: 'bg-green-50 border-green-200', iconBg: 'bg-green-100' },
  { icon: '🌿', title: 'Always Fresh', desc: 'We source directly from farms every single day. Zero compromises on freshness.', color: 'bg-lime-50 border-lime-200', iconBg: 'bg-lime-100' },
  { icon: '💰', title: 'Best Prices', desc: 'We match or beat any local store price. No hidden charges, transparent pricing.', color: 'bg-yellow-50 border-yellow-200', iconBg: 'bg-yellow-100' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Not happy with quality? Return it. No questions asked, full refund guaranteed.', color: 'bg-blue-50 border-blue-200', iconBg: 'bg-blue-100' },
];

export default function DeliveryPromise() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Our Promise to You</h2>
          <p className="text-gray-400 max-w-lg mx-auto">We&apos;re not just a grocery delivery app — we&apos;re your neighborhood store, just faster and fresher.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promises.map((p, i) => (
            <div key={i} className={`${p.color} border rounded-2xl p-6 hover:shadow-md transition-shadow`}>
              <div className={`${p.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                {p.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
