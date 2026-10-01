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

const siteDescription = 'Ward meeting schedule, hymn list, and sacrament meeting agenda for GRA Ward, Wuse Stake.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.AUTH_URL ?? 'http://localhost:3000'),
  title: {
    default: 'GRA Ward | Sacrament Meetings',
    template: '%s | GRA Ward',
  },
  description: siteDescription,
  openGraph: {
    title: 'GRA Ward | Sacrament Meetings',
    description: siteDescription,
    siteName: 'GRA Ward',
    type: 'website',
  },
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
