import React, { useState } from 'react';
import { X, Award, Gift, Sparkles, Clock, MapPin, Copy, Check, ChevronRight } from 'lucide-react';
import { Order } from '../types';

interface SweetClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onTrackOrder: (order: Order) => void;
}

export const SweetClubModal: React.FC<SweetClubModalProps> = ({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'rewards' | 'orders' | 'addresses'>('rewards');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('MITHAI-GOLD-2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header with Gold / Purple VIP styling */}
        <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-amber-900 text-white p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-purple-950 flex items-center justify-center font-bold shadow-lg border border-amber-300">
                <Award size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-white">Rakshit Sharma</h3>
                  <span className="bg-amber-400 text-purple-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Gold Connoisseur
                  </span>
                </div>
                <p className="text-xs text-amber-200 mt-0.5">Member since 2021 • +91 98452 77890</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* SweetCoins Balance Card */}
          <div className="mt-5 p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">Available SweetCoins</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black font-serif text-amber-300">420</span>
                <span className="text-xs text-purple-200">Coins (= ₹420 Instant Discount)</span>
              </div>
            </div>

            <button
              onClick={() => alert("420 SweetCoins will be automatically applied at your next checkout!")}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-bold transition shadow"
            >
              Redeem Coins
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-4 mt-5 text-xs border-t border-white/10 pt-3">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`pb-1 font-semibold transition ${
                activeTab === 'rewards' ? 'text-amber-300 border-b-2 border-amber-400' : 'text-purple-200 hover:text-white'
              }`}
            >
              VIP Benefits
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-1 font-semibold transition ${
                activeTab === 'orders' ? 'text-amber-300 border-b-2 border-amber-400' : 'text-purple-200 hover:text-white'
              }`}
            >
              Recent Orders ({orders.length > 0 ? orders.length : 2})
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-1 font-semibold transition ${
                activeTab === 'addresses' ? 'text-amber-300 border-b-2 border-amber-400' : 'text-purple-200 hover:text-white'
              }`}
            >
              Saved Addresses (2)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
          
          {/* TAB 1: Rewards & VIP perks */}
          {activeTab === 'rewards' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-600" />
                    <span>Invite Friends &amp; Earn 100 Coins</span>
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Your friends get ₹100 off, and you get 100 SweetCoins on their first order.
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-bold rounded-lg flex items-center gap-1 shadow"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'KANTI-GOLD'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Your Gold Tier Privileges:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2.5">
                    <span className="text-base">🚀</span>
                    <span className="font-semibold text-gray-800">Priority Express Dispatch</span>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2.5">
                    <span className="text-base">🎁</span>
                    <span className="font-semibold text-gray-800">Free Birthday Mithai Box (250g)</span>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2.5">
                    <span className="text-base">🏷️</span>
                    <span className="font-semibold text-gray-800">Earn 5% Coins on Every Order</span>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2.5">
                    <span className="text-base">👨‍🍳</span>
                    <span className="font-semibold text-gray-800">First Access to Festive Specials</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 rounded-2xl border border-gray-200 hover:border-brand-kanti transition bg-white flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">#{ord.id}</span>
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {ord.items.map(i => i.product.name).join(', ')}
                      </p>
                      <p className="text-xs font-bold text-gray-900 mt-0.5">₹{ord.totalAmount}</p>
                    </div>

                    <button
                      onClick={() => {
                        onTrackOrder(ord);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-brand-kanti text-white text-xs font-bold hover:bg-brand-kantiHover transition flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="p-3.5 rounded-2xl border border-gray-200 bg-white flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">#KS-910482</span>
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                          Delivered Yesterday
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Royal Kaju Katli (500g), Mysore Pak (500g)</p>
                      <p className="text-xs font-bold text-gray-900 mt-0.5">₹870 • Paid via UPI</p>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">★ 5.0 Rated</span>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-gray-200 bg-white flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">#KS-821904</span>
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                          Delivered (Diwali Box)
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Bespoke 6-Slot Velvet Box with Scented Candle</p>
                      <p className="text-xs font-bold text-gray-900 mt-0.5">₹1,850 • Paid via Card</p>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">★ 5.0 Rated</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl border border-purple-200 bg-purple-50/50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-950">Home (Primary)</span>
                    <span className="text-[9px] bg-brand-kanti text-white px-1.5 py-0.5 rounded font-bold">Default</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Flat 402, Royal Palms Apartments, 5th Cross Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Phone: +91 98452 77890</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-gray-200 bg-white flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-800">Office</span>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Prestige Tech Park, Block C, Marathahalli-Sarjapur Ring Road, Bengaluru - 560103
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Phone: +91 98452 77890</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
