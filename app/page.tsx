'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WarehouseNode {
  id: string;
  name: string;
  solar: string;
  margin: string;
  sla: string;
  status: string;
}

export default function ControlTowerPage() {
  const [selectedFacility, setSelectedFacility] = useState<string>('wh-01');
  const [actionApproved, setActionApproved] = useState<boolean>(false);

  // Facility Node Dataset
  const facilities: Record<string, WarehouseNode> = {
    'wh-01': {
      id: 'wh-01',
      name: 'Warehouse 01 - Main Logistics Hub (Active)',
      solar: '645 kW',
      margin: '24.2%',
      sla: '99.8%',
      status: 'Optimal Operations',
    },
    'wh-02': {
      id: 'wh-02',
      name: 'Warehouse 02 - Cold Chain & FMCG Facility',
      solar: '410 kW',
      margin: '21.5%',
      sla: '98.5%',
      status: 'Moderate Load',
    },
    'wh-03': {
      id: 'wh-03',
      name: 'Warehouse 03 - Automated Regional Hub',
      solar: '820 kW',
      margin: '26.8%',
      sla: '99.9%',
      status: 'Peak Efficiency',
    },
  };

  const current = facilities[selectedFacility];

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1>Global Operations Control Tower</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            Autonomous Contract Logistics & Enterprise Digital Twin 2030
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
            Latency: <span style={{ color: '#10B981' }}>12ms</span> | Real-Time Sync
          </div>
          <div className="status-badge" style={{ borderColor: '#10B981' }}>
            ● AI Co-Pilot Active
          </div>
        </div>
      </header>

      {/* Facility Node Selector Bar */}
      <div className="card" style={{ padding: '12px 18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', whiteSpace: 'nowrap' }}>
            Select Facility Node:
          </span>
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            style={{
              backgroundColor: '#0F172A',
              color: '#FFF',
              border: '1px solid #334155',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              flex: 1,
              maxWidth: '420px',
            }}
          >
            <option value="wh-01">Warehouse 01 - Main Logistics Hub (Active)</option>
            <option value="wh-02">Warehouse 02 - Cold Chain & FMCG Facility</option>
            <option value="wh-03">Warehouse 03 - Automated Regional Hub</option>
          </select>
          <span style={{ fontSize: '0.8rem', color: '#10B981', marginLeft: 'auto' }}>
            ● Status: {current.status}
          </span>
        </div>
      </div>

      {/* Data Stream Indicators (FIXED FLEX-WRAP) */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '20px', 
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid #334155'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 'bold', marginRight: '4px' }}>
          8 Data Streams:
        </span>
        {[
          { label: 'Solar Gen', icon: '☀️', color: '#F59E0B' },
          { label: 'Energy Draw', icon: '⚡', color: '#EF4444' },
          { label: 'WMS / TMS', icon: '📦', color: '#3B82F6' },
          { label: 'IoT Sensors', icon: '📡', color: '#8B5CF6' },
          { label: 'Financial P&L', icon: '💰', color: '#10B981' },
          { label: 'Knowledge Base', icon: '📚', color: '#06B6D4' },
          { label: 'Client Demand', icon: '📈', color: '#EC4899' },
          { label: 'Workforce & AGVs', icon: '🤖', color: '#F97316' },
        ].map((stream, idx) => (
          <div
            key={idx}
            style={{
              background: '#0F172A',
              border: `1px solid ${stream.color}40`,
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            <span>{stream.icon}</span>
            <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{stream.label}</span>
          </div>
        ))}
      </div>

      {/* --- TOP KEY PERFORMANCE CARDS --- */}
      <div className="grid-container" style={{ marginBottom: '16px' }}>
        
        {/* Metric 1: Solar Power */}
        <div className="card">
          <div className="card-title">
            SOLAR POWER GENERATION <span>☀️</span>
          </div>
          <div className="metric-value">{current.solar}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
            <span style={{ color: 'var(--success)' }}>↑ 18% vs Forecast</span>
            <span style={{ color: 'var(--text-sub)' }}>Grid Draw: -32%</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#0F172A', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', backgroundColor: '#F59E0B' }} />
          </div>
        </div>

        {/* Metric 2: Contract Margin */}
        <div className="card">
          <div className="card-title">
            CONTRACT MARGIN <span>💰</span>
          </div>
          <div className="metric-value">{current.margin}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
            <span style={{ color: 'var(--success)' }}>+3.5% vs Target</span>
            <span style={{ color: 'var(--text-sub)' }}>Real-time P&L</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#0F172A', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '68%', height: '100%', backgroundColor: '#3B82F6' }} />
          </div>
        </div>

        {/* Metric 3: SLA Fulfillment */}
        <div className="card">
          <div className="card-title">
            SLA FULFILLMENT <span>🎯</span>
          </div>
          <div className="metric-value">{current.sla}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
            <span style={{ color: 'var(--success)' }}>OTIF Compliant</span>
            <span style={{ color: 'var(--text-sub)' }}>Zero Penalties</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#0F172A', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '99.8%', height: '100%', backgroundColor: '#10B981' }} />
          </div>
        </div>

      </div>

      {/* --- AI PRESCRIPTIVE REASONING ENGINE --- */}
      <div className="card" style={{ marginBottom: '20px', borderLeft: '4px solid #3B82F6' }}>
        <div className="card-title" style={{ marginBottom: '14px' }}>
          <span>AI PRESCRIPTIVE ENGINE (LIVE REASONING)</span>
          <span className="ai-badge">PRESCRIPTIVE AI</span>
        </div>

        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          <div style={{ background: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>1. What Happened</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
              Cloud cover approaching at 14:00. Solar output drop predicted (-35%).
            </div>
          </div>

          <div style={{ background: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>2. Why It Happened</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
              Sudden localized weather shift combined with 500 VIP express orders.
            </div>
          </div>

          <div style={{ background: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>3. What Will Happen</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
              Peak electricity tariff trigger in 2 hours ($2,400 cost spike).
            </div>
          </div>

          <div style={{ background: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold' }}>4. Recommended Action</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
              Switch to Battery B + Reroute 12 AGVs to VIP Lane.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
            Confidence Level: <strong style={{ color: '#10B981' }}>96.4%</strong>
          </span>
          <button
            className="sim-btn"
            disabled={actionApproved}
            onClick={() => setActionApproved(true)}
            style={{
              backgroundColor: actionApproved ? '#10B981' : 'var(--dsv-accent)',
              cursor: actionApproved ? 'not-allowed' : 'pointer',
            }}
          >
            {actionApproved ? '✓ Action Executed' : 'Approve & Execute Action'}
          </button>
        </div>
      </div>

      {/* --- EXECUTIVE NAVIGATION PORTAL --- */}
      <div className="card-title" style={{ marginBottom: '12px' }}>
        <span>🚀 Enterprise Navigation Portal (Deep Dive Modules)</span>
      </div>

      <div className="grid-container">
        
        <Link href="/solar" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title">☀️ Solar & Water Utilities</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0' }}>
              Monitor green power generation, BESS storage, and rainwater recycling analytics.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 'bold' }}>View Utilities →</span>
          </div>
        </Link>

        <Link href="/ai-agent" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title">🤖 AI Agent (P&L / SLA)</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0' }}>
              Interactive AI Co-Pilot chat and hourly financial savings trend.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 'bold' }}>Open AI Chat →</span>
          </div>
        </Link>

        <Link href="/scenario-simulator" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title">🧪 Scenario Simulator</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0' }}>
              Stress-test demand spikes (+50%) and solar outages in Digital Twin sandbox.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 'bold' }}>Run Simulator →</span>
          </div>
        </Link>

      </div>
    </>
  );
}