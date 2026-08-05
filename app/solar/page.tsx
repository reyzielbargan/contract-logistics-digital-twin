'use client';

export default function SolarEnergyPage() {
  // Mock Data for Energy & Water Metrics
  const energyData = {
    currentGen: '645 kW',
    batteryStorage: '82%',
    batteryCap: '4.2 MWh Remaining',
    carbonOffset: '12.4 Tons/Day',
    gridImport: '45 kW',
    hvacUsage: '210 kW',
    chargingUsage: '185 kW',
    lightingUsage: '65 kW',
  };

  const waterData = {
    dailyConsumption: '18.5 m³',
    recycledWaterRatio: '42%',
    rainwaterHarvested: '7.8 m³',
    solarCleaningWater: '2.1 m³',
    facilityUsage: '8.6 m³',
  };

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1>Solar, Energy & Sustainability Management</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            Real-time Photovoltaic Generation, Water Recycling & Facility Utilities Optimization
          </span>
        </div>
        <div className="status-badge" style={{ borderColor: '#10B981' }}>
          ● Net-Zero Operations Active
        </div>
      </header>

      {/* --- TOP METRICS GRID (Solar, Battery, Carbon, Water) --- */}
      <div className="grid-container" style={{ marginBottom: '20px' }}>
        <div className="card">
          <div className="card-title">
            CURRENT SOLAR GENERATION <span>☀️</span>
          </div>
          <div className="metric-value">{energyData.currentGen}</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            Peak Efficiency (94.2%)
          </span>
        </div>

        <div className="card">
          <div className="card-title">
            BATTERY STORAGE (BESS) <span>🔋</span>
          </div>
          <div className="metric-value">{energyData.batteryStorage}</div>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            {energyData.batteryCap}
          </span>
        </div>

        <div className="card">
          <div className="card-title">
            DAILY CARBON OFFSET <span>🌱</span>
          </div>
          <div className="metric-value">{energyData.carbonOffset}</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            On track for Net-Zero 2030
          </span>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #3B82F6' }}>
          <div className="card-title">
            DAILY WATER CONSUMPTION <span>💧</span>
          </div>
          <div className="metric-value" style={{ color: '#60A5FA' }}>
            {waterData.dailyConsumption}
          </div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            {waterData.recycledWaterRatio} Recycled & Rainwater
          </span>
        </div>
      </div>

      {/* --- DETAILED ENERGY BREAKDOWN & WATER MANAGEMENT --- */}
      <div className="grid-container" style={{ marginBottom: '20px' }}>
        
        {/* Warehouse Power Consumption Breakdown */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title" style={{ marginBottom: '14px' }}>
            <span>⚡ Warehouse Power Distribution Breakdown</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Real-time Load</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>HVAC & Temperature Control (Cold Chain / Office)</span>
                <strong>{energyData.hvacUsage}</strong>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#3B82F6' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>AGV Fleet & Electric Forklift Fast Chargers</span>
                <strong>{energyData.chargingUsage}</strong>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '38%', height: '100%', backgroundColor: '#10B981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>Smart LED Lighting & Sensor Network</span>
                <strong>{energyData.lightingUsage}</strong>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '17%', height: '100%', backgroundColor: '#F59E0B' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Water Usage & Recycling Analytics */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '14px' }}>
            <span>🚰 Smart Water Management</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#0F172A', padding: '10px 12px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Rainwater Harvesting Tank</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#60A5FA', marginTop: '2px' }}>
                {waterData.rainwaterHarvested} <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>(Stored)</span>
              </div>
            </div>

            <div style={{ background: '#0F172A', padding: '10px 12px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Solar Panel Automated Washing</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', marginTop: '2px' }}>
                {waterData.solarCleaningWater} <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>(Eco-recycle)</span>
              </div>
            </div>

            <div style={{ background: '#0F172A', padding: '10px 12px', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Facility & Restroom Sanitation</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', marginTop: '2px' }}>
                {waterData.facilityUsage}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- AI SUSTAINABILITY & RECYCLING INSIGHT --- */}
      <div className="card" style={{ borderLeft: '4px solid #10B981' }}>
        <div className="card-title" style={{ marginBottom: '8px' }}>
          <span>🤖 AI Environmental Efficiency Insight</span>
          <span className="ai-badge">GREEN OPTIMIZER</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: '1.5' }}>
          Rainwater collection reserves are at 85% capacity. AI has scheduled automated solar panel cleaning for tonight at 23:00, utilizing 100% harvested rainwater and BESS battery power to maintain zero-grid impact.
        </p>
      </div>
    </>
  );
}