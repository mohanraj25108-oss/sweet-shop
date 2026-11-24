import React, { useState } from 'react';
import { PRODUCTS, STORE_LOCATIONS } from './data/mockData';
import { Product, CartItem, CustomBox, Order, StoreLocation } from './types';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryDiscover } from './components/CategoryDiscover';
import { ProductGrid } from './components/ProductGrid';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LocationModal } from './components/LocationModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { ContactModal } from './components/ContactModal';
import { CatalogModal } from './components/CatalogModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SaaSDashboard } from './components/SaaSDashboard';
import { SweetClubModal } from './components/SweetClubModal';
import { BulkGiftingModal } from './components/BulkGiftingModal';
import { Footer } from './components/Footer';

export function App() {
  // State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [currentLocation, setCurrentLocation] = useState<StoreLocation>(STORE_LOCATIONS[0]); // Nelamangala Flagship
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSaaSMode, setIsSaaSMode] = useState<boolean>(false);

  // Cart & Custom Boxes
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      product: PRODUCTS[0], // Kaju Katli
      selectedWeight: '500g Standard Box',
      price: 490,
      quantity: 1,
    },
    {
      id: 'initial-2',
      product: PRODUCTS[1], // Mysore Pak
      selectedWeight: '500g',
      price: 380,
      quantity: 1,
    }
  ]);
  const [customBoxes, setCustomBoxes] = useState<CustomBox[]>([]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isSweetClubModalOpen, setIsSweetClubModalOpen] = useState(false);
  const [isBulkGiftingModalOpen, setIsBulkGiftingModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutSlot, setCheckoutSlot] = useState<string>('Today Evening (4:00 PM - 6:00 PM)');

  // Handlers
  const handleAddToCart = (product: Product, weightLabel: string, price: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weightLabel
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          selectedWeight: weightLabel,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustomBox = (box: CustomBox) => {
    setCustomBoxes((prev) => [...prev, box]);
    setIsCartOpen(true);
  };

  const handleRemoveCustomBox = (id: string) => {
    setCustomBoxes((prev) => prev.filter((b) => b.id !== id));
  };

  const handleProceedToCheckout = (discount: number, slot: string) => {
    setCheckoutDiscount(discount);
    setCheckoutSlot(slot);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    setCartItems([]);
    setCustomBoxes([]);
    setIsCheckoutModalOpen(false);
    setIsOrderTrackerOpen(true);
  };

  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  // Cart totals
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0) + customBoxes.length;
  const cartTotal =
    cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0) +
    customBoxes.reduce((acc, b) => acc + b.totalPrice, 0);

  // Eligible sweets for custom box
  const eligibleSweets = products.filter((p) => p.isCustomBoxEligible || p.category === 'Sweets');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-900 flex flex-col font-sans">
      
      {/* If SaaS Mode is active, show the Merchant Dashboard */}
      {isSaaSMode ? (
        <SaaSDashboard
          products={products}
          orders={orders}
          onToggleStock={handleToggleStock}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onExitSaaS={() => setIsSaaSMode(false)}
        />
      ) : (
        <>
          {/* Top Sticky Header & Purple Navigation Bar matching Reference */}
          <Navbar
            currentLocation={currentLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenStoreModal={() => setIsStoreModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
            cartTotal={cartTotal}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setActiveSubcategory('');
            }}
            onSelectSubcategory={(sub) => setActiveSubcategory(sub)}
            onSearch={(query) => setSearchQuery(query)}
            searchQuery={searchQuery}
            onToggleSaaSMode={() => setIsSaaSMode(true)}
            isSaaSMode={isSaaSMode}
            onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
            onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
            onOpenProfileModal={() => setIsSweetClubModalOpen(true)}
            onOpenBulkGiftingModal={() => setIsBulkGiftingModalOpen(true)}
            allProducts={products}
          />

          {/* Hero Carousel (Matching Reference Screenshot banners) */}
          <HeroCarousel
            onExploreBakery={() => {
              setActiveCategory('Bakery');
              setActiveSubcategory('');
            }}
            onExploreHeritage={() => {
              setActiveCategory('Fragrances');
              setActiveSubcategory('');
            }}
            onExploreSweets={() => {
              setActiveCategory('Sweets');
              setActiveSubcategory('');
            }}
            onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          />

          {/* Category Discovery Section (Matching Reference lower section) */}
          <CategoryDiscover
            selectedCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setActiveSubcategory('');
            }}
          />

          {/* Product Grid */}
          <main className="flex-1">
            <ProductGrid
              products={products}
              selectedCategory={activeCategory}
              selectedSubcategory={activeSubcategory}
              onSelectSubcategory={(sub) => setActiveSubcategory(sub)}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          </main>

          {/* Footer */}
          <Footer
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setActiveSubcategory('');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            onOpenStoreModal={() => setIsStoreModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
            onToggleSaaS={() => setIsSaaSMode(true)}
          />
        </>
      )}

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        customBoxes={customBoxes}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onRemoveCustomBox={handleRemoveCustomBox}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CustomBoxBuilder
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        eligibleSweets={eligibleSweets}
        onAddCustomBoxToCart={handleAddCustomBox}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      <StoreLocatorModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <CatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubcategory('');
        }}
      />

      <ProductDetailModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        customBoxes={customBoxes}
        discount={checkoutDiscount}
        deliverySlot={checkoutSlot}
        currentStore={currentLocation}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        order={activeOrder}
        onUpdateOrderStatus={(st) => {
          if (activeOrder) {
            handleUpdateOrderStatus(activeOrder.id, st);
          }
        }}
      />

      <SweetClubModal
        isOpen={isSweetClubModalOpen}
        onClose={() => setIsSweetClubModalOpen(false)}
        orders={orders}
        onTrackOrder={(ord) => {
          setActiveOrder(ord);
          setIsOrderTrackerOpen(true);
        }}
      />

      <BulkGiftingModal
        isOpen={isBulkGiftingModalOpen}
        onClose={() => setIsBulkGiftingModalOpen(false)}
      />

    </div>
  );
}

export default App;

