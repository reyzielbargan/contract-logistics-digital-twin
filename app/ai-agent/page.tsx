'use client';

import { useState } from 'react';
import { 
  Bot, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Zap, 
  MessageSquare 
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function AiAgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your DSV AI Agent Co-Pilot. I can assist you with real-time P&L analysis, SLA tracking, and warehouse operations. Feel free to ask me anything about the dashboard!',
      time: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');

  // Mock Trend Data for Charts
  const hourlySavings = [
    { time: '08:00', amount: 320, action: 12 },
    { time: '10:00', amount: 650, action: 28 },
    { time: '12:00', amount: 1200, action: 54 },
    { time: '14:00', amount: 2100, action: 89 },
    { time: '16:00', amount: 3100, action: 115 },
    { time: '18:00', amount: 3840, action: 142 },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      sender: 'user',
      text: input,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput('');

    // Simulated AI response logic based on query
    setTimeout(() => {
      let aiReply =
        'The AI system is analyzing operations. Warehouse throughput is optimal and running at a 99.8% SLA rate.';

      if (query.includes('p&l') || query.includes('profit') || query.includes('cost') || query.includes('save') || query.includes('saving')) {
        aiReply =
          'Today, AI optimization has saved $3,840. The peak saving occurred between 14:00–18:00 via dynamic AGV routing and smart solar energy storage management.';
      } else if (query.includes('sla') || query.includes('delivery') || query.includes('otif') || query.includes('delay')) {
        aiReply =
          'On-Time In-Full (OTIF) delivery SLA is currently at 99.8%. There are no delayed dispatches or penalty risks detected.';
      } else if (query.includes('action') || query.includes('task') || query.includes('work') || query.includes('automation')) {
        aiReply =
          'The AI has executed 142 autonomous actions today with a 100% execution success rate across sorting and energy optimization workflows.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div>
          <h1>Autonomous AI Agent Dashboard</h1>
          <span style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
            P&L & SLA Real-Time Optimization Engine
          </span>
        </div>
        <div className="status-badge">● AI Co-Pilot Active</div>
      </header>

      {/* Dynamic Chart Dashboard Grid */}
      <div className="grid-container" style={{ marginBottom: '16px' }}>
        
        {/* Metric Summary Cards */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Autonomous Actions Today</span>
            <Bot size={18} color="#3B82F6" />
          </div>
          <div className="metric-value">142</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            100% Execution Success Rate
          </span>
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Cost Saved Today</span>
            <DollarSign size={18} color="#10B981" />
          </div>
          <div className="metric-value">$3,840</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            Energy & Labor Optimization
          </span>
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>SLA Impact Score</span>
            <Target size={18} color="#F59E0B" />
          </div>
          <div className="metric-value">99.8%</div>
          <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
            Zero Penalty Risks
          </span>
        </div>

        {/* Visual Chart 1: Hourly Cost Savings Trend */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="#3B82F6" />
            <span>Real-Time Hourly Savings Trend ($)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginLeft: 'auto' }}>Today's Cumulative</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '110px', gap: '16px', paddingTop: '10px' }}>
            {hourlySavings.map((item, index) => {
              const heightPercent = (item.amount / 4000) * 100;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginBottom: '4px' }}>${item.amount}</div>
                  <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'flex-end', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPercent}%`,
                        background: 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '6px' }}>{item.time}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Chart 2: SLA & Risk Distribution */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#F59E0B" />
            <span>SLA & Risk Performance</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center', height: '110px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>OTIF Delivery Compliance</span>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>99.8%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '99.8%', height: '100%', backgroundColor: '#10B981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>Warehouse Energy Efficiency</span>
                <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>94.2%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0F172A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '94.2%', height: '100%', backgroundColor: '#3B82F6' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Assistant Interactive Chat Section */}
      <div
        className="card"
        style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', height: '360px' }}
      >
        <div className="card-title" style={{ borderBottom: '1px solid #334155', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="#3B82F6" />
          <span>AI Agent Co-Pilot (Ask about Dashboard)</span>
          <span className="ai-badge" style={{ marginLeft: 'auto' }}>LIVE CHAT</span>
        </div>

        {/* Message Log Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                backgroundColor: msg.sender === 'user' ? 'var(--dsv-accent)' : '#ffffffff',
                color: '#000000ff',
                padding: '10px 14px',
                borderRadius: '10px',
                border: msg.sender === 'ai' ? '1px solid #334155' : 'none',
              }}
            >
              <div style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{msg.text}</div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: msg.sender === 'user' ? '#000000ff' : 'var(--text-sub)',
                  marginTop: '4px',
                  textAlign: 'right',
                }}
              >
                {msg.time}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '10px',
            borderTop: '1px solid #334155',
            paddingTop: '12px',
          }}
        >
          <input
            type="text"
            placeholder="Ask AI about P&L, SLA, or savings..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#ffffffff',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '10px 14px',
              color: '#050505ff',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
          <button type="submit" className="sim-btn">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}