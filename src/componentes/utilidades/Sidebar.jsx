import React from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import '../../assets/Sidebar.css';

export const Sidebar = ({ options }) => {
  const { setAuth, setSeccion } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace

    // Vaciar el localStorage
    localStorage.clear();

    // Setear los estados globales a vacío
    setAuth({});
    setSeccion(false);

    // Redireccionar al login
    navigate("/");
  };
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
        <a href="/" className="sidebar-link" onClick={handleLogout}>
          Salir
        </a>
      </ul>
    </div>
  );
};
