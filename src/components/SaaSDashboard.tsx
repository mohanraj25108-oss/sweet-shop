import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  AlertTriangle, 
  ChefHat, 
  DollarSign, 
  Package, 
  CheckCircle, 
  ArrowUpRight, 
  RefreshCw, 
  Filter, 
  Calendar,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye
} from 'lucide-react';
import { Product, Order } from '../types';

interface SaaSDashboardProps {
  products: Product[];
  orders: Order[];
  onToggleStock: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onExitSaaS: () => void;
}

export const SaaSDashboard: React.FC<SaaSDashboardProps> = ({
  products,
  orders,
  onToggleStock,
  onUpdateOrderStatus,
  onExitSaaS,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'costing' | 'analytics'>('orders');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 84250);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered').length + 8;
  const lowStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="bg-gray-100 min-h-screen font-sans animate-fade-in">
      
      {/* SaaS Top Navigation */}
      <header className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold">
              <ChefHat size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg text-white">
                  SweetOps Pro™
                </h1>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Merchant SaaS
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Kanti Sweets Flagship Kitchen &amp; Multi-Store Dispatch Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitSaaS}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-kanti hover:bg-brand-kantiHover text-white text-xs font-bold transition shadow"
            >
              <Eye size={14} />
              <span>Back to Customer Storefront</span>
            </button>
          </div>

        </div>

        {/* Dashboard Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs font-medium border-t border-gray-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: 'Live Kitchen Pipeline', icon: ShoppingBag },
            { id: 'inventory', label: 'Fresh Batches & Stock', icon: Package },
            { id: 'costing', label: 'Ghee & Recipe Costing', icon: DollarSign },
            { id: 'analytics', label: 'Store Sales Intelligence', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main SaaS Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
              <span>Today's Gross Sales</span>
              <span className="p-1.5 bg-green-50 text-green-700 rounded-lg">
                <TrendingUp size={15} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-gray-900">₹{totalRevenue.toLocaleString()}</span>
              <span className="text-xs text-green-700 font-bold flex items-center">
                +18.4% <ArrowUpRight size={13} />
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">42 orders from Nelamangala &amp; Indiranagar</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
              <span>Kitchen Dispatch Queue</span>
              <span className="p-1.5 bg-purple-50 text-brand-kanti rounded-lg">
                <ShoppingBag size={15} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-gray-900">{activeOrdersCount}</span>
              <span className="text-xs text-purple-700 font-bold">Active Orders</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Avg packing time: 14.2 minutes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
              <span>Pure Desi Ghee Used</span>
              <span className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                <ChefHat size={15} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-gray-900">54.8 kg</span>
              <span className="text-xs text-amber-800 font-bold">A2 Gir Cow Ghee</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">12 cauldrons simmered today</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
              <span>Freshness SLA Score</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                <CheckCircle size={15} />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-emerald-700">99.1%</span>
              <span className="text-xs text-gray-500 font-medium">Optimal Purity</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">FSSAI Batch QC: Passed (08:30 AM)</p>
          </div>

        </div>

        {/* TAB 1: Live Kitchen Order Pipeline */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900">
                  Real-time Kitchen Order Pipeline
                </h3>
                <p className="text-xs text-gray-500">
                  Update preparation status as orders move from cauldron to delivery rider
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-ping" />
                Live WebSocket Connected
              </span>
            </div>

            {/* Kanban columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Column 1: Received */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    1. Received (1)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>

                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-brand-kanti">#KS-889124</span>
                    <span className="text-[10px] text-gray-400">2 mins ago</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Pooja Venkatesh</p>
                  <p className="text-[11px] text-gray-500">Kaju Katli (500g), Mysore Pak (250g)</p>
                  <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                    <span className="font-bold text-gray-900">₹870</span>
                    <button
                      onClick={() => alert("Moved to Kitchen Preparation")}
                      className="px-2 py-1 bg-brand-kanti text-white rounded text-[10px] font-bold"
                    >
                      Start Prep →
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 2: Kitchen Prep */}
              <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-center justify-between pb-3 border-b border-purple-200 mb-3">
                  <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                    2. In Cooking &amp; Baking (2)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-brand-kanti">#KS-774102</span>
                      <span className="text-[10px] text-amber-700 font-semibold">12 mins in oven</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800">Kiran Narayanan</p>
                    <p className="text-[11px] text-gray-500">Dairy Cream Red Velvet Cake, Jar Cakes</p>
                    <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                      <span className="font-bold text-gray-900">₹1,000</span>
                      <button
                        onClick={() => alert("Marked Ready for QC")}
                        className="px-2 py-1 bg-amber-500 text-purple-950 rounded text-[10px] font-bold"
                      >
                        QC Seal →
                      </button>
                    </div>
                  </div>

                  {orders.map((o) => (
                    <div key={o.id} className="p-3 bg-white rounded-xl border border-purple-200 shadow-sm space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-brand-kanti">#{o.id}</span>
                        <span className="text-[10px] text-purple-700 font-bold">{o.createdAt}</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">{o.customerName}</p>
                      <p className="text-[11px] text-gray-500">{o.items.map(i => i.product.name).join(', ')}</p>
                      <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                        <span className="font-bold text-gray-900">₹{o.totalAmount}</span>
                        <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-bold">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Quality Check & Tamper Sealing */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-3">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    3. QC &amp; Sealing (1)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-brand-kanti">#KS-652390</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Weight 1.02 kg (Passed)</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Sunil Rao</p>
                  <p className="text-[11px] text-gray-500">Bespoke 6-Slot Velvet Box with Satin Ribbon</p>
                  <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                    <span className="font-bold text-gray-900">₹1,420</span>
                    <button
                      onClick={() => alert("Handed over to Express Rider")}
                      className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                    >
                      Hand to Rider →
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 4: Out for Delivery */}
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200 mb-3">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    4. En Route (3)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-brand-kanti">#KS-441209</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">ETA: 8 mins</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Ananya Deshmukh</p>
                  <p className="text-[11px] text-gray-500">Rider: Manjunath B. (+91 97410 44321)</p>
                  <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
                    <span className="font-bold text-gray-900">₹650</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Near Indiranagar 100ft Rd
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Fresh Batches & Real-time Stock Manager */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900">
                  Fresh Batch Expiration &amp; Live Stock Switcher
                </h3>
                <p className="text-xs text-gray-500">
                  Toggle stock visibility directly on the public storefront. Monitor fresh mawa &amp; ghee shelf-life.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                {products.length} Products Monitored
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-y border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Sweet / Confectionery</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (500g)</th>
                    <th className="py-3 px-4">Shelf-Life Health</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Storefront Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{prod.name}</p>
                          <p className="text-[10px] text-gray-500">{prod.tag || 'Standard'}</p>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-purple-900 font-semibold">
                        {prod.category}
                      </td>

                      <td className="py-3 px-4 font-bold text-gray-900">
                        ₹{prod.price}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            prod.shelfLifeDays && prod.shelfLifeDays <= 5
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {prod.shelfLifeDays ? `${prod.shelfLifeDays} days (Fresh batch)` : 'Optimal'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.inStock
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onToggleStock(prod.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            prod.inStock
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {prod.inStock ? 'Mark Sold Out' : 'Restock Now'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Recipe & Ghee Costing Calculator */}
        {activeTab === 'costing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Daily Raw Ingredient Spot Rates &amp; Batch Margins
              </h3>
              <p className="text-xs text-gray-500">
                Real-time price index for pure ghee, dry fruits, and packaging supplies across Bengaluru mandi
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <p className="text-[11px] font-semibold text-amber-900">A2 Cow Ghee (Bulk 15kg Tin)</p>
                  <p className="text-lg font-bold text-amber-950 mt-1">₹720 / kg</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">-₹15 from last week</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                  <p className="text-[11px] font-semibold text-purple-900">Goan Cashews W240</p>
                  <p className="text-lg font-bold text-purple-950 mt-1">₹890 / kg</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Stable price</p>
                </div>

                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200">
                  <p className="text-[11px] font-semibold text-orange-900">Kashmiri Mongra Saffron</p>
                  <p className="text-lg font-bold text-orange-950 mt-1">₹280 / gram</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">GI-Tagged direct source</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Batch Margin Breakdown (Special Mysore Pak 500g):
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Pure Ghee (225g)</span>
                    <span className="font-semibold text-gray-900">₹162.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Roasted Besan Gram Flour (150g)</span>
                    <span className="font-semibold text-gray-900">₹18.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Refined Sugar &amp; Cardamom (125g)</span>
                    <span className="font-semibold text-gray-900">₹12.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Tamper Seal Tin Packaging &amp; Label</span>
                    <span className="font-semibold text-gray-900">₹24.00</span>
                  </div>
                  <div className="flex justify-between py-1 font-bold text-emerald-700 text-sm">
                    <span>Retail Price: ₹380 | Gross Margin:</span>
                    <span>43.1% Profit (₹164.00)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900 to-brand-kanti text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  SaaS Smart Procurement
                </span>
                <h4 className="font-serif font-bold text-xl text-white mt-2">
                  Diwali &amp; Wedding Festive Surge Forecast
                </h4>
                <p className="text-xs text-purple-200 mt-2 leading-relaxed">
                  Based on last year's order velocity, order 250kg additional cashews and 400kg ghee before the price surge on Friday.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-800">
                <button
                  onClick={() => alert("Auto PO Draft created for Nandini A2 Dairy supplier!")}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-bold transition shadow"
                >
                  Generate Supplier Purchase Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Store Sales Intelligence */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-gray-900">
              Top Performing Sweet &amp; Savoury Categories (Last 30 Days)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {[
                { name: 'Kaju Katli (Silver Leaf)', sales: '₹4,12,000', units: '840 units', share: '32%' },
                { name: 'Special Mysore Pak', sales: '₹3,24,000', units: '852 units', share: '25%' },
                { name: 'Dairy Cream Red Velvet', sales: '₹2,10,000', units: '308 units', share: '16%' },
                { name: 'Roasted Namkeens & Mixture', sales: '₹1,85,000', units: '948 units', share: '14%' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50/70">
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                    Rank #{i + 1}
                  </span>
                  <p className="font-bold text-gray-900 text-sm mt-2">{item.name}</p>
                  <p className="text-lg font-serif font-black text-brand-kanti mt-1">{item.sales}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{item.units} • {item.share} of revenue</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

