import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css'
import { CartProvider } from './CartWrapper';
import { AuthProvider } from './AuthWrapper';
import { FilterProvider} from './FilterWrapper'
import { DynamicStateProvider} from './DynamicStateWrapper'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dynamic E-Commerce',
  description: 'A dynamic e-commerce website built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <DynamicStateProvider>
          <AuthProvider>
              <CartProvider>
                <Suspense>
                <FilterProvider>{children}
                  <SpeedInsights/>
                </FilterProvider>
                </Suspense>
              </CartProvider>
          </AuthProvider>
        </DynamicStateProvider>
      </body>
    </html>
  );
}
