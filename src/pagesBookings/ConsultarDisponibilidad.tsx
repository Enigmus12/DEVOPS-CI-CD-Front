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
 * React functional component for consulting the availability of bookings.
 * 
 * This component fetches booking data from an external API and displays it in a list format.
 * It handles loading, error, and empty states to provide feedback to the user.
 * 
 * @component
 * @returns {JSX.Element} The rendered component displaying booking availability.
 * 
 * @remarks
 * - The component uses `axios` to fetch data from the API.
 * - It manages state using React's `useState` and `useEffect` hooks.
 * - Displays a loading message while fetching data, an error message if the request fails,
 *   and the list of bookings if the request succeeds.
 * - If no bookings are available, it displays a message indicating the absence of available slots.
 * 
 * @example
 * ```tsx
 * <ConsultarDisponibilidad />
 * ```
 * 
 * @dependencies
 * - `axios` for HTTP requests.
 * - `Header` and `BackButton` components for layout and navigation.
 * 
 * @state
 * - `bookings` (`Booking[]`): Array of booking objects fetched from the API.
 * - `loading` (`boolean`): Indicates whether the data is currently being loaded.
 * - `error` (`string | null`): Stores an error message if the API request fails.
 * 
 * @effects
 * - Fetches booking data from the API on component mount.
 * 
 * @errorHandling
 * - Logs errors to the console and displays a user-friendly error message.
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