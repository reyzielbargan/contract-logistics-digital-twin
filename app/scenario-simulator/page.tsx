'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type ScenarioType = 'baseline' | 'demand_spike' | 'solar_outage' | 'custom';

export default function ScenarioSimulatorPage() {
  const [scenario, setScenario] = useState<ScenarioType>('baseline');
  const [demandFactor, setDemandFactor] = useState(100); // 100%
  const [solarCapacity, setSolarCapacity] = useState(100); // 100%
  const [isMitigated, setIsMitigated] = useState(false);

  // Quick Preset Handlers
  const handleSelectPreset = (type: ScenarioType) => {
    setScenario(type);
    setIsMitigated(false);
    if (type === 'baseline') {
      setDemandFactor(100);
      setSolarCapacity(100);
    } else if (type === 'demand_spike') {
      setDemandFactor(150);
      setSolarCapacity(100);
    } else if (type === 'solar_outage') {
      setDemandFactor(100);
      setSolarCapacity(0);
    }
  };

  // Dynamic Metrics Calculation based on sliders & mitigation state
  const baseSla = 99.8;
  const baseCost = 12500;

  // Impact calculations
  const extraDemandCost = (demandFactor - 100) * 180;
  const solarOutageCost = (100 - solarCapacity) * 45;

  let rawCost = baseCost + extraDemandCost + solarOutageCost;
  let rawSla =
    baseSla -
    (demandFactor > 120 ? (demandFactor - 120) * 0.15 : 0) -
    (solarCapacity < 50 ? (50 - solarCapacity) * 0.08 : 0);

  // Apply AI mitigation logic
  const currentCost = isMitigated ? rawCost * 0.88 : rawCost;
  const currentSla = isMitigated ? Math.min(99.5, rawSla + 4.5) : rawSla;
  const utilization = Math.min(100, Math.round(demandFactor * 0.85));
  const statusRisk =
    currentSla < 95 ? 'HIGH RISK' : currentSla < 98 ? 'MODERATE RISK' : 'OPTIMAL';

  // Dynamic Chart Data Generator based on current simulation variables
  const chartData = [
    { time: '08:00', cost: Math.round(currentCost * 0.82), sla: Math.min(100, (currentSla + 0.2).toFixed(1)), util: Math.max(40, utilization - 25) },
    { time: '10:00', cost: Math.round(currentCost * 0.91), sla: Math.min(100, (currentSla + 0.1).toFixed(1)), util: Math.max(50, utilization - 15) },
    { time: '12:00', cost: Math.round(currentCost * 0.98), sla: currentSla.toFixed(1), util: utilization },
    { time: '14:00 (Peak)', cost: Math.round(currentCost * 1.08), sla: Math.max(80, (currentSla - 0.4).toFixed(1)), util: Math.min(100, utilization + 10) },
    { time: '16:00', cost: Math.round(currentCost * 1.02), sla: currentSla.toFixed(1), util: utilization },
    { time: '18:00', cost: Math.round(currentCost * 0.89), sla: Math.min(100, (currentSla + 0.1).toFixed(1)), util: Math.max(45, utilization - 20) },
  ];

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1 className="text-2xl font-bold">Scenario Simulator</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            What-If Digital Twin Stress Testing & AI Mitigation Engine
          </span>
        </div>
        <div
          className="status-badge"
          style={{
            borderColor: statusRisk === 'HIGH RISK' ? '#EF4444' : '#00A79D',
            color: statusRisk === 'HIGH RISK' ? '#EF4444' : '#00A79D',
          }}
        >
          ● Engine Status: {statusRisk}
        </div>
      </header>

      {/* --- SIMULATION CONTROLS CARD --- */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title">
          <span>⚙️ Simulation Control Sandbox</span>
          <span className="ai-badge" style={{ backgroundColor: '#005EB8', color: '#FFF' }}>
            DIGITAL TWIN MODE
          </span>
        </div>

        {/* Preset Selector Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0' }}>
          <button
            className="sim-btn"
            style={{
              backgroundColor: scenario === 'baseline' ? '#002664' : '#1E293B',
              opacity: scenario === 'baseline' ? 1 : 0.8,
              border: scenario === 'baseline' ? '1px solid #005EB8' : 'none',
            }}
            onClick={() => handleSelectPreset('baseline')}
          >
            Reset to Baseline
          </button>
          <button
            className="sim-btn"
            style={{
              backgroundColor: scenario === 'demand_spike' ? '#002664' : '#1E293B',
              opacity: scenario === 'demand_spike' ? 1 : 0.8,
              border: scenario === 'demand_spike' ? '1px solid #005EB8' : 'none',
            }}
            onClick={() => handleSelectPreset('demand_spike')}
          >
            ⚡ Simulate +50% Demand Spike
          </button>
          <button
            className="sim-btn"
            style={{
              backgroundColor: scenario === 'solar_outage' ? '#002664' : '#1E293B',
              opacity: scenario === 'solar_outage' ? 1 : 0.8,
              border: scenario === 'solar_outage' ? '1px solid #005EB8' : 'none',
            }}
            onClick={() => handleSelectPreset('solar_outage')}
          >
            ☀️ Simulate Solar Outage (0%)
          </button>
        </div>

        {/* Variable Sliders */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginTop: '12px',
            background: '#0B1528',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #1E3A78',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span style={{ color: '#FFF' }}>Order Volume Spike (Demand Load)</span>
              <strong style={{ color: demandFactor > 120 ? '#F59E0B' : '#FFF' }}>{demandFactor}%</strong>
            </div>
            <input
              type="range"
              min="80"
              max="200"
              value={demandFactor}
              onChange={(e) => {
                setDemandFactor(Number(e.target.value));
                setScenario('custom');
                setIsMitigated(false);
              }}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#005EB8' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span style={{ color: '#FFF' }}>Solar Grid Generation Output</span>
              <strong style={{ color: solarCapacity < 50 ? '#EF4444' : '#00A79D' }}>{solarCapacity}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={solarCapacity}
              onChange={(e) => {
                setSolarCapacity(Number(e.target.value));
                setScenario('custom');
                setIsMitigated(false);
              }}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#00A79D' }}
            />
          </div>
        </div>
      </div>

      {/* --- SIMULATION IMPACT TREND CHART (เพิ่มใหม่ตามคำขอ) --- */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px' }}>
        <div className="card-title" style={{ marginBottom: '12px' }}>
          <span>📈 24-Hour Simulation Trend Projection</span>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Real-time Stress Test Analytics</span>
        </div>
        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A78" opacity={0.5} />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
              <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} domain={['auto', 'auto']} />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} domain={[70, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A142F', borderColor: '#1E3A78', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
              <Line yAxisId="left" type="monotone" dataKey="cost" name="Cost ($)" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="sla" name="OTIF SLA (%)" stroke="#00A79D" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="util" name="Utilization (%)" stroke="#005EB8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- COMPACT IMPACT RESULTS CARDS (ปรับย่อขนาดลง) --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {/* Metric 1: Project Operational Cost */}
        <div className="card" style={{ padding: '12px 16px' }}>
          <div className="card-title" style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Projected Daily Cost 💰</div>
          <div className="metric-value" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '4px 0', color: currentCost > baseCost ? '#EF4444' : '#00A79D' }}>
            ${currentCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <span style={{ color: currentCost > baseCost ? '#EF4444' : '#00A79D', fontSize: '0.75rem' }}>
            {currentCost > baseCost ? `+${(((currentCost - baseCost) / baseCost) * 100).toFixed(1)}% vs Baseline` : 'Optimal Cost State'}
          </span>
        </div>

        {/* Metric 2: Estimated SLA */}
        <div className="card" style={{ padding: '12px 16px' }}>
          <div className="card-title" style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Estimated OTIF SLA 🎯</div>
          <div className="metric-value" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '4px 0', color: currentSla < 96 ? '#EF4444' : currentSla < 99 ? '#F59E0B' : '#00A79D' }}>
            {currentSla.toFixed(1)}%
          </div>
          <span style={{ color: currentSla < 96 ? '#EF4444' : '#00A79D', fontSize: '0.75rem' }}>
            {currentSla < 96 ? 'High Delays Risk Detected' : 'Target SLA Maintained'}
          </span>
        </div>

        {/* Metric 3: Resource Load Index */}
        <div className="card" style={{ padding: '12px 16px' }}>
          <div className="card-title" style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Warehouse Utilization 🏭</div>
          <div className="metric-value" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '4px 0', color: '#00A79Dป' }}>
            {utilization}%
          </div>
          <span style={{ color: demandFactor > 130 ? '#F59E0B' : '#94A3B8', fontSize: '0.75rem' }}>
            {demandFactor > 130 ? 'Near Capacity Limit' : 'Balanced Capacity'}
          </span>
        </div>
      </div>

      {/* --- AI MITIGATION ACTION PLAN BOX --- */}
      <div className="card" style={{ borderLeft: '4px solid #005EB8', padding: '16px' }}>
        <div className="card-title" style={{ marginBottom: '10px' }}>
          <span>🤖 AI Prescriptive Action Engine</span>
          {isMitigated ? (
            <span style={{ color: '#00A79D', fontWeight: 'bold', fontSize: '0.8rem' }}>✓ AI OPTIMIZATION APPLIED</span>
          ) : (
            <span style={{ color: '#F59E0B', fontSize: '0.8rem' }}>PENDING ACTION</span>
          )}
        </div>

        <div style={{ fontSize: '0.85rem', color: '#1c1c1cff', lineHeight: '1.5' }}>
          {demandFactor > 120 || solarCapacity < 50 ? (
            <div>
              <strong>Alert Recommendation:</strong>
              <ul style={{ margin: '6px 0 12px 18px' }}>
                {demandFactor > 120 && <li>Auto-reroute VIP order batches to Station B to prevent picking bottleneck.</li>}
                {solarCapacity < 50 && <li>Activate secondary BESS battery reserves and switch non-critical AGVs to eco-mode.</li>}
                <li>Re-balance shifts to avoid labor overtime penalty.</li>
              </ul>
            </div>
          ) : (
            <p style={{ margin: '6px 0 12px 0' }}>
              System parameters are within optimal operating bounds. No emergency mitigation required.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className="sim-btn"
            disabled={isMitigated}
            onClick={() => setIsMitigated(true)}
            style={{
              backgroundColor: isMitigated ? '#334155' : '#002664',
              border: isMitigated ? 'none' : '1px solid #005EB8',
              cursor: isMitigated ? 'not-allowed' : 'pointer',
            }}
          >
            {isMitigated ? 'Mitigation Active' : 'Execute AI Mitigation Plan'}
          </button>

          {isMitigated && (
            <span style={{ fontSize: '0.8rem', color: '#00A79D' }}>
              Saved approx 12% operational cost & recovered SLA!
            </span>
          )}
        </div>
      </div>
    </>
  );
}