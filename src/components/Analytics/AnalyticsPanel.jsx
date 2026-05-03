import './AnalyticsPanel.css';

const AnalyticsPanel = () => {
  // Mock data for the over-by-over grid (Green = safe, Amber = warning, Red = danger)
  const overGrid = [
    'safe', 'safe', 'safe', 'warning', 'safe', 'danger', 
    'danger', 'warning', 'safe', 'safe', 'warning', 'safe',
    'safe', 'safe', 'warning', 'danger', 'safe'
  ];

  return (
    <div className="analytics-panel">
      {/* Chart Section */}
      <div className="glass-panel chart-card">
        <div className="chart-header flex-between">
          <h3 className="section-title">Run Rate Comparison</h3>
          <div className="legend flex-center">
            <span className="legend-item"><span className="legend-color crr"></span> CRR</span>
            <span className="legend-item"><span className="legend-color rrr"></span> RRR</span>
          </div>
        </div>
        
        <div className="chart-container">
          <svg viewBox="0 0 500 200" className="animated-chart" preserveAspectRatio="none">
            <defs>
              <linearGradient id="crrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <path className="grid-line" d="M0 40 L500 40" />
            <path className="grid-line" d="M0 80 L500 80" />
            <path className="grid-line" d="M0 120 L500 120" />
            <path className="grid-line" d="M0 160 L500 160" />
            
            {/* Danger Zone Highlight */}
            <rect x="350" y="0" width="100" height="200" className="danger-zone" />
            
            {/* CRR Area & Line */}
            <path className="crr-area" d="M0 150 Q 50 140, 100 130 T 200 110 T 300 90 T 400 60 T 450 50 L450 200 L0 200 Z" fill="url(#crrGradient)" />
            <path className="crr-line animate-draw" d="M0 150 Q 50 140, 100 130 T 200 110 T 300 90 T 400 60 T 450 50" />
            
            {/* RRR Line */}
            <path className="rrr-line animate-draw-delayed" d="M0 120 L 100 125 L 200 130 L 300 135 L 400 100 L 450 40" />

            {/* Current point */}
            <circle cx="450" cy="50" r="4" className="crr-point glow-blue animate-blink" />
            <circle cx="450" cy="40" r="4" className="rrr-point animate-blink" />
          </svg>
          
          <div className="tooltip" style={{ left: '85%', top: '10%' }}>
            <div className="tooltip-over">Over 17.2</div>
            <div className="tooltip-crr">CRR: 8.44</div>
            <div className="tooltip-rrr">RRR: 11.20</div>
          </div>
        </div>
      </div>

      {/* Over Grid Section */}
      <div className="glass-panel grid-card">
        <h3 className="section-title">Over-by-Over Analysis</h3>
        <div className="over-grid">
          {overGrid.map((status, i) => (
            <div key={i} className="over-box-wrapper">
              <span className="over-num">{i + 1}</span>
              <div className={`over-box status-${status}`}></div>
            </div>
          ))}
          {/* Remaining overs placeholder */}
          {[...Array(3)].map((_, i) => (
            <div key={`rem-${i}`} className="over-box-wrapper">
              <span className="over-num">{overGrid.length + i + 1}</span>
              <div className="over-box status-empty"></div>
            </div>
          ))}
        </div>
        <div className="grid-legend flex-between">
          <span className="text-secondary"><span className="status-dot safe"></span> Safe</span>
          <span className="text-secondary"><span className="status-dot warning"></span> Warning</span>
          <span className="text-secondary"><span className="status-dot danger"></span> Danger</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
