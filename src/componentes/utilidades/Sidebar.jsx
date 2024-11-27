import React from 'react';
import '../../assets/Sidebar.css';
export const Sidebar = ({ options }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {options.map((option, index) => (
          <li key={index} className="sidebar-item">
            <a href={option.link} className="sidebar-link">
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
