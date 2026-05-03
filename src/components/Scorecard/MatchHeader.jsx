import React from 'react';

const MatchHeader = ({ data }) => {
  if (!data) return null;

  return (
    <div className="match-header">
      <div className="stadium-bar">
        <div className="stadium-info">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 1C4.69 1 2 3.69 2 7c0 5 6 9 6 9s6-4 6-9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>{data.stadium || "Rajiv Gandhi International Cricket Stadium"}</span>
          <span>·</span>
          <span>Capacity: 50,000</span>
          <span>·</span>
          <span>Pitch: Batting-friendly · Dew expected</span>
        </div>
        <div className="live-badge">
          <div className="live-dot"></div>
          LIVE · Over {data.overs}
        </div>
      </div>

      <div className="match-meta">
        {/* Team A (e.g. SRH/CSK) */}
        <div className="team-block">
          <div className="team-badge csk">{data.teamA?.shortName || "CSK"}</div>
          <div>
            <div className="team-name" style={{ color: 'var(--csk-dark)' }}>{data.teamA?.name || "Chennai Super Kings"}</div>
            <div className="team-captain">Captain: {data.teamA?.captain || "MS Dhoni"}</div>
            <div className="score-block">
              <span className="score-runs" style={{ color: 'var(--csk-dark)' }}>{data.teamA?.score}</span>
              <span className="score-wkts">/ {data.teamA?.wickets}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{data.overs} overs</div>
            <div className="tag batting">1st INN · BATTING</div>
          </div>
        </div>

        {/* VS */}
        <div className="vs-block">
          <div className="vs-txt">VS</div>
          <div className="match-type">{data.matchInfo || "IPL 2026 · Match 45"}</div>
        </div>

        {/* Team B (e.g. KKR/MI) */}
        <div className="team-block right">
          <div className="team-badge mi">{data.teamB?.shortName || "MI"}</div>
          <div style={{ textAlign: 'right' }}>
            <div className="team-name" style={{ color: 'var(--mi-dark)' }}>{data.teamB?.name || "Mumbai Indians"}</div>
            <div className="team-captain">Captain: {data.teamB?.captain || "Rohit Sharma"}</div>
            <div style={{ marginTop: '3px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              {data.teamB?.score ? `${data.teamB.score}/${data.teamB.wickets}` : "Yet to bat"}
            </div>
            <div className="tag bowling" style={{ marginTop: '3px' }}>BOWLING</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .match-header {
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-primary);
        }
        .stadium-bar {
          background: var(--bg-secondary);
          padding: 7px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 0.5px solid var(--border);
        }
        .stadium-info {
          font-size: 12px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .live-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: var(--danger);
          background: var(--danger-bg);
          border: 0.5px solid #F09595;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .match-meta {
          padding: 14px 16px;
          display: grid;
          grid-template-columns: 1fr 90px 1fr;
          align-items: center;
          gap: 8px;
        }
        .team-block { display: flex; align-items: center; gap: 10px; }
        .team-block.right { flex-direction: row-reverse; text-align: right; }
        .team-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--ff-display);
          font-size: 18px;
          flex-shrink: 0;
          border: 0.5px solid var(--border);
        }
        .team-badge.csk { background: var(--csk-light); color: var(--csk-dark); }
        .team-badge.mi  { background: var(--mi-light);  color: var(--mi-dark);  }
        .team-name    { font-family: var(--ff-display); font-size: 22px; letter-spacing: 0.5px; line-height: 1; }
        .team-captain { font-size: 11px; color: var(--text-secondary); margin-top: 2px; }
        .vs-block { text-align: center; }
        .vs-txt   { font-family: var(--ff-display); font-size: 26px; color: var(--text-secondary); }
        .match-type {
          font-size: 10px;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 4px;
        }
        .score-block { display: flex; align-items: baseline; gap: 4px; margin-top: 3px; }
        .score-runs  { font-family: var(--ff-display); font-size: 32px; line-height: 1; }
        .score-wkts  { font-size: 14px; color: var(--text-secondary); }
        .tag {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 3px;
        }
        .tag.batting { background: var(--csk-light); color: var(--csk-dark); }
        .tag.bowling { background: var(--mi-light);  color: var(--mi-dark);  }
        
        @media (max-width: 640px) {
          .match-meta { grid-template-columns: 1fr; gap: 12px; }
          .vs-block { display: none; }
        }
      `}</style>
    </div>
  );
};

export default MatchHeader;
