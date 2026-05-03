import { useState, useEffect } from 'react';
import './ScorecardPanel.css';

const ScorecardPanel = () => {
  const [liveData, setLiveData] = useState({
    title: "SRH vs KKR",
    score: "214/4",
    overs: "18.2",
    crr: "11.67",
    rrr: "14.20",
    stadium: "Rajiv Gandhi Intl Stadium",
    recentBalls: ['1', '4', '0', 'W', '6', '1']
  });

  // Highlight logic for teams (Mock dynamic glow)
  const isSRH = liveData.title.includes('SRH');
  const isKKR = liveData.title.includes('KKR');
  
  const cardGradient = isSRH && isKKR 
    ? 'linear-gradient(135deg, rgba(255, 75, 43, 0.15) 0%, rgba(74, 0, 224, 0.15) 100%)' 
    : 'var(--bg-surface)';

  const scoreParts = liveData.score.split('/');
  const runs = scoreParts[0] || '0';
  const wickets = scoreParts[1] ? `/${scoreParts[1]}` : '';

  return (
    <div className="glass-panel hero-match-card" style={{ background: cardGradient }}>
      <div className="hero-header flex-between">
        <div className="team-badge glow-orange">SRH</div>
        <div className="vs-badge text-secondary">VS</div>
        <div className="team-badge text-deep-purple" style={{textShadow: '0 0 10px rgba(74,0,224,0.5)'}}>KKR</div>
      </div>

      <div className="stadium-info text-secondary text-center mt-2" style={{fontSize: '11px', letterSpacing: '1px'}}>
        📍 {liveData.stadium}
      </div>
      
      <div className="score-display hero-score">
        <h1 className="runs">{runs}<span className="wickets">{wickets}</span></h1>
        <div className="overs text-secondary">Overs: <span className="text-primary">{liveData.overs}</span>/20</div>
      </div>

      <div className="run-rates-grid">
        <div className="rate-box glass-panel">
          <span className="rate-label">Current RR</span>
          <span className="rate-value text-neon-green">{liveData.crr}</span>
        </div>
        <div className="rate-box glass-panel">
          <span className="rate-label">Required RR</span>
          <span className="rate-value text-warning">{liveData.rrr}</span>
        </div>
      </div>

      <div className="recent-balls-section mt-3">
        <div className="balls-strip flex-center">
          {liveData.recentBalls.map((ball, index) => {
            let ballClass = 'ball';
            if (ball === 'W') ballClass += ' ball-danger';
            else if (ball === '4' || ball === '6') ballClass += ' ball-blue';
            else if (ball === '0') ballClass += ' ball-dot';
            
            return (
              <div key={index} className={ballClass}>
                {ball}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScorecardPanel;
