import './TopBar.css';

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="league-switcher glass-panel">
        <button className="league-btn active glow-blue text-neon-blue">IPL 2026</button>
        <button className="league-btn">T20 WORLD CUP</button>
        <button className="league-btn">BBL</button>
      </div>

      <div className="topbar-right">
        <div className="live-badge flex-center">
          <span className="live-dot animate-blink"></span>
          <span className="live-text text-danger">LIVE NOW</span>
        </div>
        
        <div className="user-profile glass-panel flex-center">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
