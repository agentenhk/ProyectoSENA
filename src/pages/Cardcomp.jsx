import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegar entre componentes
import '../assets/Card.css';

export const Cardcomp = ({ title, image, description, link, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Si se pasa un 'onClick' personalizado, lo ejecutamos
    if (onClick) {
      onClick();
    } else if (link) {
      // Si se pasa un enlace, navegamos a él
      navigate(link);
    }
  };
  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-description">{description}</p>
        <button className="card-button">Ver Más</button>
      </div>
    </div>
  )
}
