import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Global.css';


/**
 * Home page component for the application.
 * Displays a header, a logout button, and buttons to navigate to other pages.
 * @returns {JSX.Element} Home page component.
 */
function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  
  return (
    <div>
      <Header title="Reservas ECI" />
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      <div className="button-container">
        <button className="btn" onClick={() => navigate('/consultar-MisReservas')}>
          Consultar Mis Reservas
        </button>
        <button className="btn" onClick={() => navigate('/reservar-laboratorio')}>
          Reservar Laboratorio
        </button>
      </div>
      <img src={iconEscuelaIng} alt="Icono Escuela Ing" className="img-decorativa" />
    </div>
  );
}

export default HomePage;
