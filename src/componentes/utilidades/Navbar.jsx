import React from 'react';
import '../../assets/Navbar.css';

export const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={user.photo} alt="User" className="user-photo" />
        <span className="user-name">{user.name}</span>
      </div>
    </nav>
  );
};
