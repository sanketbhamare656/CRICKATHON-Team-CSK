import React, { useState, useEffect } from 'react';
import MatchHeader from './MatchHeader';
import WinProbability from '../Analytics/WinProbability';
import BattingPanel from './BattingPanel';
import BowlingPanel from './BowlingPanel';
import BallTracker from './BallTracker';
import FallOfWickets from './FallOfWickets';
import ChatbotWidget from '../Chatbot/ChatbotWidget';

const LiveScorecard = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/score');
        const json = await response.json();
        if (json.success) {
          setMatchData(json.data);
        }
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div style={{ color: 'white', padding: '20px' }}>Loading Live Data...</div>;
  }

  return (
    <div className="dashboard-container">
      <MatchHeader data={matchData} />
      
      <WinProbability data={matchData} />

      <div className="main-grid">
        <BattingPanel data={matchData} />
        <BowlingPanel data={matchData} />
      </div>

      <div className="bottom-grid">
        <BallTracker data={matchData} />
        <FallOfWickets data={matchData} />
      </div>

      <ChatbotWidget matchContext={matchData} />

      <style jsx>{`
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .main-grid, .bottom-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LiveScorecard;
