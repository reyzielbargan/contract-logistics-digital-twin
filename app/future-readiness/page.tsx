'use client';

import { Weight } from 'lucide-react';
import { useState } from 'react';

interface PillarScore {
  title: string;
  score: number;
  max: number;
  status: string;
  icon: string;
}

export default function FutureReadinessPage() {
  const [upgraded, setUpgraded] = useState(false);

  // Pillar scores
  const pillars: PillarScore[] = [
    {
      title: 'AI & Autonomous Logistics',
      score: upgraded ? 5.0 : 4.9,
      max: 5.0,
      status: 'Fully Autonomous',
      icon: '🤖',
    },
    {
      title: 'Solar & Renewable Energy',
      score: upgraded ? 5.0 : 4.7,
      max: 5.0,
      status: 'Near Zero Emission',
      icon: '☀️',
    },
    {
      title: 'Digital Twin & Simulation',
      score: upgraded ? 5.0 : 4.8,
      max: 5.0,
      status: 'Real-time Predictive',
      icon: '🌐',
    },
    {
      title: 'ESG & Compliance 2030',
      score: upgraded ? 5.0 : 4.8,
      max: 5.0,
      status: 'Target Met',
      icon: '🌱',
    },
  ];

  const currentOverallScore = upgraded ? '5.0' : '4.8';

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1>Future Readiness Scale</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            Enterprise Maturity & DSV 2030 Roadmap Compliance Engine
          </span>
        </div>
        <div className="status-badge" style={{ borderColor: '#10B981' }}>
          ● Status: 2030 Ready
        </div>
      </header>

      {/* --- TOP SCORE OVERVIEW & QUICK ACTIONS --- */}
      <div className="grid-container" style={{ marginBottom: '20px' }}>
        
        {/* Main Overall Score Card */}
        <div className="card" style={{ gridColumn: 'span 2', background: 'var(--card-bg)' }}>
          <div className="card-title">
            <span>OVERALL MATURITY INDEX</span>
            <span className="ai-badge">DSV TWIN '30</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '10px' }}>
            <div className="metric-value" style={{ fontSize: '3rem', color: '#3B82F6' }}>
              Level {currentOverallScore}
            </div>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-sub)' }}>/ 5.0</div>
          </div>
          <p style={{ color: 'var(--success)', fontSize: '0.9rem', marginTop: '4px' }}>
            {upgraded ? '✓ Maximum Enterprise Maturity Level Achieved!' : 'Fully Autonomous Capable & Net-Zero Aligned'}
          </p>
        </div>

        {/* Interactive Upgrade Target Sandbox */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="card-title">🚀 2030 Target Simulator</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '8px 0 14px 0' }}>
            Test impact of full-fleet EV transition & 100% AI automation.
          </p>
          <button
            className="sim-btn"
            onClick={() => setUpgraded(!upgraded)}
            style={{
              backgroundColor: upgraded ? '#10B981' : '#3B82F6',
              width: '100%',
            }}
          >
            {upgraded ? 'Reset Baseline (4.8 Score)' : 'Simulate Full 2030 Deployment (5.0 Score)'}
          </button>
        </div>

      </div>

      {/* --- PILLAR MATURITY BREAKDOWN GRID --- */}
      <div className="grid-container" style={{ marginBottom: '20px' }}>
        {pillars.map((pillar, idx) => (
          <div key={idx} className="card">
            <div className="card-title" style={{ fontSize: '0.9rem' }}>
              <span>{pillar.title}</span>
              <span>{pillar.icon}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '8px 0 4px 0' }}>
              {pillar.score.toFixed(1)} <span style={{ fontSize: '0.8rem', color: '#444444' }}>/ {pillar.max.toFixed(1)}</span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#0F172A', borderRadius: '3px', overflow: 'hidden', margin: '8px 0' }}>
              <div
                style={{
                  width: `${(pillar.score / pillar.max) * 100}%`,
                  height: '100%',
                  backgroundColor: pillar.score === 5.0 ? '#10B981' : '#3B82F6',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>● {pillar.status}</span>
          </div>
        ))}
      </div>

      {/* --- ROADMAP MILESTONES & STRATEGIC RECOMMENDATIONS --- */}
      <div className="grid-container">
        
        {/* Milestone Checklist */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title" style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>🚩 DSV Twin '30 Strategic Milestones</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', padding: '10px 14px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.85rem', color: '#FFFF' }} >1. Real-time Digital Twin Integration (Control Tower)</span>
              <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ COMPLETED</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', padding: '10px 14px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.85rem', color: '#FFFF' }}>2. Autonomous P&L & SLA Optimization Agent</span>
              <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ COMPLETED</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', padding: '10px 14px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.85rem', color: '#FFFF' }}>3. 100% On-site Solar Storage & BESS Microgrid</span>
              <span style={{ color: upgraded ? '#10B981' : '#F59E0B', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {upgraded ? '✓ COMPLETED' : '⚡ 94% IN PROGRESS'}
              </span>
            </div>
          </div>
        </div>

        {/* AI Actionable Recommendations */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>🤖 AI Strategic Insight</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#2b2b2bff', lineHeight: '1.5' }}>
            {upgraded
              ? 'Your facility has reached the maximum maturity tier for the DSV 2030 Roadmap. Zero-emission and autonomous protocols are operating at peak efficiency.'
              : 'To achieve Level 5.0 Maturity, expand BESS battery capacity by +15% and finalize EV yard truck autonomous dispatching.'}
          </p>
        </div>

      </div>
    </>
  );
}