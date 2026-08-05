'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { 
  Sun, 
  Truck, 
  Package, 
  Bot, 
  DollarSign, 
  Zap, 
  Radio, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Rocket,
  FlaskConical
} from 'lucide-react';

interface WarehouseNode {
  id: string;
  name: string;
  solar: string;
  margin: string;
  sla: string;
  status: string;
}

interface ZoneInfo {
  id: string;
  name: string;
  type: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  metrics: { label: string; value: string }[];
  icon: React.ReactNode;
  color: string;
}

const WAREHOUSE_ZONES: ZoneInfo[] = [
  {
    id: 'solar',
    name: 'Rooftop Solar Array & BESS',
    type: 'Energy Infrastructure',
    status: 'Optimal',
    icon: <Sun size={20} />,
    color: '#00A79D',
    metrics: [
      { label: 'Generation', value: '645 kW' },
      { label: 'BESS Battery', value: '94% Charge' },
      { label: 'Grid Feed', value: 'Active' },
    ],
  },
  {
    id: 'receiving',
    name: 'Inbound Receiving & Ingestion',
    type: 'Logistics Dock A-D',
    status: 'Optimal',
    icon: <Truck size={20} />,
    color: '#005EB8',
    metrics: [
      { label: 'Active Docks', value: '4 / 4' },
      { label: 'Throughput', value: '180 Pallets/hr' },
      { label: 'Unload Delay', value: '0 min' },
    ],
  },
  {
    id: 'racking',
    name: 'High-Bay Automated Racking',
    type: 'AS/RS Storage Node',
    status: 'Warning',
    icon: <Package size={20} />,
    color: '#F59E0B',
    metrics: [
      { label: 'Capacity', value: '92% Full' },
      { label: 'Pallet Slots', value: '14,250' },
      { label: 'Crane Speed', value: '98% Eff.' },
    ],
  },
  {
    id: 'agv',
    name: 'Autonomous AGV & Sorting Hub',
    type: 'Robotics & Transport',
    status: 'Optimal',
    icon: <Bot size={20} />,
    color: '#3B82F6',
    metrics: [
      { label: 'Active AGVs', value: '24 Fleet' },
      { label: 'Battery Avg', value: '88%' },
      { label: 'Bottleneck', value: 'Clear' },
    ],
  },
  {
    id: 'outbound',
    name: 'Outbound Dispatch & Shipping',
    type: 'Fulfillment & Staging',
    status: 'Optimal',
    icon: <Truck size={20} />,
    color: '#10B981',
    metrics: [
      { label: 'OTIF Rate', value: '99.8%' },
      { label: 'Pending Trucks', value: '2 Vehicles' },
      { label: 'Pack Line', value: '100% SLA' },
    ],
  },
];

export default function ControlTowerPage() {
  const [selectedFacility, setSelectedFacility] = useState<string>('wh-01');
  const [actionApproved, setActionApproved] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<ZoneInfo>(WAREHOUSE_ZONES[0]);

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
          <h1>DSV Composite AI System</h1>
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

      {/* --- 3D INTERACTIVE WAREHOUSE NODE (REPLACED SELECTOR BAR) --- */}
      <div
        style={{
          backgroundColor: '#ffffffff',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: '0 4px 10px rgba(130, 130, 130, 0.4)',
        }}
      >
        {/* Top Selection Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            paddingBottom: '10px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', whiteSpace: 'nowrap' }}>
              Select Facility Node:
            </span>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              style={{
                backgroundColor: '#ffffffff',
                color: '#000000ff',
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
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#10B981' }}>
              ● Status: {current.status}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                background: 'rgba(0, 94, 184, 0.3)',
                color: '#60A5FA',
                border: '1px solid #005EB8',
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              3D DIGITAL TWIN
            </span>
          </div>
        </div>

        {/* 3D Map Visualizer & Telemetry Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 2fr) minmax(250px, 1fr)',
            gap: '16px',
          }}
        >
          {/* Isometric 3D Interactive Floorplan */}
          <div
            style={{
              background: 'radial-gradient(circle at center, #0F1C38 0%, #080D1A 100%)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #0056e161',
              minHeight: '190px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#ffffff',
                backgroundSize: '20px 20px',
              }}
            />

            <span
              style={{
                position: 'absolute',
                top: '8px',
                left: '12px',
                fontSize: '0.75rem',
                color: '#000000ff',
              }}
            >
              Click zone to inspect live floorplan telemetry ↓
            </span>

            {/* Interactive 3D Nodes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px',
                width: '100%',
                zIndex: 1,
                transform: 'rotateX(20deg) rotateZ(0deg)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                marginTop: '12px',
              }}
            >
              {WAREHOUSE_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    style={{
                      background: isSelected ? '#afafaf79' : '#ffffffff',
                      border: `2px solid ${isSelected ? zone.color : '#1E3A78'}`,
                      borderRadius: '8px',
                      padding: '10px 4px',
                      color: '#080808ff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected
                        ? `0 0 16px ${zone.color}66, inset 0 0 12px ${zone.color}33`
                        : '0 4px 6px rgba(0,0,0,0.3)',
                      transform: isSelected ? 'translateY(-6px)' : 'translateY(0)',
                    }}
                  >
                    <span>{zone.icon}</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: isSelected ? 'bold' : 'normal',
                        color: isSelected ? '#FFF' : '#CBD5E1',
                        textAlign: 'center',
                      }}
                    >
                      {zone.name.split(' ')[0]}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        padding: '1px 4px',
                        borderRadius: '4px',
                        backgroundColor:
                          zone.status === 'Optimal'
                            ? '#10B98122'
                            : zone.status === 'Warning'
                            ? '#F59E0B22'
                            : '#EF444422',
                        color:
                          zone.status === 'Optimal'
                            ? '#10B981'
                            : zone.status === 'Warning'
                            ? '#F59E0B'
                            : '#EF4444',
                        border: `1px solid ${
                          zone.status === 'Optimal'
                            ? '#10B981'
                            : zone.status === 'Warning'
                            ? '#F59E0B'
                            : '#EF4444'
                        }`,
                      }}
                    >
                      ● {zone.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Telemetry Details */}
          <div
            style={{
              backgroundColor: '#ffffffff',
              borderRadius: '8px',
              padding: '12px',
              border: `1px solid ${selectedZone.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `inset 0 0 15px ${selectedZone.color}15`,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      color: selectedZone.color,
                      fontWeight: 'bold',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {selectedZone.type}
                  </span>
                  <h3
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#000',
                      margin: '2px 0 0 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {selectedZone.icon} {selectedZone.name}
                  </h3>
                </div>
              </div>

              {/* Metrics */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginTop: '8px',
                }}
              >
                {selectedZone.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#005EB8',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      border: '1px solid #1E293B',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#ffffffff' }}>{m.label}</span>
                    <strong style={{ fontSize: '0.8rem', color: '#FFF' }}>{m.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '8px',
                paddingTop: '6px',
                borderTop: '1px dashed #1E3A78',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: '#64748B',
              }}
            >
              <span>Telemetry Sync</span>
              <span style={{ color: '#00A79D' }}>✓ Live 12ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Stream Indicators (FIXED FLEX-WRAP) */}
      <div 
        style={{ 
          background: '#ffffffff',
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '20px', 
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: '#000000ff', fontWeight: 'bold', marginRight: '4px' }}>
          8 Data Streams:
        </span>
        {[
          { label: 'Solar Gen', icon: <Sun size={14} />, color: '#e8a006' },
          { label: 'Energy Draw', icon: <Zap size={14} />, color: '#EF4444' },
          { label: 'WMS / TMS', icon: <Package size={14} />, color: '#3B82F6' },
          { label: 'IoT Sensors', icon: <Radio size={14} />, color: '#8B5CF6' },
          { label: 'Financial P&L', icon: <DollarSign size={14} />, color: '#10B981' },
          { label: 'Knowledge Base', icon: <BookOpen size={14} />, color: '#06B6D4' },
          { label: 'Client Demand', icon: <TrendingUp size={14} />, color: '#EC4899' },
          { label: 'Workforce & AGVs', icon: <Bot size={14} />, color: '#F97316' },
        ].map((stream, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffffff',
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
            <span style={{ color: '#000000ff', fontWeight: 500 }}>{stream.label}</span>
          </div>
        ))}
      </div>

      {/* --- TOP KEY PERFORMANCE CARDS --- */}
      <div className="grid-container" style={{ marginBottom: '16px' }}>
        
        {/* Metric 1: Solar Power */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>SOLAR POWER GENERATION</span>
            <Sun size={18} color="#F59E0B" />
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
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>CONTRACT MARGIN</span>
            <DollarSign size={18} color="#3B82F6" />
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
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>SLA FULFILLMENT</span>
            <Target size={18} color="#10B981" />
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
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>AI PRESCRIPTIVE ENGINE (LIVE REASONING)</span>
          <span className="ai-badge">PRESCRIPTIVE AI</span>
        </div>

        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          <div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>1. What Happened</div>
            <div style={{ fontSize: '0.78rem', color: '#080808ff', marginTop: '4px' }}>
              Cloud cover approaching at 14:00. Solar output drop predicted (-35%).
            </div>
          </div>

          <div style={{  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>2. Why It Happened</div>
            <div style={{ fontSize: '0.78rem', color: '#080808ff', marginTop: '4px' }}>
              Sudden localized weather shift combined with 500 VIP express orders.
            </div>
          </div>

          <div style={{  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 'bold' }}>3. What Will Happen</div>
            <div style={{ fontSize: '0.78rem', color: '#080808ff', marginTop: '4px' }}>
              Peak electricity tariff trigger in 2 hours ($2,400 cost spike).
            </div>
          </div>

          <div style={{  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold' }}>4. Recommended Action</div>
            <div style={{ fontSize: '0.78rem', color: '#080808ff', marginTop: '4px' }}>
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
      <div className="card-title" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Rocket size={18} />
        <span>Enterprise Navigation Portal (Deep Dive Modules)</span>
      </div>

      <div className="grid-container">
        
        <Link href="/solar" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={18} color="#F59E0B" />
              <span>Solar & Water Utilities</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0' }}>
              Monitor green power generation, BESS storage, and rainwater recycling analytics.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 'bold' }}>View Utilities →</span>
          </div>
        </Link>

        <Link href="/ai-agent" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} color="#3B82F6" />
              <span>AI Agent (P&L / SLA)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0' }}>
              Interactive AI Co-Pilot chat and hourly financial savings trend.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 'bold' }}>Open AI Chat →</span>
          </div>
        </Link>

        <Link href="/scenario-simulator" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', height: '100%' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={18} color="#8B5CF6" />
              <span>Scenario Simulator</span>
            </div>
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