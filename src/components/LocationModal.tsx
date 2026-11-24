import React from 'react';
import { X, MapPin, Check, Navigation, Clock, Phone } from 'lucide-react';
import { StoreLocation } from '../types';
import { STORE_LOCATIONS } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: StoreLocation;
  onSelectLocation: (loc: StoreLocation) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-brand-kanti text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MapPin size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Select Delivery Store</h3>
              <p className="text-xs text-purple-200">Choose nearest store for freshest express delivery</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Location List */}
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {STORE_LOCATIONS.map((loc) => {
            const isSelected = currentLocation.id === loc.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-brand-kanti bg-purple-50/80 ring-2 ring-purple-200 shadow-sm'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-gray-900 text-sm">
                      {loc.name}
                    </h4>
                    {isSelected && (
                      <span className="bg-brand-kanti text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={10} /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {loc.address}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-gray-500 mt-2">
                    <span className="flex items-center gap-1 text-purple-900 font-semibold">
                      <Clock size={12} /> {loc.timings}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Navigation size={12} /> {loc.distance}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-800">
                    Open Now
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
          Delivering fresh sweets across Bengaluru &amp; surrounding towns within 45-60 minutes
        </div>

      </div>
    </div>
  );
};

