import { AuthContext } from '@/context/AutxContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { CONFIG } from './config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const baseurl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: CONFIG.appTitle,
  description: CONFIG.appDescription,
  metadataBase: new URL(baseurl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <link rel="/manifest.json" href="/manifest" />
      <body>
        <Toaster position="top-center" richColors />
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
4;
