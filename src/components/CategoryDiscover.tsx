import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryDiscoverProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  all: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80',
  Sweets: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80',
  Namkeens: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80',
  Bakery: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=300&q=80',
  Chocolates: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=300&q=80',
  Gifting: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80',
  Fragrances: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80',
  'Ice Cream': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=300&q=80',
  Tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80',
};

export const CategoryDiscover: React.FC<CategoryDiscoverProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-10 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30 border-b border-purple-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title Matching the reference image screenshot */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Indulge in the legacy of flavor with <span className="text-brand-kanti italic">Kanti Sweets</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-semibold text-purple-900">
            Discover Categories
          </p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* Circular Category Items */}
        <div className="mt-8 overflow-x-auto no-scrollbar pb-4 pt-2">
          <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 min-w-max px-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const imgUrl = CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.all;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="flex flex-col items-center group focus:outline-none transition-transform"
                >
                  {/* Circular Image Container */}
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300 relative shadow-md ${
                      isSelected
                        ? 'ring-4 ring-brand-kanti ring-offset-2 scale-105 shadow-purple-200'
                        : 'border-2 border-purple-100 group-hover:scale-105 group-hover:border-brand-kanti/60'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-purple-100">
                      <img
                        src={imgUrl}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Category Name */}
                  <span
                    className={`mt-2.5 text-xs sm:text-sm font-semibold max-w-[95px] text-center leading-tight transition ${
                      isSelected
                        ? 'text-brand-kanti font-bold'
                        : 'text-gray-700 group-hover:text-brand-kanti'
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Items badge */}
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    {cat.count} items
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

