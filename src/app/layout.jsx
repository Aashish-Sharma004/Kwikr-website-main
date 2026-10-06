import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import PageLoader from '@/components/ui/PageLoader';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FlyToCart from '@/components/ui/FlyToCart';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Kwikr – Groceries Delivered in 10 Minutes',
  description: 'Order fresh groceries, fruits, vegetables, dairy, and daily essentials online. Get them delivered in 10 minutes with Kwikr.',
  keywords: 'grocery delivery, fresh vegetables, fruits, dairy, 10 minute delivery, online grocery',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <PageLoader />
        <ScrollProgress />
        <FlyToCart />
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <RecentlyViewedProvider>
                <Header />
                <main className="min-h-screen flex-1">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 2000,
                    style: { background: '#1a9e3f', color: '#fff', fontWeight: 600, borderRadius: '10px' },
                  }}
                />
              </RecentlyViewedProvider>
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
