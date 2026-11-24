import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Banknote, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomBox, Order, StoreLocation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customBoxes: CustomBox[];
  discount: number;
  deliverySlot: string;
  currentStore: StoreLocation;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  customBoxes,
  discount,
  deliverySlot,
  currentStore,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('Rakshit Sharma');
  const [phone, setPhone] = useState('+91 98452 77890');
  const [address, setAddress] = useState('Flat 402, Royal Palms Apartments, 5th Cross Road');
  const [pincode, setPincode] = useState('560038');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal =
    cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0) +
    customBoxes.reduce((acc, b) => acc + b.totalPrice, 0);

  const deliveryFee = subtotal >= 499 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#741180', '#F59E0B', '#10B981', '#EC4899'],
        });
      } catch (err) {
        // fallback
      }

      const newOrder: Order = {
        id: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: name,
        phone,
        deliveryAddress: `${address}, Bengaluru - ${pincode}`,
        storeLocation: currentStore.name,
        deliverySlot,
        items: [...cartItems],
        customBoxes: [...customBoxes],
        totalAmount: grandTotal,
        status: 'Kitchen Prep',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: paymentMethod === 'UPI' ? 'Instant UPI (PhonePe/GPay)' : paymentMethod === 'Card' ? 'Credit Card' : 'Cash on Delivery',
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-brand-kanti text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldCheck size={22} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Express Checkout</h3>
              <p className="text-xs text-purple-200">
                Delivering fresh from {currentStore.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
          
          {/* Customer Details */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              1. Delivery Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-brand-kanti outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-brand-kanti outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-brand-kanti outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-brand-kanti outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Delivery Slot</label>
                <div className="text-xs p-2.5 rounded-lg bg-purple-50 text-purple-900 font-semibold border border-purple-200">
                  {deliverySlot}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              2. Select Payment Mode
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'UPI'
                    ? 'border-brand-kanti bg-purple-50/80 ring-2 ring-purple-200 text-purple-950 font-bold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Smartphone size={20} className="text-brand-kanti" />
                <span className="text-xs">Instant UPI</span>
                <span className="text-[10px] text-emerald-700 font-semibold">GPay / PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'Card'
                    ? 'border-brand-kanti bg-purple-50/80 ring-2 ring-purple-200 text-purple-950 font-bold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <CreditCard size={20} className="text-brand-kanti" />
                <span className="text-xs">Credit/Debit Card</span>
                <span className="text-[10px] text-gray-400">Visa / Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'COD'
                    ? 'border-brand-kanti bg-purple-50/80 ring-2 ring-purple-200 text-purple-950 font-bold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Banknote size={20} className="text-brand-kanti" />
                <span className="text-xs">Pay on Delivery</span>
                <span className="text-[10px] text-gray-400">Cash / Card at door</span>
              </button>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">
                Total Payable: <span className="text-base font-bold text-brand-kanti">₹{grandTotal}</span>
              </p>
              <p className="text-[10px] text-gray-500">
                {cartItems.length} items • Free tamper-proof thermal packaging
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
              <CheckCircle2 size={14} />
              <span>100% Safe Payment</span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-brand-kanti hover:bg-brand-kantiHover text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Securing Order with Kitchen...</span>
                </>
              ) : (
                <>
                  <span>Confirm &amp; Place Order (₹{grandTotal})</span>
                  <Sparkles size={16} className="text-amber-300" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

