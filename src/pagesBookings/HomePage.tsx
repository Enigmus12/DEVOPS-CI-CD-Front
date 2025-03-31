import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';

/**
 * The `HomePage` component serves as the main landing page for the booking system.
 * It provides navigation buttons for users to perform various actions such as
 * checking availability, reserving a laboratory, and canceling a reservation.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered HomePage component.
 *
 * @remarks
 * - This component uses the `useNavigate` hook from `react-router-dom` to handle navigation.
 * - The `Header` component is used to display the page title.
 * - Includes an image for decorative purposes with the class `img-decorativa`.
 *
 * @example
 * ```tsx
 * import HomePage from './HomePage';
 *
 * function App() {
 *   return <HomePage />;
 * }
 * ```
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