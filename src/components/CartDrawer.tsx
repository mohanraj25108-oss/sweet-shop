import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Gift, Clock, Sparkles } from 'lucide-react';
import { CartItem, CustomBox } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customBoxes: CustomBox[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onRemoveCustomBox: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, selectedSlot: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  customBoxes,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveCustomBox,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('Today (4:00 PM - 6:00 PM)');

  // Calculate Subtotal
  const regularItemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const customBoxesTotal = customBoxes.reduce((acc, box) => acc + box.totalPrice, 0);
  const subtotal = regularItemsTotal + customBoxesTotal;

  // Free shipping threshold: ₹499
  const freeShippingThreshold = 499;
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - appliedDiscount + deliveryFee);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SWEET10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage('SWEET10 applied! 10% instant discount saved.');
    } else if (code === 'KANTI50') {
      setAppliedDiscount(50);
      setCouponMessage('KANTI50 applied! ₹50 flat festival discount.');
    } else {
      setCouponMessage('Invalid code. Try "SWEET10" or "KANTI50"');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-purple-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-brand-kanti text-white flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-gray-900 text-lg">Your Sweet Bag</h3>
                <p className="text-xs text-gray-500">
                  {cartItems.length + customBoxes.length} items selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-500 flex items-center justify-center transition border border-gray-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-amber-50 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-950 mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Sparkles size={12} />
                    You unlocked FREE Express Delivery!
                  </span>
                ) : (
                  `Add ₹${freeShippingThreshold - subtotal} more for FREE Express Delivery`
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-kanti h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100 space-y-4">
            {cartItems.length === 0 && customBoxes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-brand-kanti flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-serif font-bold text-gray-800 text-base">Your bag is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Explore our pure ghee sweets, crispy roasted namkeens, or build a custom gift hamper!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-lg bg-brand-kanti text-white text-xs font-bold hover:bg-brand-kantiHover transition"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                {/* Regular Products */}
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-purple-800 font-semibold mt-0.5">
                        {item.selectedWeight}
                      </p>
                      <p className="text-xs font-bold text-gray-900 mt-1">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-gray-700 transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-gray-700 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition p-1"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Custom Mithai Boxes */}
                {customBoxes.map((box) => (
                  <div key={box.id} className="pt-3 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift size={16} className="text-brand-kanti" />
                        <h4 className="text-xs font-bold text-purple-950">{box.name}</h4>
                      </div>
                      <button
                        onClick={() => onRemoveCustomBox(box.id)}
                        className="text-gray-400 hover:text-red-600 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 mt-1">
                      {box.slots.filter((s) => s.sweet).map((s) => s.sweet?.name).join(', ')}
                    </p>

                    {box.giftMessage && (
                      <p className="text-[10px] italic text-amber-800 bg-amber-50 p-1.5 rounded mt-1.5">
                        "{box.giftMessage}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-purple-100">
                      <span className="text-[10px] text-purple-900 font-semibold">Keepsake Box</span>
                      <span className="text-xs font-bold text-gray-900">₹{box.totalPrice}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Delivery Slot Selection */}
            {(cartItems.length > 0 || customBoxes.length > 0) && (
              <div className="pt-4">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Clock size={13} className="text-brand-kanti" />
                  <span>Choose Delivery Time Slot</span>
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white focus:border-brand-kanti focus:ring-1 focus:ring-purple-200 outline-none"
                >
                  <option value="Today (4:00 PM - 6:00 PM)">Today Evening (4:00 PM - 6:00 PM)</option>
                  <option value="Express 45-Mins Rush">Express Fresh Rush (within 45 mins)</option>
                  <option value="Tomorrow (9:00 AM - 12:00 PM)">Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Tomorrow (4:00 PM - 8:00 PM)">Tomorrow Evening (4:00 PM - 8:00 PM)</option>
                </select>
              </div>
            )}

            {/* Coupon Code Section */}
            {(cartItems.length > 0 || customBoxes.length > 0) && (
              <div className="pt-4">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. SWEET10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg outline-none uppercase font-semibold focus:border-brand-kanti"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </form>
                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {couponMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Bill & Checkout */}
          {(cartItems.length > 0 || customBoxes.length > 0) && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50/90 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Applied</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-brand-kanti text-lg">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout(appliedDiscount, selectedSlot)}
                className="w-full py-3.5 rounded-xl bg-brand-kanti hover:bg-brand-kantiHover text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition transform active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-[10px] text-center text-gray-500">
                100% Contactless Delivery • Handcrafted Fresh Today
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

