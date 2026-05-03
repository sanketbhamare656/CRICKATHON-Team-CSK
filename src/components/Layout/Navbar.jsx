import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-left">
        <h1 className="logo text-neon-blue glow-blue">CricStat</h1>
      </div>
      
      <div className="navbar-center">
        <div className="match-title">
          <span className="team">IND</span>
          <span className="vs">vs</span>
          <span className="team">AUS</span>
        </div>
        <div className="live-indicator flex-center">
          <span className="dot animate-blink"></span>
          <span className="live-text text-danger">LIVE</span>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="controls">
          <button className="control-btn active">Live</button>
          <button className="control-btn">1x</button>
          <button className="control-btn">2x</button>
          <button className="control-btn">Pause</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
