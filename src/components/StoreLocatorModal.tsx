import React, { useState } from 'react';
import { X, Store, MapPin, Phone, Clock, ExternalLink, Search } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredStores = STORE_LOCATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase()) ||
      s.pincode.includes(search)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-brand-kanti text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Store size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Our Heritage Sweet Stores</h3>
              <p className="text-xs text-purple-200">Visit our iconic stores or order online for doorstep delivery</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-purple-50/50 border-b border-purple-100">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by area, landmark or pincode (e.g. Nelamangala, Indiranagar)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-brand-kanti outline-none bg-white"
            />
          </div>
        </div>

        {/* Store Grid */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="p-4 rounded-2xl border border-gray-200 hover:border-brand-kanti hover:shadow-md transition bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif font-bold text-gray-900 text-sm">
                    {store.name}
                  </h4>
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    Open Today
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {store.address}
                </p>

                <div className="mt-3 space-y-1 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5 text-purple-900 font-medium">
                    <Clock size={13} />
                    <span>{store.timings}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-gray-700">
                    <Phone size={13} />
                    <span>{store.phone}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700">
                  {store.distance}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-kanti hover:underline font-bold flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

