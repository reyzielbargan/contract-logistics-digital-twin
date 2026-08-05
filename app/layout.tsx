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
      <body style={{ margin: 0, padding: 0, backgroundColor: '#e2e8f0', color: '#000000ff', minHeight: '100vh' }}>
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          {/* Sidebar Floating */}
          <Sidebar />

          {/* Main Content Area */}
          <main
            className="main-content"
            style={{
              flex: 1,
              paddingLeft: '88px', // เว้นพ้นแถบไอคอน
              paddingRight: '24px',
              paddingTop: '20px',
              paddingBottom: '20px',
              minWidth: 0, // ป้องกัน Grid/Flex ดันหน้าจอแตก
              boxSizing: 'border-box',
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}