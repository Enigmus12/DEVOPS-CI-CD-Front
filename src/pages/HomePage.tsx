import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';

/**
 * The `HomePage` component serves as the main landing page for the application.
 * It provides navigation buttons for users to access different functionalities:
 * - Consultar Disponibilidad: Navigate to the availability consultation page.
 * - Reservar Laboratorio: Navigate to the laboratory reservation page.
 * - Cancelar Reserva: Navigate to the reservation cancellation page.
 *
 * Additionally, the page includes a header with the title "Reservas ECI" and a decorative image.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
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