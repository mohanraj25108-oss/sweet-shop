import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Eye, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weightLabel: string, price: number) => void;
  onQuickView: (product: Product) => void;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  cartQuantity = 0,
}) => {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const currentWeightOption = product.weightOptions[selectedWeightIndex] || {
    label: 'Standard',
    price: product.price,
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentWeightOption.label, currentWeightOption.price);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 900);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Media & Tags */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        {/* Product Image */}
        <div className="w-full h-52 bg-purple-50 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Veg Symbol & Shelf Life */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {product.isVeg && (
            <div className="w-5 h-5 bg-white/95 rounded border border-green-600 flex items-center justify-center shadow-sm" title="100% Pure Vegetarian">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
            </div>
          )}

          {product.tag && (
            <span className="bg-brand-kanti text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              {product.tag}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-brand-kanti flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md"
          title="Quick View Details"
        >
          <Eye size={15} />
        </button>

        {/* Shelf Life Pill */}
        {product.shelfLifeDays && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={10} />
            <span>Best within {product.shelfLifeDays} days</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="text-purple-700 font-semibold uppercase tracking-wider text-[11px]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-900 font-bold text-[11px]">
              <Star size={12} className="fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-gray-900 text-base leading-snug group-hover:text-brand-kanti transition cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          
          {/* Weight Variant Selector */}
          {product.weightOptions.length > 1 && (
            <div className="mb-3">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                Select Pack Size:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.weightOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedWeightIndex(idx)}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition ${
                      selectedWeightIndex === idx
                        ? 'bg-purple-100 text-brand-kanti border border-purple-300 font-bold'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between gap-2 mt-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-gray-900 font-sans">
                  ₹{currentWeightOption.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{Math.round((product.originalPrice / product.price) * currentWeightOption.price)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 block">Inclusive of all taxes</span>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm transform active:scale-95 ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-kanti hover:bg-brand-kantiHover text-white hover:shadow-purple-200'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check size={14} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

