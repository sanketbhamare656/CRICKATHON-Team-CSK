import './PredictionEngine.css';
import PlayerAvatars from '../Scorecard/PlayerAvatars';

const PredictionEngine = () => {
  // Mocked prediction data
  const winProbability = 68; // IND win %
  
  return (
    <div className="prediction-engine">
      {/* Predictor Gauge Card */}
      <div className="glass-panel gauge-card">
        <h3 className="section-title text-center">AI Prediction Engine</h3>
        
        <div className="gauge-container">
          <div className="gauge-background">
            <div 
              className="gauge-fill" 
              style={{ width: `${winProbability}%` }}
            ></div>
          </div>
          
          <div className="gauge-labels flex-between">
            <div className="team-prob text-warning">
              <span className="prob-value">{winProbability}%</span>
              <span className="prob-team">IND</span>
            </div>
            <div className="team-prob text-deep-purple">
              <span className="prob-team">AUS</span>
              <span className="prob-value">{100 - winProbability}%</span>
            </div>
          </div>
          
          <div className="gauge-marker" style={{ left: `${winProbability}%` }}>
            <div className="marker-line"></div>
            <div className="marker-dot glow-orange"></div>
          </div>
        </div>

        <p className="prediction-text text-secondary text-center mt-3">
          Based on 5-year historical data, <span className="text-primary">IND</span> has a strong advantage due to current run rate and wickets in hand.
        </p>
      </div>

      {/* Interactive Playing XI Avatars */}
      <PlayerAvatars />
    </div>
  );
};

export default PredictionEngine;
