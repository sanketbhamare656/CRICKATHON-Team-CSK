import React from 'react';

const FallOfWickets = ({ data }) => {
  if (!data) return null;

  const fow = data.fallOfWickets || [
    { num: 1, name: "Ruturaj Gaikwad", score: "45 (31b)", over: "6.2" },
    { num: 2, name: "Devon Conway", score: "22 (18b)", over: "9.4" },
    { num: 3, name: "Ajinkya Rahane", score: "18 (14b)", over: "13.1" },
    { num: 4, name: "Ambati Rayudu", score: "7 (6b)", over: "16.2" }
  ];

  const bowlingStats = data.teamBBowlingFigures || [
    { name: "J Bumrah", overs: "3.3", runs: "38", wickets: "2", economy: "10.86" },
    { name: "S Malinga", overs: "4", runs: "42", wickets: "1", economy: "10.50" },
    { name: "K Pollard", overs: "3", runs: "31", wickets: "0", economy: "10.33" },
    { name: "H Pandya", overs: "3", runs: "27", wickets: "1", economy: "9.00" }
  ];

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Fall of Wickets</span>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{data.teamA?.shortName || "CSK"} · {data.teamA?.wickets || 4} wickets down</span>
      </div>
      <div className="panel-body" style={{ padding: '8px 14px' }}>
        <table className="fow-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batsman</th>
              <th>Score</th>
              <th>Over</th>
            </tr>
          </thead>
          <tbody>
            {fow.map((wicket, idx) => (
              <tr key={idx}>
                <td style={{ color: 'var(--text-secondary)' }}>{wicket.num}</td>
                <td>{wicket.name}</td>
                <td style={{ fontFamily: 'var(--ff-mono)' }}>{wicket.score}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{wicket.over}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divider"></div>

        <div className="section-label" style={{ marginBottom: '6px' }}>{data.teamB?.shortName || "MI"} Bowling Figures</div>

        <table className="fow-table">
          <thead>
            <tr>
              <th>Bowler</th>
              <th>O</th>
              <th>R</th>
              <th>W</th>
              <th>Eco</th>
            </tr>
          </thead>
          <tbody>
            {bowlingStats.map((bowler, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500 }}>{bowler.name}</td>
                <td>{bowler.overs}</td>
                <td>{bowler.runs}</td>
                <td style={{ color: 'var(--danger)', fontWeight: 600 }}>{bowler.wickets}</td>
                <td>{bowler.economy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .fow-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .fow-table th { font-size: 10px; font-weight: 600; color: var(--text-secondary); text-align: left; padding: 3px 4px 5px; border-bottom: 0.5px solid var(--border); }
        .fow-table td { padding: 5px 4px; border-bottom: 0.5px solid var(--border); vertical-align: middle; }
        .fow-table tr:last-child td { border-bottom: none; }
        .divider { height: 0.5px; background: var(--border); margin: 10px 0; }
      `}</style>
    </div>
  );
};

export default FallOfWickets;
