import React, { useState } from 'react';
import { Package, Sparkles, Check, Trash2, Gift, X, Plus } from 'lucide-react';
import { Product, CustomBox } from '../types';

interface CustomBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleSweets: Product[];
  onAddCustomBoxToCart: (customBox: CustomBox) => void;
}

type BoxSize = '4-Slot Heritage (500g)' | '6-Slot Royal (750g)' | '9-Slot Imperial (1kg)';

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({
  isOpen,
  onClose,
  eligibleSweets,
  onAddCustomBoxToCart,
}) => {
  const [boxType, setBoxType] = useState<BoxSize>('4-Slot Heritage (500g)');
  const [boxStyle, setBoxStyle] = useState('Royal Purple Velvet');
  const [giftRibbon, setGiftRibbon] = useState(true);
  const [giftMessage, setGiftMessage] = useState('');
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);

  const slotCount = boxType.startsWith('4') ? 4 : boxType.startsWith('6') ? 6 : 9;

  // Initialize slots
  const [slots, setSlots] = useState<(Product | null)[]>(Array(9).fill(null));

  // Current active slots based on count
  const currentSlots = slots.slice(0, slotCount);

  // Fill slot with sweet
  const handleAssignSweet = (sweet: Product) => {
    const nextSlots = [...slots];
    nextSlots[activeSlotIndex] = sweet;
    setSlots(nextSlots);

    // Auto advance to next empty slot if available
    const nextEmptyIndex = nextSlots.slice(0, slotCount).findIndex((s, i) => i > activeSlotIndex && s === null);
    if (nextEmptyIndex !== -1) {
      setActiveSlotIndex(nextEmptyIndex);
    }
  };

  // Clear a slot
  const handleClearSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSlots = [...slots];
    nextSlots[index] = null;
    setSlots(nextSlots);
  };

  // Calculate pricing
  const baseBoxPrice = boxType.startsWith('4') ? 120 : boxType.startsWith('6') ? 160 : 220;
  const ribbonPrice = giftRibbon ? 40 : 0;
  const sweetsPrice = currentSlots.reduce((sum, item) => {
    if (!item) return sum;
    // Each slot is approximately 1/4 or 1/6 or 1/9 of total weight (~120g each slot)
    return sum + Math.round(item.price * 0.25);
  }, 0);

  const totalPrice = baseBoxPrice + ribbonPrice + sweetsPrice;
  const filledCount = currentSlots.filter(Boolean).length;
  const isComplete = filledCount === slotCount;

  const handleSaveBox = () => {
    const formattedSlots = currentSlots.map((sweet, idx) => ({
      index: idx,
      sweet,
      approxWeightGrams: Math.round(1000 / slotCount),
    }));

    const newBox: CustomBox = {
      id: `box-${Date.now()}`,
      name: `Bespoke ${boxType.split(' ')[0]} - ${boxStyle}`,
      boxType,
      boxStyle,
      slots: formattedSlots,
      totalPrice,
      giftRibbon,
      giftMessage: giftMessage.trim() || undefined,
    };

    onAddCustomBoxToCart(newBox);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-purple-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Bespoke Sweet Box Studio
                </h3>
                <span className="bg-amber-400 text-purple-950 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                  Interactive SaaS
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Handpick your favorite mithais, customize luxury packaging &amp; gift note
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Step 1: Choose Box Size & Box Finishes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box Size */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                1. Select Box Capacity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['4-Slot Heritage (500g)', '6-Slot Royal (750g)', '9-Slot Imperial (1kg)'] as BoxSize[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setBoxType(type);
                      setActiveSlotIndex(0);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      boxType === type
                        ? 'bg-purple-50 border-brand-kanti text-purple-950 font-bold ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <p className="font-semibold">{type.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{type.split(' ')[1]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Box Style */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                2. Select Luxury Keepsake Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Royal Purple Velvet', color: 'bg-purple-900 text-white' },
                  { name: 'Heritage Gold Filigree', color: 'bg-amber-600 text-white' },
                  { name: 'Saffron Silk Festive', color: 'bg-orange-600 text-white' },
                ].map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setBoxStyle(style.name)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      boxStyle === style.name
                        ? 'border-brand-kanti ring-2 ring-purple-300 font-bold bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${style.color} mb-1.5 shadow-sm`} />
                    <p className="leading-tight text-[11px] font-medium">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: The Interactive Box Visualizer */}
          <div className="bg-gradient-to-br from-[#FAF6F0] to-[#F3ECE0] rounded-2xl p-5 border-2 border-amber-900/10 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-amber-950">
                  {boxStyle} • {boxType}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  {filledCount} of {slotCount} filled
                </span>
              </div>

              {filledCount > 0 && (
                <button
                  onClick={() => setSlots(Array(9).fill(null))}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 size={12} />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Grid of Slots */}
            <div
              className={`grid gap-3 ${
                slotCount === 4
                  ? 'grid-cols-2 max-w-sm mx-auto'
                  : slotCount === 6
                  ? 'grid-cols-2 sm:grid-cols-3 max-w-md mx-auto'
                  : 'grid-cols-3 max-w-lg mx-auto'
              }`}
            >
              {currentSlots.map((sweet, index) => {
                const isActive = activeSlotIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => setActiveSlotIndex(index)}
                    className={`relative aspect-square rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-2 text-center overflow-hidden shadow-sm ${
                      isActive
                        ? 'border-brand-kanti bg-white ring-4 ring-purple-200 scale-102'
                        : sweet
                        ? 'border-amber-300 bg-white'
                        : 'border-dashed border-amber-300/80 bg-amber-50/50 hover:bg-amber-100/50'
                    }`}
                  >
                    {sweet ? (
                      <>
                        <img
                          src={sweet.image}
                          alt={sweet.name}
                          className="w-full h-16 sm:h-20 object-cover rounded-lg mb-1"
                        />
                        <p className="text-[10px] font-bold text-gray-900 line-clamp-1 leading-tight">
                          {sweet.name}
                        </p>
                        <p className="text-[9px] text-purple-900 font-semibold">
                          ~{Math.round(1000 / slotCount)}g
                        </p>

                        <button
                          onClick={(e) => handleClearSlot(index, e)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow"
                          title="Remove item"
                        >
                          <X size={10} />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-amber-800/60 p-2">
                        <div className="w-8 h-8 rounded-full border border-dashed border-amber-400 flex items-center justify-center mb-1">
                          <Plus size={14} className="text-amber-700" />
                        </div>
                        <span className="text-[11px] font-bold text-amber-900">
                          Slot {index + 1}
                        </span>
                        <span className="text-[9px] text-amber-700/80">
                          {isActive ? 'Click sweet below' : 'Tap to fill'}
                        </span>
                      </div>
                    )}

                    {/* Active slot indicator badge */}
                    {isActive && (
                      <span className="absolute bottom-1 bg-brand-kanti text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
                        Active Slot
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Sweet Selection Palette */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                3. Choose Sweet for Slot #{activeSlotIndex + 1}
              </label>
              <span className="text-xs text-purple-800 font-medium">
                Tap sweet to place in active slot
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-56 overflow-y-auto p-1">
              {eligibleSweets.map((sweet) => (
                <div
                  key={sweet.id}
                  onClick={() => handleAssignSweet(sweet)}
                  className="bg-white rounded-xl border border-gray-200 hover:border-brand-kanti p-2 cursor-pointer transition transform hover:-translate-y-0.5 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-16 object-cover rounded-lg mb-1.5 group-hover:scale-105 transition"
                  />
                  <p className="text-[11px] font-bold text-gray-800 line-clamp-1 leading-tight group-hover:text-brand-kanti">
                    {sweet.name}
                  </p>
                  <p className="text-[10px] text-purple-900 font-semibold mt-0.5">
                    ₹{sweet.price} / 500g
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Gifting Enhancements */}
          <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ribbon-toggle"
                checked={giftRibbon}
                onChange={(e) => setGiftRibbon(e.target.checked)}
                className="w-4 h-4 text-brand-kanti rounded focus:ring-purple-400 cursor-pointer"
              />
              <label htmlFor="ribbon-toggle" className="text-xs text-gray-800 cursor-pointer">
                <span className="font-bold block">Add Satin Golden Ribbon &amp; Wax Seal (+₹40)</span>
                <span className="text-gray-500 text-[11px]">Bespoke hand-tied satin ribbon for festive presentation</span>
              </label>
            </div>

            <div>
              <input
                type="text"
                placeholder="Add handwritten gift message (e.g. Wishing you sweetness & joy!)..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                maxLength={80}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 text-xs focus:border-brand-kanti outline-none bg-white"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-serif text-gray-900">
                ₹{totalPrice}
              </span>
              <span className="text-xs text-gray-500">
                (Includes {filledCount} sweets + luxury keepsake box)
              </span>
            </div>
            {!isComplete && (
              <p className="text-[11px] text-amber-700 font-semibold">
                Please fill all {slotCount} slots before adding to cart ({slotCount - filledCount} remaining)
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              disabled={!isComplete}
              onClick={handleSaveBox}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                isComplete
                  ? 'bg-brand-kanti hover:bg-brand-kantiHover text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Package size={15} />
              <span>Add Custom Box to Cart</span>
              <Sparkles size={14} className="text-amber-300" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

