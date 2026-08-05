'use client';

interface AiPrescriptiveBoxProps {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  confidence: string;
  onExecute?: () => void;
}

export default function AiPrescriptiveBox({
  step1,
  step2,
  step3,
  step4,
  confidence,
  onExecute,
}: AiPrescriptiveBoxProps) {
  return (
    <div className="card ai-recommend-box" style={{ gridColumn: 'span 2' }}>
      <div className="card-title">
        <span>AI Prescriptive Engine (Live Reasoning)</span>
        <span className="ai-badge">PRESCRIPTIVE AI</span>
      </div>

      <div className="visibility-steps">
        <div className="v-step">
          <h4>1. What Happened</h4>
          <p>{step1}</p>
        </div>
        <div className="v-step">
          <h4>2. Why It Happened</h4>
          <p>{step2}</p>
        </div>
        <div className="v-step">
          <h4>3. What Will Happen</h4>
          <p>{step3}</p>
        </div>
        <div className="v-step" style={{ borderLeftColor: 'var(--success)' }}>
          <h4>4. Recommended Action</h4>
          <p>{step4}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
          Confidence Level: <strong>{confidence}</strong>
        </span>
        <button
          className="sim-btn"
          onClick={onExecute || (() => alert('Executing Prescriptive Action...'))}
        >
          Approve & Execute Action
        </button>
      </div>
    </div>
  );
}