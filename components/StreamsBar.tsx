export default function StreamsBar() {
  return (
    <div className="streams-bar">
      <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>8 Data Streams:</span>
      <div className="stream-pill" style={{ borderLeftColor: 'var(--warning)' }}>☀️ Solar Gen</div>
      <div className="stream-pill" style={{ borderLeftColor: 'var(--success)' }}>⚡ Energy Draw</div>
      <div className="stream-pill">📦 WMS / TMS</div>
      <div className="stream-pill">🌡️ IoT Sensors</div>
      <div className="stream-pill" style={{ borderLeftColor: '#38BDF8' }}>💰 Financial P&L</div>
      <div className="stream-pill">📚 Knowledge Base</div>
      <div className="stream-pill">📈 Client Demand</div>
      <div className="stream-pill">👷 Workforce & AGVs</div>
    </div>
  );
}