import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div>
      <Header title="Reservas ECI" />
      <div className="button-container">
        <button className="btn" onClick={() => navigate('/consultar-disponibilidad')}>
          Consultar Disponibilidad
        </button>
        <button className="btn" onClick={() => navigate('/reservar-laboratorio')}>
          Reservar Laboratorio
        </button>
        <button className="btn" onClick={() => navigate('/cancelar-reserva')}>
          Cancelar Reserva
        </button>
      </div>
      <img src={iconEscuelaIng} alt="Icono Escuelang" className="img-decorativa" />
    </div>
  );
}

export default HomePage;