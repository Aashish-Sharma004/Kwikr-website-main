'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Shield, RotateCcw, Zap, Leaf } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import QuantityCounter from '@/components/ui/QuantityCounter';
import ProductCard from '@/components/ui/ProductCard';
import FrequentlyBoughtTogether from '@/components/home/FrequentlyBoughtTogether';
import ShareModal from '@/components/layout/ShareModal';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }) {
  const product = getProductById(parseInt(params.id));
  const [selectedWeight, setSelectedWeight] = useState(0);

  // Gallery images - falls back to repeating product.image if no `images` array exists in data
  const galleryImages = product?.images && product.images.length > 0
    ? product.images
    : [product?.image, product?.image, product?.image];

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { addItem, getItemQuantity, updateQuantity, removeItem, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { trackView } = useRecentlyViewed();

  useEffect(() => {
    if (product) trackView(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  // Reset selected image whenever the product changes (e.g. navigating between products)
  useEffect(() => {
    if (product) setSelectedImage(product.image);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <Link href="/products" className="text-green-600 font-semibold hover:underline">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const qty = getItemQuantity(product.id);
  const wishlist = isWishlisted(product.id);

  const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  const weightVariants = [
    { label: product.weight + product.unit, price: product.price },
    ...(product.unit === 'kg' ? [{ label: '500g', price: Math.round(product.price * 0.6) }] : []),
    ...(product.unit === 'g' ? [{ label: '1kg', price: Math.round(product.price * 1.8) }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-green-600">Products</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category}`} className="hover:text-green-600 capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 shadow-card mb-8">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 mb-4" style={{ height: '380px' }}>
              <Image src={selectedImage} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-lg">{product.discount}% OFF</span>
                )}
                {product.isOrganic && (
                  <span className="bg-lime-500 text-white text-sm font-semibold px-3 py-1 rounded-lg flex items-center gap-1">
                    <Leaf size={12} /> Organic
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
                <button
                  onClick={() => { toggleWishlist(product); toast.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1200 }); }}
                  className={`p-1.5 sm:p-2 rounded-full shadow-md transition-all ${wishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-400'}`}
                >
                  <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill={wishlist ? 'white' : 'none'} />
                </button>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="p-1.5 sm:p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Share2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-colors ${
                    selectedImage === img ? 'border-green-500' : 'border-gray-100 hover:border-green-400'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 font-semibold text-sm">{product.brand}</span>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full capitalize">{tag.replace('-', ' ')}</span>
              ))}
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {weightVariants.map((v, i) => (
                  <button key={i} onClick={() => setSelectedWeight(i)} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selectedWeight === i ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                    {v.label}<br /><span className="font-bold">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-4xl font-black text-gray-900">₹{weightVariants[selectedWeight].price}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-2xl text-gray-400 line-through">₹{product.mrp}</span>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-lg">Save ₹{product.mrp - product.price}</span>
                </>
              )}
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6 flex items-center gap-3">
              <Zap size={18} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-700">Delivery in 10 Minutes</p>
                <p className="text-xs text-green-600">Dispatched from nearest dark store</p>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              {qty === 0 ? (
                <button onClick={() => { addItem(product); toast.success(`${product.name} added to cart!`); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-green hover:shadow-lg">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-green-600 rounded-xl px-4">
                  <QuantityCounter
                    quantity={qty}
                    onIncrease={() => updateQuantity(product.id, qty + 1)}
                    onDecrease={() => qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1)}
                  />
                  <button onClick={openCart} className="text-white font-semibold text-sm">View Cart →</button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Shield size={16} />, title: 'Quality Assured', desc: '100% genuine products' },
                { icon: <RotateCcw size={16} />, title: 'Easy Returns', desc: 'No questions asked' },
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-600">{g.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{g.title}</p>
                    <p className="text-xs text-gray-400">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FrequentlyBoughtTogether product={product} />

        {/* Details */}
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              ['Brand', product.brand],
              ['Category', product.category.replace('-', ' ')],
              ['Weight / Volume', `${product.weight}${product.unit}`],
              ['In Stock', product.inStock ? 'Yes' : 'No'],
              ['Rating', `${product.rating} / 5 (${product.reviews} reviews)`],
            ].map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="text-gray-400 w-32 flex-shrink-0">{key}</span>
                <span className="font-medium text-gray-800 capitalize">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similar.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={product.name}
        text={`Check out ${product.name} on Kwikr - ${product.description}`}
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  );
}





// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Star, ShoppingCart, Heart, Share2, ChevronRight, Shield, RotateCcw, Zap, Leaf } from 'lucide-react';
// import { getProductById, products } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
// import QuantityCounter from '@/components/ui/QuantityCounter';
// import ProductCard from '@/components/ui/ProductCard';
// import FrequentlyBoughtTogether from '@/components/home/FrequentlyBoughtTogether';
// import toast from 'react-hot-toast';

// export default function ProductDetailPage({ params }) {
//   const product = getProductById(parseInt(params.id));
//   const [selectedWeight, setSelectedWeight] = useState(0);
//   const { addItem, getItemQuantity, updateQuantity, removeItem, openCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { trackView } = useRecentlyViewed();

//   useEffect(() => {
//     if (product) trackView(product.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [product?.id]);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😕</div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
//           <Link href="/products" className="text-green-600 font-semibold hover:underline">← Back to Products</Link>
//         </div>
//       </div>
//     );
//   }

//   const qty = getItemQuantity(product.id);
//   const wishlist = isWishlisted(product.id);

//   const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

//   const weightVariants = [
//     { label: product.weight + product.unit, price: product.price },
//     ...(product.unit === 'kg' ? [{ label: '500g', price: Math.round(product.price * 0.6) }] : []),
//     ...(product.unit === 'g' ? [{ label: '1kg', price: Math.round(product.price * 1.8) }] : []),
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-400">
//           <Link href="/" className="hover:text-green-600">Home</Link>
//           <ChevronRight size={12} />
//           <Link href="/products" className="hover:text-green-600">Products</Link>
//           <ChevronRight size={12} />
//           <Link href={`/products?category=${product.category}`} className="hover:text-green-600 capitalize">{product.category.replace('-', ' ')}</Link>
//           <ChevronRight size={12} />
//           <span className="text-gray-600 font-medium truncate">{product.name}</span>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 shadow-card mb-8">
//           {/* Gallery */}
//           <div>
//             <div className="relative rounded-2xl overflow-hidden bg-gray-50 mb-4" style={{ height: '380px' }}>
//               <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
//               <div className="absolute top-4 left-4 flex flex-col gap-2">
//                 {product.discount > 0 && (
//                   <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-lg">{product.discount}% OFF</span>
//                 )}
//                 {product.isOrganic && (
//                   <span className="bg-lime-500 text-white text-sm font-semibold px-3 py-1 rounded-lg flex items-center gap-1">
//                     <Leaf size={12} /> Organic
//                   </span>
//                 )}
//               </div>
//               <div className="absolute top-4 right-4 flex flex-col gap-2">
//                 <button
//                   onClick={() => { toggleWishlist(product); toast.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1200 }); }}
//                   className={`p-2 rounded-full shadow-md transition-all ${wishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-400'}`}
//                 >
//                   <Heart size={18} fill={wishlist ? 'white' : 'none'} />
//                 </button>
//                 <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-green-600 transition-colors">
//                   <Share2 size={18} />
//                 </button>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-100 cursor-pointer hover:border-green-400 transition-colors">
//                   <Image src={product.image} alt="" width={80} height={80} className="object-cover w-full h-full" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Info */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-green-600 font-semibold text-sm">{product.brand}</span>
//               <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
//                 <Star size={14} className="text-yellow-400 fill-yellow-400" />
//                 <span className="text-sm font-bold text-gray-900">{product.rating}</span>
//                 <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
//               </div>
//             </div>

//             <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
//             <p className="text-gray-500 text-sm mb-4">{product.description}</p>

//             <div className="flex flex-wrap gap-1.5 mb-5">
//               {product.tags.map(tag => (
//                 <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full capitalize">{tag.replace('-', ' ')}</span>
//               ))}
//             </div>

//             <div className="mb-5">
//               <p className="text-sm font-semibold text-gray-700 mb-2">Select Size</p>
//               <div className="flex gap-2 flex-wrap">
//                 {weightVariants.map((v, i) => (
//                   <button key={i} onClick={() => setSelectedWeight(i)} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selectedWeight === i ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
//                     {v.label}<br /><span className="font-bold">₹{v.price}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-6 flex items-end gap-3">
//               <span className="text-4xl font-black text-gray-900">₹{weightVariants[selectedWeight].price}</span>
//               {product.discount > 0 && (
//                 <>
//                   <span className="text-2xl text-gray-400 line-through">₹{product.mrp}</span>
//                   <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-lg">Save ₹{product.mrp - product.price}</span>
//                 </>
//               )}
//             </div>

//             <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6 flex items-center gap-3">
//               <Zap size={18} className="text-green-600 flex-shrink-0" />
//               <div>
//                 <p className="text-sm font-bold text-green-700">Delivery in 10 Minutes</p>
//                 <p className="text-xs text-green-600">Dispatched from nearest dark store</p>
//               </div>
//             </div>

//             <div className="flex gap-3 mb-6">
//               {qty === 0 ? (
//                 <button onClick={() => { addItem(product); toast.success(`${product.name} added to cart!`); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-green hover:shadow-lg">
//                   <ShoppingCart size={20} /> Add to Cart
//                 </button>
//               ) : (
//                 <div className="flex-1 flex items-center justify-between bg-green-600 rounded-xl px-4">
//                   <QuantityCounter
//                     quantity={qty}
//                     onIncrease={() => updateQuantity(product.id, qty + 1)}
//                     onDecrease={() => qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1)}
//                   />
//                   <button onClick={openCart} className="text-white font-semibold text-sm">View Cart →</button>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { icon: <Shield size={16} />, title: 'Quality Assured', desc: '100% genuine products' },
//                 { icon: <RotateCcw size={16} />, title: 'Easy Returns', desc: 'No questions asked' },
//               ].map((g, i) => (
//                 <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
//                   <span className="text-green-600">{g.icon}</span>
//                   <div>
//                     <p className="text-xs font-bold text-gray-700">{g.title}</p>
//                     <p className="text-xs text-gray-400">{g.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <FrequentlyBoughtTogether product={product} />

//         {/* Details */}
//         <div className="bg-white rounded-2xl p-6 shadow-card mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
//           <div className="grid sm:grid-cols-2 gap-4 text-sm">
//             {[
//               ['Brand', product.brand],
//               ['Category', product.category.replace('-', ' ')],
//               ['Weight / Volume', `${product.weight}${product.unit}`],
//               ['In Stock', product.inStock ? 'Yes' : 'No'],
//               ['Rating', `${product.rating} / 5 (${product.reviews} reviews)`],
//             ].map(([key, val]) => (
//               <div key={key} className="flex gap-2">
//                 <span className="text-gray-400 w-32 flex-shrink-0">{key}</span>
//                 <span className="font-medium text-gray-800 capitalize">{val}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Similar */}
//         {similar.length > 0 && (
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {similar.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
