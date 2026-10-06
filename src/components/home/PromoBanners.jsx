import Link from 'next/link';
import Image from 'next/image';

const banners = [
  {
    tag: 'Fresh & Organic',
    title: 'Fruits & Vegetables\nFor Every Need',
    subtitle: 'Sourced fresh from farms daily',
    cta: 'Shop Produce',
    href: '/products?category=fruits-vegetables',
    bg: 'bg-[#ecfdf5]',
    border: 'border-green-200',
    tagColor: 'bg-green-100 text-green-700',
    titleColor: 'text-green-900',
    subtitleColor: 'text-green-600',
    btnBg: 'bg-green-600 hover:bg-green-700 text-white',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
  },
  {
    tag: 'Start Your Day',
    title: 'Make Your Breakfast\nHealthy & Easy',
    subtitle: 'Dairy, eggs & bread delivered fresh',
    cta: 'Shop Breakfast',
    href: '/products?category=dairy-milk',
    bg: 'bg-[#fffbeb]',
    border: 'border-amber-200',
    tagColor: 'bg-amber-100 text-amber-700',
    titleColor: 'text-amber-900',
    subtitleColor: 'text-amber-600',
    btnBg: 'bg-amber-500 hover:bg-amber-600 text-white',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80',
  },
];

export default function PromoBanners() {
  return (
    <section className="bg-gray-50 border-b border-gray-100 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {banners.map((b, i) => (
            <div
              key={i}
              className={`${b.bg} border ${b.border} rounded-xl overflow-hidden flex items-stretch min-h-[148px]`}
            >
              {/* Text side */}
              <div className="flex-1 p-5 flex flex-col justify-center">
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 w-fit ${b.tagColor}`}>
                  {b.tag}
                </span>
                <h3 className={`text-base font-black ${b.titleColor} mb-1 whitespace-pre-line leading-snug`}>
                  {b.title}
                </h3>
                <p className={`text-xs ${b.subtitleColor} mb-3`}>{b.subtitle}</p>
                <Link
                  href={b.href}
                  className={`inline-flex items-center gap-1.5 ${b.btnBg} font-bold text-xs px-4 py-2 rounded-lg transition-colors w-fit`}
                >
                  {b.cta} →
                </Link>
              </div>

              {/* Image side */}
              <div className="relative w-40 sm:w-48 flex-shrink-0">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
