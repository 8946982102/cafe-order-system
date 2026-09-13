import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeSpecials } from './components/HomeSpecials';
import { MenuView } from './components/MenuView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { MountainAboutView } from './components/MountainAboutView';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0805] text-[#FAF5EF] selection:bg-[#991B1B] selection:text-white">
      {/* Top Main Navigation */}
      <Navbar />

      {/* Main Dynamic View with Global Transitions */}
      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full"
          >
            {activePage === 'home' && (
              <div>
                <Hero />
                <HomeSpecials />
              </div>
            )}

            {activePage === 'menu' && <MenuView />}

            {activePage === 'track' && <OrderTrackingView />}

            {activePage === 'order-success' && <OrderSuccessView />}

            {activePage === 'about' && <MountainAboutView />}

            {activePage === 'admin' && <AdminDashboard />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AuthModal />
      <MobileQuickBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
