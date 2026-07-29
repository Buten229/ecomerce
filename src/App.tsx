import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { HomePage } from '@/pages/home/index';
import { CatalogPage } from '@/pages/catalog/index';
import { ProductDetailPage } from '@/pages/product-detail/index';
import { CartPage } from '@/pages/cart/index';
import { CheckoutPage } from '@/pages/checkout/index';
import { AuthPage } from '@/pages/auth/index';
import { ProfilePage } from '@/pages/profile/index';
import { AdminPage } from '@/pages/admin/index';
import { useAuthStore } from '@/store/authStore';
import { setupMobileEnvironment } from '@/lib/capacitorConfig';

export const App: React.FC = () => {
  const checkSession = useAuthStore((s) => s.checkSession);

  useEffect(() => {
    setupMobileEnvironment();
    checkSession();
  }, [checkSession]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
