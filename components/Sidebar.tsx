'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Globe, 
  Sun, 
  Package, 
  Bot, 
  FlaskConical, 
  Save 
} from 'lucide-react';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Control Tower', href: '/', icon: <Globe size={20} /> },
    { name: 'Solar & Energy', href: '/solar', icon: <Sun size={20} /> },
    { name: 'Inventory & WMS', href: '/inventory', icon: <Package size={20} /> },
    { name: 'AI Agent (P&L / SLA)', href: '/ai-agent', icon: <Bot size={20} /> },
    { name: 'Scenario Simulator', href: '/scenario-simulator', icon: <FlaskConical size={20} /> },
    { name: 'Future Readiness Scale', href: '/future-readiness', icon: <Save size={20} /> },
    { name: 'Recap', href: '/Recap', icon: <Save size={20} /> },
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
          backgroundColor: '#ffffff',
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
            padding: '8px 4px',
            marginBottom: '12px',
            minHeight: '40px',
            borderBottom: '1px solid #1E293B',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: isHovered ? 'flex-start' : 'center',
              alignItems: 'center',
              paddingLeft: isHovered ? '8px' : '0px',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: isHovered ? '90px' : '32px',
                height: isHovered ? '32px' : '20px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Image
                src="/picture/Logo_blue.svg"
                alt="DSV Logo"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
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