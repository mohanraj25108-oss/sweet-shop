import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Award, ShieldCheck } from 'lucide-react';

interface HeroCarouselProps {
  onExploreBakery: () => void;
  onExploreHeritage: () => void;
  onExploreSweets: () => void;
  onOpenBoxBuilder: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreBakery,
  onExploreHeritage,
  onExploreSweets,
  onOpenBoxBuilder,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Reference Hero Banner - "A DELIGHTFUL ASSORTMENT" & "THE HERITAGE"
    {
      id: 'assortment-heritage',
      type: 'split',
      left: {
        tag: 'Fresh From Our Oven',
        headline: 'A DELIGHTFUL ASSORTMENT',
        subtext: 'Bespoke cakes, slow-baked tea loaves & luscious layered jar desserts.',
        items: [
          { name: 'Dairy Cream Red Velvet Cake', position: 'Left' },
          { name: 'Black Forest Jar Cake', position: 'Center' },
          { name: 'Vanilla Marble Tea Cake', position: 'Right' }
        ],
        ctaText: 'Explore Bakery & Cakes',
        action: onExploreBakery,
        bgGradient: 'from-[#FAF2E8] via-[#F5E6D3] to-[#EFE0CE]',
        textColor: 'text-[#3E2723]'
      },
      right: {
        tag: 'The Royal Collection',
        headline: 'THE HERITAGE',
        subheadline: 'ARTISANAL PERFUMES & ESSENCES',
        bottles: [
          { name: 'KAANISH ARMANIYA', desc: 'Oudh & Saffron' },
          { name: 'KAANISH DAYATI', desc: 'Mysore Sandal' },
          { name: 'KAANISH MISKRDALI', desc: 'Ambergris Musk' }
        ],
        ctaText: 'Discover Fragrances',
        action: onExploreHeritage,
        bgGradient: 'from-[#19455B] via-[#0F2F3F] to-[#0A1F2B]',
        textColor: 'text-white'
      }
    },
    // Slide 2: Pure Desi Ghee Mithai Legacy Since 1957
    {
      id: 'heritage-sweets',
      type: 'full',
      badge: 'Spreading Sweetness Since 1957',
      headline: 'ROYAL DESI GHEE SWEETS',
      subheadline: 'Crafted with 100% Pure Gir Cow Ghee & Premium Californian Dry Fruits',
      description: 'From our iconic melt-in-mouth Mysore Pak to diamond-cut silver Kaju Katli, experience six decades of royal heritage recipes.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
      ctaPrimary: 'Order Fresh Sweets',
      ctaSecondary: 'View Lab Purity Certificate',
      actionPrimary: onExploreSweets,
      bgClass: 'bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900',
    },
    // Slide 3: Bespoke Custom Sweet Box Builder
    {
      id: 'box-builder-promo',
      type: 'full',
      badge: 'Interactive Box Studio',
      headline: 'BUILD YOUR BESPOKE MITHAI BOX',
      subheadline: 'Handpick your favorite sweets in a luxury velvet or gold-embossed keepsake tin',
      description: 'Choose your box size (500g, 750g, 1kg), select slot by slot, personalize with a golden satin ribbon and handwritten gift message.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      ctaPrimary: 'Start Building My Box',
      ctaSecondary: 'Corporate Gifting',
      actionPrimary: onOpenBoxBuilder,
      bgClass: 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950',
    }
  ];

  // Auto advance slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 select-none">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          if (slide.type === 'split' && slide.left && slide.right) {
            return (
              <div key={slide.id} className="min-w-full flex flex-col lg:flex-row">
                
                {/* Left Half: "A DELIGHTFUL ASSORTMENT" - Matching Reference Screenshot */}
                <div className={`w-full lg:w-7/12 bg-gradient-to-br ${slide.left.bgGradient} p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-amber-200/40`}>
                  
                  {/* Subtle Background Accent Pattern */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-800 text-amber-50 uppercase tracking-widest">
                        <Sparkles size={11} />
                        {slide.left.tag}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#3E2723] tracking-tight leading-tight">
                      A DELIGHTFUL <br className="hidden sm:inline" />
                      <span className="text-amber-900">ASSORTMENT</span>
                    </h2>

                    <p className="mt-2 text-sm sm:text-base text-[#5D4037] max-w-md font-medium">
                      {slide.left.subtext}
                    </p>
                  </div>

                  {/* Artisanal Bakery Showcase Visual with Annotation Arrows (Exact Reference Recreation) */}
                  <div className="relative my-6 sm:my-8 z-10 bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-900/10 shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      
                      {/* Item 1: Dairy Cream Red Velvet */}
                      <div className="flex flex-col items-center text-center group cursor-pointer" onClick={slide.left.action}>
                        <div className="relative overflow-hidden rounded-xl shadow-md border-2 border-white mb-2 transform group-hover:scale-105 transition duration-300">
                          <img 
                            src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=350&q=80" 
                            alt="Dairy Cream Red Velvet Cake"
                            className="w-full h-28 sm:h-32 object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Bestseller
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-900 leading-tight">
                          Dairy Cream Red Velvet Cake
                        </span>
                        <span className="text-[11px] text-purple-900 font-semibold mt-0.5">₹680 (500g)</span>
                      </div>

                      {/* Item 2: Black Forest Jar Cake */}
                      <div className="flex flex-col items-center text-center group cursor-pointer" onClick={slide.left.action}>
                        <div className="relative overflow-hidden rounded-xl shadow-md border-2 border-white mb-2 transform group-hover:scale-105 transition duration-300">
                          <img 
                            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=350&q=80" 
                            alt="Black Forest Jar Cake"
                            className="w-full h-28 sm:h-32 object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Fresh Jar
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-900 leading-tight">
                          Black Forest Jar Cake
                        </span>
                        <span className="text-[11px] text-purple-900 font-semibold mt-0.5">₹320 (Twin Pack)</span>
                      </div>

                      {/* Item 3: Vanilla Marble Tea Cake */}
                      <div className="flex flex-col items-center text-center group cursor-pointer" onClick={slide.left.action}>
                        <div className="relative overflow-hidden rounded-xl shadow-md border-2 border-white mb-2 transform group-hover:scale-105 transition duration-300">
                          <img 
                            src="https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=350&q=80" 
                            alt="Vanilla Marble Tea Cake"
                            className="w-full h-28 sm:h-32 object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-purple-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Tea Loaf
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-900 leading-tight">
                          Vanilla Marble Tea Cake
                        </span>
                        <span className="text-[11px] text-purple-900 font-semibold mt-0.5">₹240 (350g)</span>
                      </div>

                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <button
                      onClick={slide.left.action}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3E2723] hover:bg-[#4E342E] text-white text-sm font-bold shadow-md transition transform hover:-translate-y-0.5"
                    >
                      <span>{slide.left.ctaText}</span>
                      <ArrowRight size={16} />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#5D4037]">
                      <ShieldCheck size={16} className="text-emerald-700" />
                      <span>Eggless &amp; Pure Butter</span>
                    </div>
                  </div>

                </div>

                {/* Right Half: "THE HERITAGE - ARTISANAL" - Matching Reference Screenshot */}
                <div className={`w-full lg:w-5/12 bg-gradient-to-br ${slide.right.bgGradient} p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden text-white`}>
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/60 text-cyan-200 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Award size={12} />
                      {slide.right.tag}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white">
                      THE HERITAGE
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-300 uppercase mt-0.5">
                      {slide.right.subheadline}
                    </p>
                  </div>

                  {/* Perfume Bottles Showcase (Kaanish Armaniya, Dayati, Miskrdali) */}
                  <div className="relative my-6 z-10 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-around gap-2">
                      
                      {/* Bottle 1 */}
                      <div className="flex flex-col items-center text-center cursor-pointer group" onClick={slide.right.action}>
                        <div className="w-16 h-28 sm:w-20 sm:h-32 bg-gradient-to-b from-amber-700/80 via-amber-500/40 to-amber-900/90 rounded-t-lg rounded-b-xl border border-amber-300/40 flex flex-col items-center justify-between p-2 shadow-lg group-hover:scale-105 transition">
                          {/* Wooden Cap */}
                          <div className="w-8 h-8 rounded-full bg-amber-900 border border-amber-700 shadow-inner -mt-4 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-amber-600" />
                          </div>
                          {/* Label */}
                          <div className="bg-amber-100 text-amber-950 px-1 py-1 rounded w-full text-center">
                            <p className="text-[7px] font-black tracking-tighter">KAANISH</p>
                            <p className="text-[6px] font-bold text-amber-900">ARMANIYA</p>
                          </div>
                          <span className="text-[8px] text-amber-200 font-semibold">12ml</span>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-100 mt-2">Armaniya</span>
                        <span className="text-[9px] text-cyan-400">₹1,450</span>
                      </div>

                      {/* Bottle 2 */}
                      <div className="flex flex-col items-center text-center cursor-pointer group" onClick={slide.right.action}>
                        <div className="w-16 h-28 sm:w-20 sm:h-32 bg-gradient-to-b from-amber-600/80 via-amber-400/40 to-amber-800/90 rounded-t-lg rounded-b-xl border border-amber-300/40 flex flex-col items-center justify-between p-2 shadow-lg group-hover:scale-105 transition">
                          {/* Wooden Cap */}
                          <div className="w-8 h-8 rounded-full bg-amber-900 border border-amber-700 shadow-inner -mt-4 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-amber-600" />
                          </div>
                          {/* Label */}
                          <div className="bg-amber-100 text-amber-950 px-1 py-1 rounded w-full text-center">
                            <p className="text-[7px] font-black tracking-tighter">KAANISH</p>
                            <p className="text-[6px] font-bold text-amber-900">DAYATI</p>
                          </div>
                          <span className="text-[8px] text-amber-200 font-semibold">12ml</span>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-100 mt-2">Dayati</span>
                        <span className="text-[9px] text-cyan-400">₹1,350</span>
                      </div>

                      {/* Bottle 3 */}
                      <div className="flex flex-col items-center text-center cursor-pointer group" onClick={slide.right.action}>
                        <div className="w-16 h-28 sm:w-20 sm:h-32 bg-gradient-to-b from-amber-800/80 via-amber-600/40 to-amber-950/90 rounded-t-lg rounded-b-xl border border-amber-300/40 flex flex-col items-center justify-between p-2 shadow-lg group-hover:scale-105 transition">
                          {/* Wooden Cap */}
                          <div className="w-8 h-8 rounded-full bg-amber-900 border border-amber-700 shadow-inner -mt-4 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-amber-600" />
                          </div>
                          {/* Label */}
                          <div className="bg-amber-100 text-amber-950 px-1 py-1 rounded w-full text-center">
                            <p className="text-[7px] font-black tracking-tighter">KAANISH</p>
                            <p className="text-[6px] font-bold text-amber-900">MISKRDALI</p>
                          </div>
                          <span className="text-[8px] text-amber-200 font-semibold">12ml</span>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-100 mt-2">Miskrdali</span>
                        <span className="text-[9px] text-cyan-400">₹1,550</span>
                      </div>

                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <button
                      onClick={slide.right.action}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white text-xs sm:text-sm font-bold shadow-md transition"
                    >
                      <span>{slide.right.ctaText}</span>
                      <ArrowRight size={14} />
                    </button>
                    <span className="text-[11px] text-cyan-200">100% Non-Alcoholic</span>
                  </div>

                </div>

              </div>
            );
          }

          // Full slide: Royal Ghee Sweets or Custom Box Builder
          return (
            <div key={slide.id} className={`min-w-full relative overflow-hidden ${slide.bgClass} text-white py-12 sm:py-16 px-6 sm:px-12 flex items-center`}>
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-purple-950 text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles size={13} />
                    {slide.badge}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
                    {slide.headline}
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-amber-200 mt-2">
                    {slide.subheadline}
                  </p>
                  <p className="text-sm sm:text-base text-purple-100 mt-4 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={slide.actionPrimary}
                      className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-sm shadow-xl flex items-center gap-2 transition transform hover:-translate-y-0.5"
                    >
                      <span>{slide.ctaPrimary}</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={slide.actionPrimary}
                      className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition"
                    >
                      {slide.ctaSecondary}
                    </button>
                  </div>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 max-w-md w-full aspect-video sm:aspect-square">
                    <img 
                      src={slide.image} 
                      alt={slide.headline} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs font-semibold text-amber-200">Prepared Fresh Every 4 Hours</p>
                      <p className="text-[11px] text-white/80">Packed with nitrogen-flushed hygiene protection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition backdrop-blur-sm z-20"
        title="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition backdrop-blur-sm z-20"
        title="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination Indicators - Matching Reference Image dots/pill indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx 
                ? 'w-6 h-2 bg-brand-kanti border border-white' 
                : 'w-2 h-2 bg-white/60 hover:bg-white'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

