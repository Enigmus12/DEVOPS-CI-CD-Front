import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

/**
 * Represents a booking entity with details about the booking ID, date, time, 
 * classroom, and its availability status.
 */
interface Booking {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  bookingClassRoom: string;
  disable: boolean;
}

/**
 * React functional component for displaying available booking schedules.
 * 
 * This component fetches booking data from an external API and displays it in a list format.
 * It handles loading states, errors, and cases where no bookings are available.
 * 
 * @component
 * @returns {JSX.Element} The rendered component displaying booking schedules.
 * 
 * @remarks
 * - The component uses `axios` to fetch data from the API.
 * - It manages three states: `bookings` (array of bookings), `loading` (boolean), and `error` (string or null).
 * - Displays a loading message, error message, or the list of bookings based on the state.
 * 
 * @example
 * ```tsx
 * <ConsultarDisponibilidad />
 * ```
 * 
 * @dependencies
 * - `axios` for HTTP requests.
 * - `Header` component for displaying the page title.
 * - `BackButton` component for navigation.
 * 
 * @state
 * - `bookings`: An array of booking objects fetched from the API.
 * - `loading`: A boolean indicating whether the data is being loaded.
 * - `error`: A string or null indicating if an error occurred during data fetching.
 * 
 * @hooks
 * - `useState` for managing component state.
 * - `useEffect` for fetching data on component mount.
 * 
 * @interface Booking
 * - `bookingId`: Unique identifier for the booking.
 * - `bookingDate`: Date of the booking.
 * - `bookingTime`: Time of the booking.
 * - `bookingClassRoom`: Classroom associated with the booking.
 * - `disable`: Boolean indicating if the booking is available.
 */
const ConsultarDisponibilidad: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Booking[]>("https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings")
      .then(response => {
        console.log("Datos recibidos:", response.data); // Verificar Datos con esta línea
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error obteniendo reservas:", error);
        setError("Error al cargar las reservas");
        setLoading(false);
      });
  }, []);
  

  return (
    <div>
      <Header title="Consultar disponibilidad" />
      <h2>Horarios disponibles</h2>
      
      <div id="contenedorHorarios" className="horarios-container">
        {loading ? (
          <p>Cargando horarios...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookings.length === 0 ? (
          <p>No hay horarios disponibles</p>
        ) : (
          bookings.map(booking => (
            <div key={booking.bookingId} className="horario-box">
              <p><strong>ID:</strong> {booking.bookingId}</p>
              <p><strong>Fecha:</strong> {booking.bookingDate}</p>
              <p><strong>Hora:</strong> {booking.bookingTime}</p>
              <p><strong>Aula:</strong> {booking.bookingClassRoom}</p>
              <p><strong>Disponible:</strong> {booking.disable ? "Sí" : "No"}</p>
            </div>
          ))
        )}
      </div>
      
      <BackButton />
    </div>
  );
}

export default ConsultarDisponibilidad;