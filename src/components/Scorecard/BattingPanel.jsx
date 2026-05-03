import React from 'react';

const BattingPanel = ({ data }) => {
  if (!data) return null;

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Current Batting</span>
        <span className="tag batting">{data.teamA?.shortName || "CSK"}</span>
      </div>
      <div className="panel-body">
        {data.batsmen?.map((batsman, idx) => (
          <div key={idx} className="batter-row">
            <div className="batter-avatar">{batsman.initials || "BT"}</div>
            <div style={{ flex: 1 }}>
              <div className="batter-name">
                {batsman.isStriker && <div className="batting-now"></div>}
                {batsman.name}
                {batsman.isCaptain && (
                  <span style={{ fontSize: '9px', background: 'var(--csk-light)', color: 'var(--csk-dark)', padding: '1px 5px', borderRadius: '8px', fontWeight: 600, marginLeft: '5px' }}>
                    ★ C
                  </span>
                )}
              </div>
              <div className="batter-stats">
                <div className="stat-chip"><div className="sv">{batsman.runs}{batsman.isStriker ? "*" : ""}</div><div className="sl">Runs</div></div>
                <div className="stat-chip"><div className="sv">{batsman.balls}</div><div className="sl">Balls</div></div>
                <div className="stat-chip"><div className="sv">{batsman.fours}</div><div className="sl">4s</div></div>
                <div className="stat-chip"><div className="sv">{batsman.sixes}</div><div className="sl">6s</div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                <span>SR: {batsman.sr}</span><span>Pos #{batsman.position}</span>
              </div>
              <div className="sr-bar">
                <div className="sr-fill" style={{ width: `${Math.min(batsman.sr / 2, 100)}%`, background: 'var(--csk)' }}></div>
              </div>
            </div>
          </div>
        ))}

        <div className="partnership-section">
          <div className="part-header">
            <span style={{ color: 'var(--text-secondary)' }}>{data.partnership?.title || "5th Wicket Partnership"}</span>
            <span style={{ fontWeight: 600, fontFamily: 'var(--ff-mono)' }}>{data.partnership?.runs || "73"} runs · {data.partnership?.balls || "53"} balls</span>
          </div>
          <div className="part-bar">
            <div className="part-a" style={{ flex: data.partnership?.playerAContribution || 45 }}></div>
            <div className="part-b" style={{ flex: data.partnership?.playerBContribution || 28 }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
            <span>{data.batsmen?.[0]?.name.split(' ').pop()}: {data.batsmen?.[0]?.runs}</span>
            <span>{data.batsmen?.[1]?.name.split(' ').pop()}: {data.batsmen?.[1]?.runs}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .batter-row {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 10px;
          align-items: center;
          padding: 8px 0;
          border-bottom: 0.5px solid var(--border);
        }
        .batter-row:last-of-type { border-bottom: none; }
        .batter-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
          background: var(--csk-light);
          color: var(--csk-dark);
          border: 0.5px solid var(--border);
        }
        .batter-name { font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 5px; }
        .batting-now { width: 6px; height: 6px; border-radius: 50%; background: #E24B4A; animation: pulse 1.2s infinite; flex-shrink: 0; }
        .batter-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 4px; }
        .stat-chip { text-align: center; }
        .stat-chip .sv { font-family: var(--ff-mono); font-size: 13px; font-weight: 600; }
        .stat-chip .sl { font-size: 9px; color: var(--text-secondary); }
        .sr-bar { height: 3px; border-radius: 2px; background: var(--bg-secondary); margin-top: 4px; overflow: hidden; }
        .sr-fill { height: 100%; border-radius: 2px; }
        .partnership-section { margin-top: 10px; padding-top: 10px; border-top: 0.5px solid var(--border); }
        .part-header { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px; }
        .part-bar { display: flex; height: 6px; border-radius: 3px; overflow: hidden; border: 0.5px solid var(--border); margin-bottom: 4px; }
        .part-a { background: var(--csk); }
        .part-b { background: #97C459; }
      `}</style>
    </div>
  );
};

export default BattingPanel;
