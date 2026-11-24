import React, { useState } from 'react';
import { X, Gift, Sparkles, Building2, Calculator, Check, Download, Send } from 'lucide-react';

interface BulkGiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkGiftingModal: React.FC<BulkGiftingModalProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(100);
  const [selectedTier, setSelectedTier] = useState<'classic' | 'royal' | 'imperial'>('royal');
  const [customBranding, setCustomBranding] = useState(true);
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const tierPrices = {
    classic: 450,
    royal: 850,
    imperial: 1450,
  };

  const basePrice = tierPrices[selectedTier];
  const brandingFee = customBranding ? 35 : 0;
  const unitPrice = basePrice + brandingFee;
  const subtotal = unitPrice * quantity;

  // Volume discounts
  let discountPercent = 0;
  if (quantity >= 250) discountPercent = 20;
  else if (quantity >= 100) discountPercent = 15;
  else if (quantity >= 50) discountPercent = 10;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalEstimate = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert(`Thank you ${contactName || 'Valued Partner'}! We have generated your Proforma Quote for ₹${finalEstimate.toLocaleString()}. Our Corporate Concierge will contact you within 30 minutes.`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold">
              <Gift size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-white">
                  Corporate &amp; Wedding Gifting Studio
                </h3>
                <span className="bg-amber-400 text-purple-950 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                  Bulk Estimator
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Bespoke hampers, gold-foil corporate branding &amp; multi-destination delivery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Hamper Tier */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
              1. Choose Hamper Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'classic', name: 'Classic Mithai Box', price: '₹450/box', desc: '400g Kaju Katli + Mysore Pak in rigid gift box' },
                { id: 'royal', name: 'Royal Velvet Keepsake', price: '₹850/box', desc: '750g Assorted Ghee Sweets + Roasted Namkeens' },
                { id: 'imperial', name: 'Imperial Treasury', price: '₹1,450/box', desc: '1kg Sweets + Dry Fruits + Handcrafted Candle' },
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedTier === tier.id
                      ? 'border-brand-kanti ring-2 ring-purple-200 bg-purple-50/70 font-bold'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <p className="text-xs text-gray-900">{tier.name}</p>
                  <p className="text-sm font-serif font-black text-brand-kanti mt-0.5">{tier.price}</p>
                  <p className="text-[10px] text-gray-500 font-normal mt-1 leading-snug">{tier.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Quantity Slider / Quick Buttons */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                2. Order Volume (Boxes): <span className="text-brand-kanti text-sm font-black">{quantity} Units</span>
              </label>
              {discountPercent > 0 && (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {discountPercent}% Volume Discount Active!
                </span>
              )}
            </div>

            <input
              type="range"
              min={25}
              max={1000}
              step={25}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-brand-kanti"
            />

            <div className="flex gap-2 mt-2">
              {[50, 100, 250, 500, 1000].map((qty) => (
                <button
                  type="button"
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  className={`px-3 py-1 text-xs rounded-lg border font-semibold transition ${
                    quantity === qty
                      ? 'bg-brand-kanti text-white border-brand-kanti'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {qty} Boxes
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Customization Checkbox */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="branding"
                checked={customBranding}
                onChange={(e) => setCustomBranding(e.target.checked)}
                className="w-4 h-4 text-brand-kanti rounded focus:ring-purple-400 cursor-pointer"
              />
              <label htmlFor="branding" className="text-xs text-gray-800 cursor-pointer">
                <span className="font-bold block">Gold-Foiled Corporate / Wedding Logo Sleeves</span>
                <span className="text-gray-500 text-[11px]">+₹35/box (Includes brass die casting &amp; ribbon personalization)</span>
              </label>
            </div>
            <span className="text-xs font-bold text-purple-900">+₹{(brandingFee * quantity).toLocaleString()}</span>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Base Cost ({quantity} × ₹{unitPrice})</span>
              <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Volume Discount ({discountPercent}%)</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Estimated Investment:</span>
              <span className="text-brand-kanti text-lg">₹{finalEstimate.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              *Includes complimentary multi-city delivery scheduling &amp; temperature-safe transport.
            </p>
          </div>

          {/* Step 4: Contact details */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              3. Recipient / Company Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-gray-300 outline-none focus:border-brand-kanti"
              />
              <input
                type="text"
                required
                placeholder="Company / Family Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-gray-300 outline-none focus:border-brand-kanti"
              />
              <input
                type="text"
                required
                placeholder="Work Email or Phone"
                value={emailPhone}
                onChange={(e) => setEmailPhone(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-gray-300 outline-none focus:border-brand-kanti"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 rounded-xl bg-brand-kanti hover:bg-brand-kantiHover text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Send size={15} />
              <span>{submitted ? 'Generating Proforma Quote...' : `Generate Instant Official Quotation (₹${finalEstimate.toLocaleString()})`}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
