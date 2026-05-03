import React from 'react';

const BowlingPanel = ({ data }) => {
  if (!data) return null;

  const bowler = data.currentBowler || {
    name: "Jasprit Bumrah",
    initials: "JB",
    role: "Right-arm Fast · Death Over Specialist",
    overs: "3.3",
    runs: "38",
    wickets: "2",
    economy: "10.86",
    analysis: {
      inswing: 62,
      outswing: 38,
      speed: 148,
      types: [
        { label: "Yorker", pct: 45, class: "success" },
        { label: "Bouncer", pct: 22, class: "danger" },
        { label: "Full", pct: 33, class: "info" }
      ]
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Current Bowling</span>
        <span className="tag bowling">{data.teamB?.shortName || "MI"}</span>
      </div>
      <div className="panel-body">
        <div className="bowler-header">
          <div className="bowler-avatar">{bowler.initials}</div>
          <div>
            <div className="bowler-name">{bowler.name}</div>
            <div className="bowler-role">{bowler.role}</div>
          </div>
        </div>

        <div className="bowl-stats-grid">
          <div className="bs-card"><div className="bs-val">{bowler.overs}</div><div className="bs-lbl">Overs</div></div>
          <div className="bs-card"><div className="bs-val" style={{ color: 'var(--danger)' }}>{bowler.runs}</div><div className="bs-lbl">Runs</div></div>
          <div className="bs-card"><div className="bs-val" style={{ color: 'var(--success)' }}>{bowler.wickets}</div><div className="bs-lbl">Wickets</div></div>
          <div className="bs-card"><div className="bs-val" style={{ color: 'var(--warning)' }}>{bowler.economy}</div><div className="bs-lbl">Economy</div></div>
        </div>

        <div className="swing-section">
          <div className="swing-title">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
              <line x1="5" y1="1" x2="5" y2="5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Ball Analysis
          </div>

          <div className="swing-row">
            <div className="swing-row-header">
              <span style={{ color: 'var(--text-secondary)' }}>Inswing</span>
              <span style={{ fontWeight: 600, fontFamily: 'var(--ff-mono)', color: 'var(--success)' }}>{bowler.analysis?.inswing}%</span>
            </div>
            <div className="swing-track"><div className="swing-fill in" style={{ width: `${bowler.analysis?.inswing}%` }}></div></div>
          </div>

          <div className="swing-row">
            <div className="swing-row-header">
              <span style={{ color: 'var(--text-secondary)' }}>Outswing</span>
              <span style={{ fontWeight: 600, fontFamily: 'var(--ff-mono)', color: 'var(--info)' }}>{bowler.analysis?.outswing}%</span>
            </div>
            <div className="swing-track"><div className="swing-fill out" style={{ width: `${bowler.analysis?.outswing}%` }}></div></div>
          </div>

          <div className="swing-row" style={{ marginTop: '6px' }}>
            <div className="swing-row-header">
              <span style={{ color: 'var(--text-secondary)' }}>Avg Delivery Speed</span>
              <span style={{ fontWeight: 600, fontFamily: 'var(--ff-mono)', color: '#993C1D' }}>{bowler.analysis?.speed} km/h</span>
            </div>
            <div className="swing-track"><div className="swing-fill speed" style={{ width: `${Math.min(bowler.analysis?.speed / 1.7, 100)}%` }}></div></div>
            <div className="speed-legend">
              <span>100 km/h</span><span>120</span><span>140</span><span>168</span>
            </div>
          </div>

          <div className="delivery-tags">
            {bowler.analysis?.types?.map((type, idx) => (
              <span key={idx} className="dtag" style={{
                background: `var(--${type.class}-bg)`,
                color: `var(--${type.class})`,
                border: `0.5px solid var(--border-md)`
              }}>
                {type.label} {type.pct}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bowler-header { display: flex; align-items: center; gap: 10px; padding-bottom: 8px; border-bottom: 0.5px solid var(--border); margin-bottom: 8px; }
        .bowler-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          background: var(--mi-light);
          color: var(--mi-dark);
          border: 0.5px solid var(--border);
          flex-shrink: 0;
        }
        .bowler-name { font-size: 14px; font-weight: 500; }
        .bowler-role { font-size: 11px; color: var(--text-secondary); }
        .bowl-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px; }
        .bs-card { background: var(--bg-secondary); border-radius: 6px; padding: 6px 8px; text-align: center; }
        .bs-val { font-family: var(--ff-mono); font-size: 14px; font-weight: 600; }
        .bs-lbl { font-size: 9px; color: var(--text-secondary); margin-top: 1px; }
        .swing-section { border: 0.5px solid var(--border); border-radius: var(--radius-md); padding: 10px; margin-top: 6px; }
        .swing-title { font-size: 10px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .swing-row { margin-bottom: 6px; }
        .swing-row-header { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px; }
        .swing-track { height: 6px; border-radius: 3px; background: var(--bg-secondary); border: 0.5px solid var(--border); overflow: hidden; }
        .swing-fill { height: 100%; border-radius: 3px; }
        .swing-fill.in { background: #0F6E56; }
        .swing-fill.out { background: #185FA5; }
        .swing-fill.speed { background: #993C1D; }
        .speed-legend { display: flex; justify-content: space-between; font-size: 9px; color: var(--text-secondary); margin-top: 2px; }
        .delivery-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; }
        .dtag { font-size: 10px; padding: 2px 8px; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BowlingPanel;
