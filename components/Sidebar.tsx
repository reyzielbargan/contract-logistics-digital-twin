'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '🌐 Control Tower', href: '/' },
  { label: '☀️ Solar & Energy', href: '/solar' },
  { label: '📦 Inventory & WMS', href: '/inventory' },
  { label: '🤖 AI Agent (P&L / SLA)', href: '/ai-agent' },
  { label: '🧪 Scenario Simulator', href: '/scenario-simulator' },
  { label: '💾 Future Readiness Scale', href: '/future-readiness' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
<div className="brand p-4">
  <img 
    src="/picture/Logo white.svg" 
    alt="DSV Logo" 
    className="w-28 h-auto object-contain"
  />
</div>
      <ul className="menu-list">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className={`menu-item ${isActive ? 'active' : ''}`}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}