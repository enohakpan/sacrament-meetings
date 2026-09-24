import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GRA Ward',
  description: 'Ward meeting schedule, hymn list, and sacrament meeting agenda.',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
