import { useEffect, useState } from 'react';
import './InsightsPanel.css';

const InsightsPanel = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'momentum',
      title: 'Momentum Shift',
      desc: 'India has gained 15% win probability in the last 3 overs due to high scoring rate.',
      icon: '📈'
    },
    {
      id: 2,
      type: 'pressure',
      title: 'Pressure Alert',
      desc: 'Dot ball percentage is up to 45%. Batsmen likely to take risks soon.',
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'prediction',
      title: 'AI Prediction',
      desc: 'Projected score is 175-185 based on current pitch conditions and historical data.',
      icon: '🤖'
    }
  ]);

  // Simulate incoming new insight every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCard = {
          id: Date.now(),
          type: 'insight',
          title: 'Bowler Strategy',
          desc: 'Cummins is bowling 65% short pitched deliveries to Kohli.',
          icon: '🎯'
        };
        // Keep only 3 cards
        return [newCard, ...prev.slice(0, 2)];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="insights-panel">
      <div className="insights-header flex-between">
        <h2 className="section-title text-neon-blue glow-blue">AI Insights</h2>
        <span className="live-pulse text-danger">● Live</span>
      </div>
      
      <div className="insights-list">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`glass-panel insight-card type-${card.type} animate-slide-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="insight-icon">{card.icon}</div>
            <div className="insight-content">
              <h4 className="insight-title">{card.title}</h4>
              <p className="insight-desc">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
