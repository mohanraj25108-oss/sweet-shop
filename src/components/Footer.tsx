import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Truck, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenStoreModal: () => void;
  onOpenContactModal: () => void;
  onOpenCatalogModal: () => void;
  onOpenBoxBuilder: () => void;
  onToggleSaaS: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStoreModal,
  onOpenContactModal,
  onOpenCatalogModal,
  onOpenBoxBuilder,
  onToggleSaaS,
}) => {
  return (
    <footer className="bg-[#1E0422] text-white border-t-4 border-amber-400 mt-16 font-sans">
      
      {/* 4 Pillars Trust Bar */}
      <div className="border-b border-purple-900/60 bg-purple-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Legacy Since 1957</h4>
              <p className="text-xs text-purple-200 mt-0.5">Six decades of royal confection recipes</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Pure Desi Ghee</h4>
              <p className="text-xs text-purple-200 mt-0.5">Authentic Gir cow ghee &amp; zero adulteration</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">45-Mins Express Fresh</h4>
              <p className="text-xs text-purple-200 mt-0.5">Nitrogen-sealed tamper-proof packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <HeartHandshake size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Custom Gifting Studio</h4>
              <p className="text-xs text-purple-200 mt-0.5">Handcrafted luxury velvet boxes &amp; ribbons</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-amber-400 flex items-center justify-center p-1 bg-purple-900/50">
              <span className="font-serif font-black text-amber-400 text-lg">KS</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-2xl text-white italic">
                Kanti Sweets
              </h3>
              <p className="text-xs text-amber-300">Spreading sweetness among people... Since 1957</p>
            </div>
          </div>

          <p className="text-xs text-purple-200 max-w-sm leading-relaxed">
            From an artisanal halwai in old Bengaluru to Karnataka's most cherished confectionery heritage. We blend traditional cauldron craft with cutting-edge SaaS fulfillment to bring pure bliss to every home.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-purple-950 flex items-center justify-center transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-purple-950 flex items-center justify-center transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-purple-950 flex items-center justify-center transition">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-amber-400 text-sm tracking-wider uppercase mb-3">
            Specialties
          </h4>
          <ul className="space-y-2 text-xs text-purple-200">
            <li>
              <button onClick={() => onSelectCategory('Sweets')} className="hover:text-amber-300 transition">
                Pure Ghee Mysore Pak
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Sweets')} className="hover:text-amber-300 transition">
                Silver Leaf Kaju Katli
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Namkeens')} className="hover:text-amber-300 transition">
                Roasted Namkeens &amp; Savouries
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Bakery')} className="hover:text-amber-300 transition">
                Dairy Cream Red Velvet Cake
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Fragrances')} className="hover:text-amber-300 transition">
                Kaanish Heritage Perfumes
              </button>
            </li>
            <li>
              <button onClick={onOpenBoxBuilder} className="text-amber-300 font-bold hover:underline flex items-center gap-1">
                <span>Custom Box Studio</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Store & Support */}
        <div>
          <h4 className="font-serif font-bold text-amber-400 text-sm tracking-wider uppercase mb-3">
            Experience &amp; Stores
          </h4>
          <ul className="space-y-2 text-xs text-purple-200">
            <li>
              <button onClick={onOpenStoreModal} className="hover:text-amber-300 transition">
                Nelamangala Flagship Store
              </button>
            </li>
            <li>
              <button onClick={onOpenStoreModal} className="hover:text-amber-300 transition">
                Indiranagar 100ft Road
              </button>
            </li>
            <li>
              <button onClick={onOpenStoreModal} className="hover:text-amber-300 transition">
                Malleshwaram Heritage Hub
              </button>
            </li>
            <li>
              <button onClick={onOpenCatalogModal} className="hover:text-amber-300 transition">
                Digital 2026 Catalog (PDF)
              </button>
            </li>
            <li>
              <button onClick={onOpenContactModal} className="hover:text-amber-300 transition">
                Wedding &amp; Corporate Bulks
              </button>
            </li>
            <li>
              <button onClick={onToggleSaaS} className="text-amber-300 font-bold hover:underline">
                SweetOps™ Merchant SaaS
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Helplines */}
        <div>
          <h4 className="font-serif font-bold text-amber-400 text-sm tracking-wider uppercase mb-3">
            Direct Helpline
          </h4>
          <div className="space-y-2 text-xs text-purple-200">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-amber-400" />
              <span>+91 80 2772 3456</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-amber-400" />
              <span>care@kantisweets.com</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-400" />
              <span>Nelamangala, Bengaluru 562123</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-900/60">
            <p className="text-[11px] font-semibold text-amber-300 mb-1.5">Join Sweetness Club</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full text-xs px-2.5 py-1.5 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 outline-none focus:border-amber-400"
              />
              <button
                onClick={() => alert("Welcome to Kanti Sweets Club! 100 SweetCoins credited.")}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs rounded-r-lg"
              >
                Join
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-900/80 py-4 px-4 sm:px-6 bg-[#160219]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-300 gap-2">
          <p>© 1957–2026 Kanti Sweets Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400">FSSAI Lic. No: 11218334000120</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

