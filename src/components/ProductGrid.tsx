import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  selectedSubcategory?: string;
  onSelectSubcategory?: (sub: string) => void;
  onAddToCart: (product: Product, weightLabel: string, price: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  selectedSubcategory,
  onSelectSubcategory,
  onAddToCart,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyVeg, setOnlyVeg] = useState(false);

  // Derive subcategories for active category
  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
        .map((p) => p.subcategory)
    )
  );

  // Filter products
  let filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
    if (onlyVeg && !p.isVeg) return false;
    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Category Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 capitalize">
            {selectedCategory === 'all' ? 'All Handcrafted Delicacies' : selectedCategory}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing {filtered.length} authentic delicacies freshly made with premium ingredients
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Pure Veg Toggle */}
          <button
            onClick={() => setOnlyVeg(!onlyVeg)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              onlyVeg
                ? 'bg-green-50 border-green-600 text-green-800'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center rounded-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
            <span>Pure Veg Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700">
            <ArrowUpDown size={14} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium text-xs text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subcategory Pills */}
      {subcategories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
          <button
            onClick={() => onSelectSubcategory?.('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              !selectedSubcategory
                ? 'bg-brand-kanti text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50'
            }`}
          >
            All in {selectedCategory === 'all' ? 'Menu' : selectedCategory}
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectSubcategory?.(sub)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedSubcategory === sub
                  ? 'bg-brand-kanti text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 mt-6 p-8">
          <div className="w-16 h-16 bg-purple-50 text-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Filter size={28} />
          </div>
          <h3 className="text-lg font-serif font-bold text-gray-800">No delicacies found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
            Try adjusting your search criteria, clearing subcategory filters, or exploring all our categories.
          </p>
          <button
            onClick={() => {
              onSelectSubcategory?.('');
              setOnlyVeg(false);
            }}
            className="mt-4 px-4 py-2 bg-brand-kanti text-white rounded-lg text-xs font-bold hover:bg-brand-kantiHover transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

