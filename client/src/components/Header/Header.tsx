import "./Header.scss";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header__logo">QuickScopes</h1>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">Discover</li>
          <li className="header__item">Messages</li>
          <li className="header__item">Your Rentals</li>
          <li className="header__item">Profile</li>
          <li className="header__item">Settings</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
