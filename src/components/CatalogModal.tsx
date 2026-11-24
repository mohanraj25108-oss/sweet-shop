import React from 'react';
import { X, BookOpen, Download, Sparkles, CheckCircle } from 'lucide-react';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  const catalogSections = [
    {
      title: 'Heritage Pure Ghee Sweets',
      catId: 'Sweets',
      items: 'Mysore Pak, Motichoor Ladoo, Besan Ladoo, Milk Cake',
      desc: 'Made daily with 100% pure churned cow ghee in traditional open cauldrons.',
    },
    {
      title: 'Dry Fruit & Cashew Delicacies',
      catId: 'Sweets',
      items: 'Royal Kaju Katli (Silver Leaf), Emerald Kaju Pista Roll, Badam Halwa',
      desc: 'Export-grade Goan cashews and Californian almonds with zero adulteration.',
    },
    {
      title: 'Artisanal Bakery & Boulangerie',
      catId: 'Bakery',
      items: 'Dairy Cream Red Velvet Cake, Black Forest Jar Cake, Vanilla Marble Loaf',
      desc: 'Pure butter European style baking, 100% eggless recipe with fresh fruit compote.',
    },
    {
      title: 'Roasted Diet Savouries & Namkeens',
      catId: 'Namkeens',
      items: 'Roasted Diet Makhana Mixture, Pepper Cashews, Bikaneri Moth Bhujia',
      desc: 'Slow roasted savouries with rock salt, amchur and cold-pressed spices.',
    },
    {
      title: 'The Heritage Luxury Fragrances',
      catId: 'Fragrances',
      items: 'Kaanish Armaniya, Kaanish Dayati, Kaanish Miskrdali, Kesar Soy Candle',
      desc: 'Alcohol-free artisanal extracts in handcrafted rosewood capped crystal vials.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Digital Heritage Catalog</h3>
              <p className="text-xs text-purple-200">The 2026 Collection • Kanti Sweets</p>
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
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-950">Download Seasonal Lookbook (PDF)</p>
              <p className="text-[11px] text-amber-800">Wedding gifting collections, corporate hampers, nutrition facts</p>
            </div>
            <button
              onClick={() => alert("Downloading Kanti_Sweets_Catalog_2026.pdf (6.4 MB)...")}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="space-y-3">
            {catalogSections.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-gray-200 hover:border-brand-kanti hover:shadow-sm transition bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-serif font-bold text-sm text-gray-900">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-purple-900 font-semibold mt-0.5">
                    {sec.items}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {sec.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory(sec.catId);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg border border-brand-kanti text-brand-kanti hover:bg-purple-50 text-xs font-bold shrink-0 transition"
                >
                  Browse Range
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

