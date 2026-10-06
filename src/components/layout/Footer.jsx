import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, CreditCard, Smartphone, Wallet, Banknote, Apple, PlayCircle } from 'lucide-react';


const footerLinks = {
  company: [
    { name: 'About Kwikr', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Partner With Us', href: '/partner' },
  ],
  categories: [
    { name: 'Fruits & Vegetables', href: '/products?category=fruits-vegetables' },
    { name: 'Dairy & Milk', href: '/products?category=dairy-milk' },
    { name: 'Snacks & Beverages', href: '/products?category=snacks' },
    { name: 'Atta, Rice & Pulses', href: '/products?category=atta-rice' },
    { name: 'Household Items', href: '/products?category=household' },
    { name: 'Personal Care', href: '/products?category=personal-care' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Return Policy', href: '/return' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  areas: ['Koramangala', 'Indiranagar', 'Jayanagar', 'HSR Layout', 'Whitefield', 'Electronic City', 'Marathahalli', 'BTM Layout'],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">K</span>
              </div>
              <span className="text-2xl font-black text-white">Kwikr</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Kwikr delivers fresh groceries, daily essentials, and household items to your doorstep in just 10 minutes. Shop smarter, live fresher.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} className="text-green-500 flex-shrink-0" />
                <span>Rajasthan, Jaipur, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-green-500 flex-shrink-0" />
                <span>1800-KWIKR (1800-476-959)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-green-500 flex-shrink-0" />
                <span>support@kwikr.com</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 mb-5">
              {[
                { icon: <Instagram size={16} />, href: 'https://www.instagram.com/fourpaysave?igsh=MTJjYzU4ZHU3dzYzdg' },
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Facebook size={16} />, href: 'https://www.facebook.com/people/Fourpaysave/61578041589600/?mibextid=rS40aB7S9Ucbxw6v' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>

             <h4 className="text-white font-semibold mb-3 text-sm">Download The App</h4>
<div className="flex flex-wrap gap-2">
  <a 
    href="https://play.google.com/store/search?q=kwikr&c=apps" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
  >
    <Apple size={20} className="text-white flex-shrink-0" />
    <div className="leading-none">
      <p className="text-[9px] text-gray-400">Download on the</p>
      <p className="text-xs font-bold text-white">App Store</p>
    </div>
  </a>

  <a 
    href="https://play.google.com/store/search?q=kwikr%20google&c=apps" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
  >
    <PlayCircle size={20} className="text-white flex-shrink-0" />
    <div className="leading-none">
      <p className="text-[9px] text-gray-400">Get it on</p>
      <p className="text-xs font-bold text-white">Google Play</p>
    </div>
  </a>
</div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(l => (
                <li key={l.name}><Link href={l.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map(l => (
                <li key={l.name}><Link href={l.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map(l => (
                <li key={l.name}><Link href={l.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">{l.name}</Link></li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-3">Delivery Areas</h4>
            <div className="flex flex-wrap gap-1.5">
              {footerLinks.areas.map(area => (
                <span key={area} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-md">{area}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <span className="text-xs text-gray-500 font-semibold hidden sm:inline">We Accept</span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { icon: <Smartphone size={13} />, label: 'UPI' },
              { icon: <CreditCard size={13} />, label: 'Cards' },
              { icon: <Wallet size={13} />, label: 'Wallets' },
              { icon: <Banknote size={13} />, label: 'COD' },
            ].map(p => (
              <span key={p.label} className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-semibold px-2.5 py-1.5 rounded-md">
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">© 2024 Kwikr Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>🚀 10-Minute Delivery</span>
            <span>🌿 Fresh Guarantee</span>
            <span>💳 Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
