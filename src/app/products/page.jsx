'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3X3, List, Search, X, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { products, categories, brands } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuantityCounter from '@/components/ui/QuantityCounter';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

function ListProductCard({ product }) {
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const qty = getItemQuantity(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all flex gap-4 p-4">
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        {product.discount > 0 && (
          <span className="absolute top-1 left-1 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
            {product.discount}%
          </span>
        )}
        <button
          onClick={() => { toggleWishlist(product); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1200 }); }}
          aria-label="Toggle wishlist"
          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart size={11} className={wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400">{product.brand} • {product.weight}{product.unit}</p>
        <h3 className="font-semibold text-gray-800 mt-0.5">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-bold text-gray-900">₹{product.price}</span>
            {product.discount > 0 && <span className="text-gray-400 text-sm line-through ml-2">₹{product.mrp}</span>}
            {product.discount > 0 && <span className="text-green-600 text-sm font-semibold ml-2">{product.discount}% off</span>}
          </div>
          {qty === 0 ? (
            <button
              onClick={() => { addItem(product); toast.success(`${product.name} added!`); }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <QuantityCounter
              quantity={qty}
              onIncrease={() => updateQuantity(product.id, qty + 1)}
              onDecrease={() => qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductListingContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const brandParam = searchParams.get('brand') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState(brandParam ? [brandParam] : []);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['category', 'brands', 'price']);

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
    setSelectedBrands(brandParam ? [brandParam] : []);
  }, [categoryParam, searchParam, brandParam]);

  const toggleSection = (s) =>
    setExpandedSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleBrand = (brand) =>
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (onlyInStock) result = result.filter(p => p.inStock);
    if (onlyDiscounted) result = result.filter(p => p.discount > 0);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return result;
  }, [searchQuery, selectedCategory, selectedBrands, onlyInStock, onlyDiscounted, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setSearchQuery('');
  };

  const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  const SidebarContent = () => (
    <div className="space-y-4">
      {/* Category */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between p-4 font-semibold text-gray-800 hover:bg-gray-50">
          <span>Categories</span>
          {expandedSections.includes('category') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.includes('category') && (
          <div className="px-4 pb-4 space-y-1">
            <button onClick={() => setSelectedCategory('')} className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${!selectedCategory ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              All Categories
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)} className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                <span>{cat.icon}</span>
                <span className="flex-1">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button onClick={() => toggleSection('brands')} className="w-full flex items-center justify-between p-4 font-semibold text-gray-800 hover:bg-gray-50">
          <span>Brands</span>
          {expandedSections.includes('brands') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.includes('brands') && (
          <div className="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button onClick={() => toggleSection('price')} className="w-full flex items-center justify-between p-4 font-semibold text-gray-800 hover:bg-gray-50">
          <span>Price Range</span>
          {expandedSections.includes('price') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.includes('price') && (
          <div className="px-4 pb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{priceRange[0]}</span><span>₹{priceRange[1]}</span>
            </div>
            <input type="range" min={0} max={500} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-green-600" />
            <div className="grid grid-cols-3 gap-1 mt-3">
              {[[0, 100], [100, 250], [250, 500]].map(([min, max]) => (
                <button key={`${min}-${max}`} onClick={() => setPriceRange([min, max])} className={`text-xs py-1.5 rounded-lg border transition-colors ${priceRange[0] === min && priceRange[1] === max ? 'border-green-500 bg-green-50 text-green-700 font-semibold' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                  ₹{min}-{max}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
        <h3 className="font-semibold text-gray-800">Quick Filters</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlyDiscounted} onChange={e => setOnlyDiscounted(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <span className="text-sm text-gray-600">Offers & Discounts</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlyInStock} onChange={e => setOnlyInStock(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <span className="text-sm text-gray-600">In Stock Only</span>
        </label>
      </div>

      <button onClick={clearFilters} className="w-full py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-black text-gray-900">
                {currentCategoryName || (searchQuery ? `Results for "${searchQuery}"` : 'All Products')}
              </h1>
              <p className="text-gray-400 text-sm">{filtered.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 w-48"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><X size={12} /></button>
                )}
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Best Discount</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-500'}`}><Grid3X3 size={16} /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-500'}`}><List size={16} /></button>
              </div>
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-1.5 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 font-medium">
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-50 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <SidebarContent />
          </aside>
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700">Clear Filters</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filtered.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(product => <ListProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <ProductListingContent />
    </Suspense>
  );
}
