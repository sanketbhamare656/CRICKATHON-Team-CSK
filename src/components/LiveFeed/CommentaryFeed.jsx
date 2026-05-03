import { useState, useEffect } from 'react';
import './CommentaryFeed.css';

const CommentaryFeed = () => {
  const [feed, setFeed] = useState([
    { id: 1, over: '17.2', ball: 'W', desc: 'OUT! Cummins strikes! A perfect yorker, middle stump knocked out.', highlight: 'danger' },
    { id: 2, over: '17.1', ball: '4', desc: 'FOUR! Shot! Picked the slower ball early and smashed it over extra cover.', highlight: 'blue' },
    { id: 3, over: '16.6', ball: '1', desc: 'Single to long-on. Good rotation of strike.', highlight: '' },
    { id: 4, over: '16.5', ball: '6', desc: 'SIX! Massive hit! That went into the second tier.', highlight: 'green' }
  ]);

  // Simulate incoming commentary
  useEffect(() => {
    const timer = setTimeout(() => {
      const newCommentary = {
        id: Date.now(),
        over: '17.3',
        ball: '0',
        desc: 'New batter is in. Defends solidly off the front foot.',
        highlight: ''
      };
      setFeed(prev => [newCommentary, ...prev.slice(0, 4)]);
    }, 15000);
    return () => clearTimeout(timer);
  }, [feed]);

  return (
    <div className="glass-panel commentary-card">
      <div className="commentary-header flex-between">
        <h3 className="section-title">Live Commentary</h3>
        <span className="live-pulse text-danger">●</span>
      </div>

      <div className="feed-container">
        {feed.map((item, index) => {
          let ballClass = 'feed-ball';
          if (item.highlight === 'danger') ballClass += ' ball-danger glow-orange';
          else if (item.highlight === 'blue') ballClass += ' ball-blue glow-blue';
          else if (item.highlight === 'green') ballClass += ' ball-green glow-green';

          return (
            <div 
              key={item.id} 
              className="feed-item animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feed-left">
                <span className="feed-over text-secondary">{item.over}</span>
                <div className={ballClass}>{item.ball}</div>
              </div>
              <div className="feed-right">
                <p className="feed-desc">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentaryFeed;
