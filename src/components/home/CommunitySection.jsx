import { Instagram, Heart, MessageCircle } from 'lucide-react';

const posts = [
  { image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', likes: 342, comments: 18 },
  { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', likes: 512, comments: 27 },
  { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', likes: 289, comments: 14 },
  { image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&q=80', likes: 673, comments: 41 },
  { image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', likes: 198, comments: 9 },
  { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', likes: 445, comments: 22 },
];

export default function CommunitySection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Instagram size={26} className="text-pink-500" /> Join Our Community
            </h2>
            <p className="text-gray-400 text-sm mt-1">Follow @kwikr for recipes, offers &amp; behind-the-scenes</p>
          </div>
          <a
            href="#"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Follow @kwikr
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
              <img src={post.image} alt="Community post" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <span className="flex items-center gap-1 text-white text-xs font-bold"><Heart size={13} className="fill-white" /> {post.likes}</span>
                <span className="flex items-center gap-1 text-white text-xs font-bold"><MessageCircle size={13} className="fill-white" /> {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
