'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // ปรับ href ให้ตรงตามชื่อโฟลเดอร์ใน app/ เป๊ะๆ
  const navItems = [
    { name: 'Control Tower', href: '/', icon: '🌐' },
    { name: 'Solar & Energy', href: '/solar', icon: '☀️' },
    { name: 'Inventory & WMS', href: '/inventory', icon: '📦' },
    { name: 'AI Agent (P&L / SLA)', href: '/ai-agent', icon: '🤖' },
    { name: 'Scenario Simulator', href: '/scenario-simulator', icon: '🧪' },
    { name: 'Future Readiness Scale', href: '/future-readiness', icon: '💾' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 999,
      }}
    >
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: isHovered ? '240px' : '64px',
          height: 'calc(100vh - 32px)',
          backgroundColor: '#ffffffff',
          borderRadius: '16px',
          border: '1px solid #1E293B',
          boxShadow: isHovered
            ? '0 20px 35px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.15)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 8px',
            marginBottom: '12px',
            minHeight: '40px',
            gap: '12px',
            borderBottom: '1px solid #1E293B',
          }}
        >
          <div
            style={{
              fontWeight: '900',
              fontSize: '1.2rem',
              color: '#3B82F6',
              minWidth: '32px',
              textAlign: 'center',
            }}
          >
            DSV
          </div>
        </div>

        {/* Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  color: isActive ? '#60A5FA' : '#94A3B8',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
              >
                <span
                  style={{
                    fontSize: '1.2rem',
                    minWidth: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </span>

                <span
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? '600' : 'normal',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}