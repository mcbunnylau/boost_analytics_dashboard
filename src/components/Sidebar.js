import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="badger-logo"></div>
      <div className="nav">
        <div className="nav-item">
          <Link to="/Home">Home</Link>
        </div>
        <div className="nav-item">
          <Link to="/AUM">AUM</Link>
        </div>
        <div className="nav-item">
          <Link to="/Tokens">Tokens</Link>
        </div>
        <div className="nav-item">BIP 24</div>
      </div>
    </div>
  );
};

export default Sidebar;
