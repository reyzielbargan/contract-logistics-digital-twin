import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'DSV Digital Twin 2030',
  description: 'Autonomous Contract Logistics Control Tower',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}