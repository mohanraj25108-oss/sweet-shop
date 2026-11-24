import React from 'react';
import { X, Phone, MessageSquare, Mail, MapPin, Clock, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-brand-kanti text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Phone size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Customer Care &amp; Support</h3>
              <p className="text-xs text-purple-200">We are here to assist your celebrations and gifting</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Channels */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <a
              href="tel:+918027723456"
              className="p-4 rounded-2xl border border-purple-200 hover:border-brand-kanti hover:bg-purple-50/50 transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-brand-kanti flex items-center justify-center group-hover:scale-105 transition">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Toll Free Phone</p>
                <p className="text-xs font-bold text-purple-950">+91 80 2772 3456</p>
                <p className="text-[10px] text-emerald-700 font-medium">8:30 AM - 10:30 PM</p>
              </div>
            </a>

            <a
              href="https://wa.me/918027723456"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
                <MessageSquare size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">WhatsApp Orders</p>
                <p className="text-xs font-bold text-emerald-950">+91 98450 11957</p>
                <p className="text-[10px] text-emerald-700 font-medium">Instant Human Chat</p>
              </div>
            </a>

            <div className="p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Corporate Gifting</p>
                <p className="text-xs font-bold text-gray-900">corporate@kantisweets.com</p>
                <p className="text-[10px] text-gray-500">Wedding &amp; Festival bulk quotes</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Central Kitchen</p>
                <p className="text-xs font-bold text-gray-900">Nelamangala, Bengaluru</p>
                <p className="text-[10px] text-gray-500">FSSAI Lic: 11218334000120</p>
              </div>
            </div>

          </div>

          {/* Quick Message Form */}
          <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Send an Instant Inquiry
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Your Name & Phone Number"
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 outline-none focus:border-brand-kanti bg-white"
              />
              <textarea
                rows={2}
                placeholder="What can we help you with? (Wedding bulk orders, customized gift hampers, flavor inquiry)..."
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 outline-none focus:border-brand-kanti bg-white"
              />
              <button
                type="button"
                onClick={() => alert("Thank you! Our sweetness specialist will call you in 15 minutes.")}
                className="w-full py-2.5 rounded-lg bg-brand-kanti hover:bg-brand-kantiHover text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Send size={13} />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

