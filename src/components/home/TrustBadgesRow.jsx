import { Zap, Award, ShieldCheck, RotateCcw } from 'lucide-react';

const badges = [
  { icon: Zap, title: '10-Minute Delivery', desc: 'Lightning fast doorstep delivery' },
  { icon: Award, title: 'Quality Assured', desc: '100% genuine & fresh products' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Safe & encrypted transactions' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'No questions asked returns' },
];

export default function TrustBadgesRow() {
  return (
    <section className="bg-white py-5 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map(b => {
          const Icon = b.icon;
          return (
            <div key={b.title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 leading-tight truncate">{b.title}</p>
                <p className="text-xs text-gray-400 leading-tight truncate">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
