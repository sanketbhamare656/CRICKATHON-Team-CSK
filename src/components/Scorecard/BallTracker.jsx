import React from 'react';

const BallTracker = ({ data }) => {
  if (!data) return null;

  const overs = data.recentOvers || [
    { label: "Over 15 — S Malinga", total: 12, balls: ["dot", "run1", "run4", "dot", "run6", "run1"] },
    { label: "Over 16 — J Bumrah", total: 12, balls: ["run4", "dot", "wicket", "run2", "dot", "run1"] },
    { label: "Over 17 — J Bumrah (in progress)", total: "11+", balls: ["run6", "dot", "wide", "run4", "upcoming"] }
  ];

  const getBallClass = (ball) => {
    switch (ball) {
      case "dot": return "ball dot";
      case "run1": return "ball run1";
      case "run2": return "ball run2";
      case "run4": return "ball run4";
      case "run6": return "ball run6";
      case "wicket": return "ball wicket";
      case "wide": return "ball wide";
      case "noball": return "ball noball";
      case "upcoming": return "ball upcoming";
      default: return "ball dot";
    }
  };

  const getBallText = (ball) => {
    switch (ball) {
      case "dot": return "·";
      case "run1": return "1";
      case "run2": return "2";
      case "run4": return "4";
      case "run6": return "6";
      case "wicket": return "W";
      case "wide": return "Wd";
      case "noball": return "NB";
      case "upcoming": return "nxt";
      default: return ball;
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Ball-by-Ball · Last 3 Overs</span>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{data.teamA?.shortName || "CSK"} Innings</span>
      </div>
      <div className="panel-body" style={{ padding: '8px 14px' }}>
        {overs.map((over, idx) => (
          <div key={idx} style={{ marginTop: idx === 0 ? '0' : '8px' }}>
            <div className="over-label">{over.label}</div>
            <div className="ball-row">
              {over.balls.map((ball, bIdx) => (
                <div key={bIdx} className={getBallClass(ball)}>{getBallText(ball)}</div>
              ))}
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px', alignSelf: 'center' }}>
                = {over.total}
              </span>
            </div>
          </div>
        ))}

        <div className="ball-legend">
          <div className="legend-item"><div className="ball dot" style={{ width: '18px', height: '18px', fontSize: '9px' }}>·</div> Dot ball</div>
          <div className="legend-item"><div className="ball run4" style={{ width: '18px', height: '18px', fontSize: '9px' }}>4</div> Boundary</div>
          <div className="legend-item"><div className="ball run6" style={{ width: '18px', height: '18px', fontSize: '9px' }}>6</div> Six</div>
          <div className="legend-item"><div className="ball wicket" style={{ width: '18px', height: '18px', fontSize: '9px' }}>W</div> Wicket</div>
          <div className="legend-item"><div className="ball wide" style={{ width: '18px', height: '18px', fontSize: '9px' }}>Wd</div> Wide</div>
          <div className="legend-item"><div className="ball noball" style={{ width: '18px', height: '18px', fontSize: '9px' }}>NB</div> No ball</div>
        </div>
      </div>

      <style jsx>{`
        .over-label { font-size: 10px; font-weight: 600; color: var(--text-secondary); padding: 2px 0 4px; }
        .ball-row { display: flex; gap: 5px; flex-wrap: wrap; padding: 2px 0 4px; }
        .ball {
          width: 27px; height: 27px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ff-mono); font-size: 11px; font-weight: 600; flex-shrink: 0;
        }
        .ball.dot    { background: var(--bg-secondary); border: 0.5px solid var(--border-md);  color: var(--text-secondary); }
        .ball.run1   { background: #EAF3DE; border: 0.5px solid #97C459; color: #27500A; }
        .ball.run2   { background: #E1F5EE; border: 0.5px solid #5DCAA5; color: #085041; }
        .ball.run4   { background: #E6F1FB; border: 0.5px solid #85B7EB; color: #0C447C; }
        .ball.run6   { background: #FAEEDA; border: 0.5px solid #EF9F27; color: #633806; font-size: 10px; }
        .ball.wicket { background: #FCEBEB; border: 0.5px solid #F09595; color: #A32D2D; }
        .ball.wide   { background: #FBEAF0; border: 0.5px solid #ED93B1; color: #72243E; font-size: 9px; }
        .ball.noball { background: #FAECE7; border: 0.5px solid #F0997B; color: #993C1D; font-size: 9px; }
        .ball.upcoming { border: 1.5px dashed var(--border-md); background: transparent; font-size: 8px; color: var(--text-secondary); }
        .ball-legend {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 10px;
          padding-top: 8px; border-top: 0.5px solid var(--border);
        }
        .legend-item { display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
};

export default BallTracker;
