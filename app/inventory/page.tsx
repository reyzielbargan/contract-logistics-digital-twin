'use client';

import { useState } from 'react';
import { 
  Package, 
  Ruler, 
  Bot, 
  Zap, 
  Cpu 
} from 'lucide-react';

interface WarehouseData {
  id: string;
  name: string;
  totalArea: string; // พื้นที่ทั้งหมด (ตร.ม.)
  usedArea: string;  // พื้นที่ใช้ไป (ตร.ม.)
  freeArea: string;  // พื้นที่ว่างเหลือ (ตร.ม.)
  activePallets: string;
  totalCapacity: string;
  capacityPercentage: number;
  agvActive: string;
  agvTotal: string;
  pickingRate: number;
}

export default function InventoryWMSPage() {
  const [selectedFacility, setSelectedFacility] = useState<string>('wh-01');
  const [isReslotted, setIsReslotted] = useState<boolean>(false);

  // ข้อมูลคลังสินค้าแต่ละแห่ง (ชื่อตรงกับหน้า Control Tower)
  const facilities: Record<string, WarehouseData> = {
    'wh-01': {
      id: 'wh-01',
      name: 'Warehouse 01 - Main Logistics Hub (Active)',
      totalArea: '45,000 sq.m',
      usedArea: '41,130 sq.m',
      freeArea: '3,870 sq.m',
      activePallets: '42,850',
      totalCapacity: '46,880 Pallets',
      capacityPercentage: 91.4,
      agvActive: '38',
      agvTotal: '40',
      pickingRate: 1420,
    },
    'wh-02': {
      id: 'wh-02',
      name: 'Warehouse 02 - Cold Chain & FMCG Facility',
      totalArea: '28,000 sq.m',
      usedArea: '21,980 sq.m',
      freeArea: '6,020 sq.m',
      activePallets: '24,100',
      totalCapacity: '30,700 Pallets',
      capacityPercentage: 78.5,
      agvActive: '22',
      agvTotal: '25',
      pickingRate: 1180,
    },
    'wh-03': {
      id: 'wh-03',
      name: 'Warehouse 03 - Automated Regional Hub',
      totalArea: '60,000 sq.m',
      usedArea: '51,600 sq.m',
      freeArea: '8,400 sq.m',
      activePallets: '58,400',
      totalCapacity: '67,900 Pallets',
      capacityPercentage: 86.0,
      agvActive: '48',
      agvTotal: '50',
      pickingRate: 1850,
    },
  };

  const current = facilities[selectedFacility];
  const currentPickingRate = isReslotted ? current.pickingRate + 160 : current.pickingRate;

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1>Inventory & WMS Control</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            Real-time Slotting, Space Utilization, AGV Fleet & Stock Optimization
          </span>
        </div>
        <div className="status-badge" style={{ borderColor: '#10B981' }}>
          ● WMS Engine: Synchronized (12ms)
        </div>
      </header>

      {/* Facility Selector Bar (ชื่อตรงกับหน้าแรก) */}
      <div className="card" style={{ padding: '12px 18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', whiteSpace: 'nowrap' }}>
            Select Facility Node:
          </span>
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            style={{
              backgroundColor: '#ffffffff',
              color: '#000000ff',
              border: '1px solid #d1d1d1ff',
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
            ● Total Area: {current.totalArea}
          </span>
        </div>
      </div>

      {/* --- WAREHOUSE CAPACITY & AREA METRICS GRID --- */}
      <div className="grid-container" style={{ marginBottom: '20px' }}>
        
        {/* Card 1: Active Pallets & Total Capacity */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>ACTIVE PALLETS</span>
            <Package size={18} color="#3B82F6" />
          </div>
          <div className="metric-value">{current.activePallets}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
            <span style={{ color: 'var(--text-sub)' }}>Max: {current.totalCapacity}</span>
            <span style={{ color: current.capacityPercentage > 90 ? '#EF4444' : '#10B981', fontWeight: 'bold' }}>
              {current.capacityPercentage}% Full
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#0F172A', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${current.capacityPercentage}%`,
                height: '100%',
                backgroundColor: current.capacityPercentage > 90 ? '#EF4444' : '#3B82F6',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Card 2: Floor Area Breakdown (พื้นที่ใช้ไป vs พื้นที่ว่าง) */}
        <div className="card" style={{ borderLeft: '4px solid #3B82F6' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>FLOOR SPACE UTILIZATION</span>
            <Ruler size={18} color="#3B82F6" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.8rem' }}>{current.usedArea}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
            <span style={{ color: '#10B981', fontWeight: 'bold' }}>Remaining Free: {current.freeArea}</span>
            <span style={{ color: 'var(--text-sub)' }}>Total: {current.totalArea}</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#0F172A', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${current.capacityPercentage}%`,
                height: '100%',
                backgroundColor: '#10B981',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Card 3: AGV Fleet */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>AGV / AMR FLEET</span>
            <Bot size={18} color="#10B981" />
          </div>
          <div className="metric-value">{current.agvActive} / {current.agvTotal}</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            Active Fleet Operation
          </span>
        </div>

        {/* Card 4: Throughput Rate */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>PICKING THROUGHPUT</span>
            <Zap size={18} color="#F59E0B" />
          </div>
          <div className="metric-value" style={{ color: isReslotted ? '#10B981' : '#000000ff' }}>
            {currentPickingRate.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>picks/hr</span>
          </div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            {isReslotted ? '↑ +16% via AI Smart Slotting' : '↑ Optimal Speed'}
          </span>
        </div>

      </div>

      {/* --- AI SLOTTING OPTIMIZATION SANDBOX --- */}
      <div className="card" style={{ marginBottom: '20px', borderLeft: '4px solid #10B981' }}>
        <div className="card-title" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} color="#10B981" />
          <span>AI Dynamic Reslotting Engine</span>
          <span className="ai-badge">WMS AI AGENT</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.85rem', color: '#272727ff', margin: 0, maxWidth: '700px' }}>
            AI analyzes order patterns in {current.name} to optimize pallet slotting, freeing up to 5% unused buffer space and speeding up AGV picking.
          </p>
          <button
            className="sim-btn"
            onClick={() => setIsReslotted(!isReslotted)}
            style={{
              color: isReslotted ? '#FFF' : '#000000ff',
              border: isReslotted ? '1px solid #10B981' : '1px solid #334155',
              backgroundColor: isReslotted ? '#10B981' : '#ffffffff',
            }}
          >
            {isReslotted ? '✓ AI Reslotting Applied' : 'Execute AI Dynamic Reslotting'}
          </button>
        </div>
      </div>

      {/* --- AGV FLEET LIVE STATUS TABLE --- */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={18} color="#3B82F6" />
          <span>Active AGV Telemetry ({current.name})</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', color: 'var(--text-sub)' }}>
                <th style={{ padding: '10px' }}>AGV ID</th>
                <th style={{ padding: '10px' }}>Vehicle Type</th>
                <th style={{ padding: '10px' }}>Battery</th>
                <th style={{ padding: '10px' }}>Current Mission</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #1E293B' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>AGV-01</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>Pallet Mover</td>
                <td style={{ padding: '10px', color: '#10B981', fontWeight: 'bold' }}>92%</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>Moving Pallet #4499 to Bay 12</td>
                <td style={{ padding: '10px', color: '#10B981' }}>● Active</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1E293B' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>AGV-02</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>High Reach Picker</td>
                <td style={{ padding: '10px', color: '#10B981', fontWeight: 'bold' }}>85%</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>Picking SKU-8821 in Zone A</td>
                <td style={{ padding: '10px', color: '#10B981' }}>● Active</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1E293B' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>AGV-03</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>High Reach Picker</td>
                <td style={{ padding: '10px', color: '#EF4444', fontWeight: 'bold' }}>18%</td>
                <td style={{ padding: '10px', color: '#1b1b1bff' }}>Returning to Auto-Charge Station</td>
                <td style={{ padding: '10px', color: '#F59E0B' }}>● Charging</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}