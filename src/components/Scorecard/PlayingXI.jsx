import { useState } from 'react';
import './PlayingXI.css';

const PlayingXI = ({ playingXI, captains }) => {
  const [activeTab, setActiveTab] = useState('teamA');

  if (!playingXI || !playingXI.teamA) return null;

  const currentTeamPlayers = playingXI[activeTab] || [];
  const currentCaptain = captains?.[activeTab];

  return (
    <div className="glass-panel playing-xi-card">
      <h3 className="section-title">Playing XI</h3>
      
      <div className="xi-tabs flex-between">
        <button 
          className={`xi-tab ${activeTab === 'teamA' ? 'active text-neon-blue' : ''}`}
          onClick={() => setActiveTab('teamA')}
        >
          Team 1
        </button>
        <button 
          className={`xi-tab ${activeTab === 'teamB' ? 'active text-warning' : ''}`}
          onClick={() => setActiveTab('teamB')}
        >
          Team 2
        </button>
      </div>
      
      {currentCaptain && (
        <div className="captain-info text-secondary">
          Captain: <span className="text-primary">{currentCaptain}</span>
        </div>
      )}

      <div className="players-list">
        {currentTeamPlayers.map((player, idx) => (
          <div key={idx} className="player-badge">
            <span className="player-number">{idx + 1}</span>
            <span className="player-name">{player}</span>
            {player.includes(currentCaptain) && <span className="captain-tag">(C)</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingXI;
