import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Store, 
  Phone, 
  BookOpen, 
  User, 
  ShoppingBag, 
  ChevronDown, 
  LayoutDashboard, 
  Sparkles,
  X,
  Package,
  ArrowRight
} from 'lucide-react';
import { Product, StoreLocation } from '../types';

interface NavbarProps {
  currentLocation: StoreLocation;
  onOpenLocationModal: () => void;
  onOpenStoreModal: () => void;
  onOpenContactModal: () => void;
  onOpenCatalogModal: () => void;
  onOpenCart: () => void;
  cartCount: number;
  cartTotal: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectSubcategory?: (sub: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onToggleSaaSMode: () => void;
  isSaaSMode: boolean;
  onOpenBoxBuilder: () => void;
  onQuickViewProduct: (product: Product) => void;
  onOpenProfileModal?: () => void;
  onOpenBulkGiftingModal?: () => void;
  allProducts: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenStoreModal,
  onOpenContactModal,
  onOpenCatalogModal,
  onOpenCart,
  cartCount,
  cartTotal,
  activeCategory,
  onSelectCategory,
  onSelectSubcategory,
  onSearch,
  searchQuery,
  onToggleSaaSMode,
  isSaaSMode,
  onOpenBoxBuilder,
  onQuickViewProduct,
  onOpenProfileModal,
  onOpenBulkGiftingModal,
  allProducts
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filtered search preview items
  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-purple-950 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
              Fresh Daily
            </span>
            <span className="hidden sm:inline text-purple-100">
              Handcrafted in Pure Desi Ghee &amp; 100% Natural Ingredients • Free Delivery on orders above ₹499
            </span>
            <span className="sm:hidden text-purple-100 font-medium truncate">
              Pure Desi Ghee Sweets • Free Express Delivery above ₹499
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSaaSMode}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-purple-950 text-xs font-semibold transition border border-amber-400/40"
              title="Toggle SaaS SweetOps merchant portal"
            >
              <LayoutDashboard size={13} />
              <span>{isSaaSMode ? 'Exit SaaS View' : 'SweetOps™ SaaS Portal'}</span>
            </button>
            <span className="hidden md:inline text-purple-300">|</span>
            <a href="tel:+918027723456" className="hidden md:flex items-center gap-1 text-purple-200 hover:text-white">
              <Phone size={12} />
              <span>Helpline: +91 80 2772 3456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Header - Matching reference image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Section - Matching Kanti Sweets reference styling */}
          <div 
            onClick={() => { onSelectCategory('all'); }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Circular Emblem Icon */}
            <div className="w-12 h-12 rounded-full border-2 border-brand-kanti flex items-center justify-center p-1 bg-purple-50 group-hover:bg-purple-100 transition shadow-inner">
              <div className="w-full h-full rounded-full border border-dashed border-brand-kanti/70 flex items-center justify-center">
                <span className="font-serif font-black text-brand-kanti text-lg leading-none">KS</span>
              </div>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-brand-kanti tracking-tight italic">
                  Kanti Sweets
                </span>
                <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-widest hidden sm:inline">
                  Est. 1957
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-tight">
                Spreading sweetness among people... Since 1957
              </span>
            </div>
          </div>

          {/* Delivering From Location Selector (Reference image pill) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-brand-kanti text-xs font-medium transition group"
            >
              <div className="w-6 h-6 rounded-full bg-brand-kanti text-white flex items-center justify-center">
                <MapPin size={13} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 leading-tight">Delivering from</p>
                <p className="font-semibold text-purple-900 leading-tight flex items-center gap-1">
                  <span className="max-w-[110px] truncate">{currentLocation.name.split(' ')[0]}...</span>
                  <ChevronDown size={12} className="group-hover:translate-y-0.5 transition" />
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Matching reference image */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search for a products (e.g. Kaju Katli, Namkeens, Cakes...)"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-brand-kanti focus:ring-2 focus:ring-purple-200 text-sm outline-none transition bg-white"
              />
              {searchQuery ? (
                <button 
                  onClick={() => onSearch('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              ) : (
                <div className="absolute right-3 text-gray-400 pointer-events-none text-xs">
                  <ChevronDown size={16} />
                </div>
              )}
            </div>

            {/* Live Search Popup */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-purple-100 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 bg-purple-50 text-[11px] font-semibold text-purple-900 uppercase tracking-wider flex justify-between">
                  <span>Quick Matches</span>
                  <span>{searchResults.length} Found</span>
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onQuickViewProduct(product);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 hover:bg-purple-50/70 flex items-center gap-3 cursor-pointer transition"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-md border" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-purple-700 font-medium">{product.category} • {product.subcategory}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                        <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-semibold">In Stock</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons Header: Stores, Contact, Catalog, Profile, Cart */}
          <div className="flex items-center gap-1 sm:gap-4">
            
            {/* Stores */}
            <button 
              onClick={onOpenStoreModal}
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-brand-kanti hover:bg-purple-50 rounded-lg transition group"
              title="Store Locator"
            >
              <Store size={20} className="group-hover:scale-110 transition" />
              <span className="text-[11px] font-medium mt-0.5">Stores</span>
            </button>

            {/* Contact */}
            <button 
              onClick={onOpenContactModal}
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-brand-kanti hover:bg-purple-50 rounded-lg transition group"
              title="Customer Care & Support"
            >
              <Phone size={20} className="group-hover:scale-110 transition" />
              <span className="text-[11px] font-medium mt-0.5">Contact</span>
            </button>

            {/* Catalog */}
            <button 
              onClick={onOpenCatalogModal}
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-brand-kanti hover:bg-purple-50 rounded-lg transition group hidden sm:flex"
              title="Sweet Shop Digital Catalog"
            >
              <BookOpen size={20} className="group-hover:scale-110 transition" />
              <span className="text-[11px] font-medium mt-0.5">Catalog</span>
            </button>

            {/* Profile */}
            <button 
              onClick={onOpenProfileModal}
              className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-brand-kanti hover:bg-purple-50 rounded-lg transition group"
              title="SweetClub Loyalty & Account"
            >
              <User size={20} className="group-hover:scale-110 transition" />
              <span className="text-[11px] font-medium mt-0.5">Profile</span>
            </button>

            {/* Cart with Badge */}
            <button 
              onClick={onOpenCart}
              className="relative flex flex-col items-center justify-center p-2 text-brand-kanti hover:bg-purple-50 rounded-lg transition group ml-1"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag size={22} className="group-hover:scale-110 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-purple-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold mt-0.5">
                {cartTotal > 0 ? `₹${cartTotal}` : 'Cart'}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="mt-2 md:hidden">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search sweets, namkeens, cakes..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-brand-kanti outline-none bg-purple-50/40"
            />
          </div>
        </div>
      </div>

      {/* Royal Purple Navigation Bar - Matching reference image purple bar */}
      <nav className="bg-brand-kanti text-white shadow-md relative z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
          
          <div className="flex items-center space-x-1 sm:space-x-2 py-1 text-sm font-medium whitespace-nowrap">
            
            {/* Sweets Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('sweets')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                onClick={() => onSelectCategory('Sweets')}
                className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Sweets' ? 'bg-purple-900 font-bold' : ''}`}
              >
                <span>Sweets</span>
                <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Sweets Megamenu */}
              {openDropdown === 'sweets' && (
                <div className="absolute left-0 top-full mt-0 w-64 bg-white text-gray-800 rounded-b-xl shadow-2xl border border-gray-100 py-2 animate-fade-in z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-brand-kanti uppercase tracking-wider border-b border-gray-100">
                    Artisanal Sweets
                  </div>
                  <button 
                    onClick={() => { onSelectCategory('Sweets'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-semibold text-purple-950 flex items-center justify-between"
                  >
                    <span>View All Sweets</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Sweets'); onSelectSubcategory?.('Dry Fruit Sweets'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-1.5 hover:bg-purple-50 text-xs text-gray-700"
                  >
                    Kaju &amp; Dry Fruit Delights
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Sweets'); onSelectSubcategory?.('Pure Ghee Sweets'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-1.5 hover:bg-purple-50 text-xs text-gray-700"
                  >
                    Pure Desi Ghee Mysore Pak
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Sweets'); onSelectSubcategory?.('Ladoos'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-1.5 hover:bg-purple-50 text-xs text-gray-700"
                  >
                    Motichoor &amp; Besan Ladoos
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Sweets'); onSelectSubcategory?.('Syrup Delicacies'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-1.5 hover:bg-purple-50 text-xs text-gray-700"
                  >
                    Gulab Jamun &amp; Bengali Rasgulla
                  </button>
                </div>
              )}
            </div>

            {/* Namkeens Dropdown (Directly shown open in reference image!) */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('namkeens')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                onClick={() => onSelectCategory('Namkeens')}
                className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Namkeens' ? 'bg-purple-900 font-bold' : ''}`}
              >
                <span>Namkeens</span>
                <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Exact dropdown from the reference image: "Roasted Namkeens", "View All" */}
              {openDropdown === 'namkeens' && (
                <div className="absolute left-0 top-full mt-0 w-52 bg-white text-gray-800 rounded-b-lg shadow-2xl border border-gray-200 py-1.5 animate-fade-in z-50">
                  <button 
                    onClick={() => { 
                      onSelectCategory('Namkeens'); 
                      onSelectSubcategory?.('Roasted Namkeens');
                      setOpenDropdown(null); 
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800 transition"
                  >
                    Roasted Namkeens
                  </button>
                  <button 
                    onClick={() => { 
                      onSelectCategory('Namkeens'); 
                      setOpenDropdown(null); 
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800 border-t border-gray-100 transition"
                  >
                    View All
                  </button>
                </div>
              )}
            </div>

            {/* Snacks */}
            <button 
              onClick={() => onSelectCategory('Snacks')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Snacks' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Snacks
            </button>

            {/* Bakery & Boulangerie */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('bakery')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                onClick={() => onSelectCategory('Bakery')}
                className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Bakery' ? 'bg-purple-900 font-bold' : ''}`}
              >
                <span>Bakery &amp; Boulangerie</span>
                <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {openDropdown === 'bakery' && (
                <div className="absolute left-0 top-full mt-0 w-56 bg-white text-gray-800 rounded-b-lg shadow-2xl border border-gray-200 py-1.5 animate-fade-in z-50">
                  <button 
                    onClick={() => { onSelectCategory('Bakery'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800"
                  >
                    Dairy Cream Red Velvet
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Bakery'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800"
                  >
                    Black Forest Jar Cakes
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Bakery'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800"
                  >
                    Vanilla Marble Tea Cake
                  </button>
                  <button 
                    onClick={() => { onSelectCategory('Bakery'); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium text-gray-800 border-t border-gray-100 font-semibold text-brand-kanti"
                  >
                    View All Bakes
                  </button>
                </div>
              )}
            </div>

            {/* Chocolates */}
            <button 
              onClick={() => onSelectCategory('Chocolates')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Chocolates' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Chocolates
            </button>

            {/* Gifting */}
            <button 
              onClick={() => onSelectCategory('Gifting')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Gifting' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Gifting
            </button>

            {/* Candles & Fragrances */}
            <button 
              onClick={() => onSelectCategory('Fragrances')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Fragrances' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Candles &amp; Fragrances
            </button>

            {/* Ice creams */}
            <button 
              onClick={() => onSelectCategory('Ice Cream')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Ice Cream' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Ice creams
            </button>

            {/* Tea */}
            <button 
              onClick={() => onSelectCategory('Tea')}
              className={`px-3 py-2 rounded hover:bg-purple-900/60 transition ${activeCategory === 'Tea' ? 'bg-purple-900 font-bold' : ''}`}
            >
              Tea
            </button>

          </div>

          {/* SaaS Interactive Box Builder Callout */}
          <div className="shrink-0 py-1 pl-2">
            <button
              onClick={onOpenBoxBuilder}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bold text-xs shadow hover:shadow-md transition transform hover:-translate-y-0.5"
            >
              <Package size={14} />
              <span>Build Custom Box</span>
              <Sparkles size={12} className="text-purple-900 animate-spin" />
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
};
