import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ backgroundColor: "#2B2B2B", width: 200 }}>
      <div
        className="badger-logo"
        style={{
          width: 100,
          height: 100,
          backgroundColor: "orange",
          margin: "auto",
          marginTop: 50,
          marginBottom: 50,
        }}
      ></div>
      <div className="nav" style={{ textAlign: "center", fontSize: 24 }}>
        <div className="nav-item" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Link to="/Home" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </div>
        <div className="nav-item" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Link to="/AUM" style={{ textDecoration: "none", color: "white" }}>
            AUM
          </Link>
        </div>
        <div className="nav-item" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Link to="/Tokens" style={{ textDecoration: "none", color: "white" }}>
            Tokens
          </Link>
        </div>
        <div className="nav-item" style={{ paddingTop: 10, paddingBottom: 10 }}>
          BIP 24
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
