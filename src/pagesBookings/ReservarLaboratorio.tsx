import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

/**
 * Represents a booking for a classroom or laboratory.
 * 
 * @interface Booking
 * @property {string} bookingId - The unique identifier for the booking.
 * @property {string} bookingClassRoom - The name or identifier of the classroom being booked.
 * @property {string} bookingDate - The date of the booking in ISO 8601 format (e.g., YYYY-MM-DD).
 * @property {string} bookingTime - The time of the booking in a specific format (e.g., HH:mm).
 * @property {boolean} disable - Indicates whether the booking is disabled or inactive.
 */
interface Booking {
  bookingId: string;
  bookingClassRoom: string;
  bookingDate: string;
  bookingTime: string;
  disable: boolean;
}

/**
 * ReservarLaboratorio Component
 * 
 * This React functional component allows users to view and select available laboratory bookings
 * and make a reservation for a selected booking. It fetches booking data from an API, displays
 * the bookings in a dropdown menu, and provides a button to confirm the reservation.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered ReservarLaboratorio component.
 * 
 * @remarks
 * - The component uses the `useState` and `useEffect` hooks to manage state and side effects.
 * - Axios is used for making HTTP requests to the booking service API.
 * - The component displays a status message to indicate the success or failure of the reservation process.
 * 
 * @example
 * ```tsx
 * import ReservarLaboratorio from './ReservarLaboratorio';
 * 
 * function App() {
 *   return <ReservarLaboratorio />;
 * }
 * ```
 * 
 * @dependencies
 * - React
 * - Axios
 * - Header and BackButton components
 * 
 * @state
 * - `bookings` (`Booking[]`): Array of available bookings fetched from the API.
 * - `selectedBooking` (`string`): The ID of the currently selected booking.
 * - `status` (`string`): The status message displayed to the user.
 * - `statusColor` (`string`): The color of the status message text.
 * - `loading` (`boolean`): Indicates whether the booking data is being loaded.
 * 
 * @methods
 * - `handleReservar`: Sends a PUT request to reserve the selected booking and updates the status message.
 * 
 * @effects
 * - Fetches booking data from the API when the component mounts.
 * 
 * @styles
 * - The status message (`#estadoLab`) is styled with dynamic text color, font size, and alignment.
 */
const ReservarLaboratorio: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Booking[]>("https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings")
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error obteniendo reservas:", error);
        setLoading(false);
      });
  }, []);

  /**
   * Handles the reservation process for a selected booking.
   * 
   * This function sends a PUT request to the booking service API to make a reservation
   * for the currently selected booking. If the reservation is successful, it updates
   * the status message and color to indicate success. If an error occurs, it updates
   * the status message and color to indicate failure, displaying the error message
   * if available.
   * 
   * @returns {void} This function does not return a value.
   */
  const handleReservar = (): void => {
    if (!selectedBooking) return;

    axios.put(`https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings/make/${selectedBooking}`)
      .then(response => {
        setStatus("✅ Reserva realizada con éxito.");
        setStatusColor("green");
      })
      .catch(error => {
        setStatus(error.response?.data?.message || "❌ Ya está reservado este laboratorio.");
        setStatusColor("red");
      });
  };

  return (
    <div>
      <Header title="Reservar laboratorio" />
      <h2>Selecciona una reserva</h2>
      
      <select 
        id="listaReservas"
        value={selectedBooking}
        onChange={(e) => setSelectedBooking(e.target.value)}
        disabled={loading || bookings.length === 0}
      >
        {loading ? (
          <option value="">Cargando reservas...</option>
        ) : bookings.length === 0 ? (
          <option value="">No hay laboratorios disponibles</option>
        ) : (
          bookings.map(booking => (
            <option key={booking.bookingId} value={booking.bookingId}>
              ID: {booking.bookingId} | Aula: {booking.bookingClassRoom}
            </option>
          ))
        )}
      </select>
      
      <button 
        id="confirmarAccionBtn" 
        disabled={loading || bookings.length === 0 || !selectedBooking}
        onClick={handleReservar}
      >
        Reservar
      </button>
      
      <p 
        id="estadoLab" 
        style={{ 
          textAlign: "center", 
          fontSize: "1.5vw", 
          fontWeight: "bold",
          color: statusColor 
        }}
      >
        {status}
      </p>
      
      <BackButton />
    </div>
  );
}

export default ReservarLaboratorio;