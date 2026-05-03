import { useState } from 'react';
import './PlayerAvatars.css';

const PlayerAvatars = () => {
  const players = [
    { name: 'V. Kohli', role: 'Batter', stat: 'SR: 145.2', img: 'https://i.pravatar.cc/150?img=11' },
    { name: 'R. Sharma', role: 'Batter', stat: 'SR: 138.4', img: 'https://i.pravatar.cc/150?img=12' },
    { name: 'H. Pandya', role: 'All-Rounder', stat: 'SR: 160.1', img: 'https://i.pravatar.cc/150?img=13' },
    { name: 'J. Bumrah', role: 'Bowler', stat: 'Econ: 6.5', img: 'https://i.pravatar.cc/150?img=14' },
    { name: 'R. Jadeja', role: 'All-Rounder', stat: 'Econ: 7.2', img: 'https://i.pravatar.cc/150?img=15' },
  ];

  return (
    <div className="glass-panel avatars-card">
      <h3 className="section-title">Playing XI Matchups</h3>
      
      <div className="avatars-grid">
        {players.map((player, idx) => (
          <div key={idx} className="avatar-wrapper">
            <div className="avatar-circle">
              <img src={player.img} alt={player.name} />
              <div className="avatar-tooltip glass-panel">
                <span className="player-name">{player.name}</span>
                <span className="player-role text-secondary">{player.role}</span>
                <span className="player-stat text-neon-green">{player.stat}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Animated Plus Button for more players */}
        <div className="avatar-wrapper">
          <div className="avatar-circle add-more flex-center">
            <span>+6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAvatars;
