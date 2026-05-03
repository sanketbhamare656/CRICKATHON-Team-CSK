import React from 'react';

const WinProbability = ({ data }) => {
  if (!data) return null;

  return (
    <div className="win-prob">
      <div className="win-prob-header">
        <span className="section-label">Win Probability</span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Based on run rate & remaining overs</span>
      </div>
      <div className="win-values">
        <span className="win-pct-csk">{data.teamA?.shortName || "CSK"} {data.winProbA || "67"}%</span>
        <span className="win-pct-mi">{data.teamB?.shortName || "MI"} {data.winProbB || "33"}%</span>
      </div>
      <div className="prob-bar-track">
        <div className="prob-csk" style={{ width: `${data.winProbA || 67}%` }}></div>
        <div className="prob-mi"></div>
      </div>
      <div className="rr-grid">
        <div className="rr-card">
          <div className="rr-val" style={{ color: 'var(--success)' }}>{data.crr || "9.43"}</div>
          <div className="rr-lbl">Current RR</div>
        </div>
        <div className="rr-card">
          <div className="rr-val" style={{ color: 'var(--warning)' }}>{data.rrr || "11.20"}</div>
          <div className="rr-lbl">Req. RR</div>
        </div>
        <div className="rr-card">
          <div className="rr-val">{data.ballsLeft || "15"}</div>
          <div className="rr-lbl">Balls Left</div>
        </div>
        <div className="rr-card">
          <div className="rr-val" style={{ color: 'var(--danger)' }}>{data.runsNeeded || "56"}</div>
          <div className="rr-lbl">Runs Needed</div>
        </div>
      </div>

      <style jsx>{`
        .win-prob {
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-primary);
          padding: 12px 16px;
        }
        .win-prob-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .win-values {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .win-pct-csk { font-weight: 600; color: var(--csk-dark); }
        .win-pct-mi  { font-weight: 600; color: var(--mi-dark);  }
        .prob-bar-track {
          height: 8px;
          border-radius: 4px;
          background: var(--bg-secondary);
          overflow: hidden;
          border: 0.5px solid var(--border);
          display: flex;
        }
        .prob-csk { background: var(--csk); border-right: 1.5px solid white; }
        .prob-mi  { background: var(--mi);  flex: 1; }
        .rr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 10px;
        }
        .rr-card {
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          text-align: center;
        }
        .rr-val { font-family: var(--ff-mono); font-size: 18px; font-weight: 600; }
        .rr-lbl { font-size: 10px; color: var(--text-secondary); margin-top: 2px; }
        
        @media (max-width: 640px) {
          .rr-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default WinProbability;
