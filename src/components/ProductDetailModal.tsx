import React, { useState } from 'react';
import { X, Star, ShieldCheck, Clock, Check, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, weightLabel: string, price: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const currentOption = product.weightOptions[selectedIdx] || {
    label: 'Standard',
    price: product.price,
  };

  const handleAdd = () => {
    onAddToCart(product, currentOption.label, currentOption.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="relative">
          <div className="h-64 sm:h-72 w-full overflow-hidden bg-purple-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-lg transition"
          >
            <X size={18} />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {product.isVeg && (
              <span className="bg-white/95 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                100% Pure Vegetarian
              </span>
            )}
            {product.tag && (
              <span className="bg-brand-kanti text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                {product.category} • {product.subcategory}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-0.5">
                {product.name}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-bold font-serif text-brand-kanti">
                ₹{currentOption.price}
              </span>
              <span className="text-xs text-gray-400 block">per {currentOption.label}</span>
            </div>
          </div>

          {/* Ratings & Shelf life */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-amber-900 font-bold">
              <Star size={13} className="fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount} verified reviews)</span>
            </div>

            {product.shelfLifeDays && (
              <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                <Clock size={13} />
                <span>Shelf Life: {product.shelfLifeDays} days</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
              <span className="text-xs font-bold text-purple-950 uppercase tracking-wider block mb-1">
                Authentic Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-white border border-purple-200 text-purple-900 px-2 py-0.5 rounded-md font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pack Options */}
          <div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
              Select Quantity / Weight:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.weightOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedIdx === idx
                      ? 'bg-purple-100 border-brand-kanti text-purple-950 ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'
                  }`}
                >
                  <p>{opt.label}</p>
                  <p className="text-[10px] text-brand-kanti mt-0.5">₹{opt.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="text-xl font-bold text-gray-900">₹{currentOption.price}</p>
            </div>

            <button
              onClick={handleAdd}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-kanti hover:bg-brand-kantiHover text-white'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Added to Sweet Bag!</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add to Bag (₹{currentOption.price})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

