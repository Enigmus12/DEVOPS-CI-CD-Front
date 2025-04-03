import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Global.css';



function HomePageAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  
  return (
    <div>
      <Header title="Reservas ECI Admin" />
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      <div className="button-container">
        <button className="btn" onClick={() => navigate('/consultar-reservas')}>
          Consultar Reservas
        </button>
        <button className="btn" onClick={() => navigate('/generar-laboratorios')}>
          Generar Laboratorios
        </button>
        <button className="btn" onClick={() => navigate('/eliminar-laboratorios')}>
          Eliminar Laboratorios
        </button>
      </div>
      <img src={iconEscuelaIng} alt="Icono Escuela Ing" className="img-decorativa" />
    </div>
  );
}

export default HomePageAdmin;
