import { Smartphone, PackageCheck, Bike, Home } from 'lucide-react';

const steps = [
  { icon: Smartphone, title: 'Place Your Order', desc: 'Browse & add your favorite groceries to the cart in seconds' },
  { icon: PackageCheck, title: 'We Pack It Fresh', desc: 'Your order is picked and packed at our nearest dark store' },
  { icon: Bike, title: 'Out For Delivery', desc: 'A delivery partner is dispatched to your location instantly' },
  { icon: Home, title: 'Delivered in 10 Mins', desc: 'Your groceries arrive fresh, right at your doorstep' },
];

export default function HowItWorksSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">How Kwikr Delivery Works</h2>
          <p className="text-gray-400 text-sm md:text-base">From click to doorstep in four simple steps</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-3 relative">
                  <Icon size={26} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
