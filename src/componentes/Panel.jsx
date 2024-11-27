import React, { useState } from 'react';
import { Navbar } from './utilidades/Navbar';
import { Sidebar } from './utilidades/Sidebar';
import { Footer } from './utilidades/Footer';
import '../assets/Layout.css';

export const Panel = ({ children, user, sidebarOptions }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Navbar user={user} />
      <div className="layout-content">
        <Sidebar 
          options={sidebarOptions} 
          className={isSidebarOpen ? 'sidebar open' : 'sidebar'} 
        />
        <main className="main-content">{children}</main>
      </div>
      {/* Botón de toggling para pantallas pequeñas */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      {/* Footer siempre abajo */}
      <Footer />
    </div>
  );
};
