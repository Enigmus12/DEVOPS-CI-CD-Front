import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

/**
 * Represents a booking for a classroom.
 * 
 * @interface Booking
 * @property {string} bookingId - The unique identifier for the booking.
 * @property {string} bookingClassRoom - The name or identifier of the classroom being booked.
 * @property {string} bookingDate - The date of the booking in string format.
 * @property {string} bookingTime - The time of the booking in string format.
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
 * The `CancelarReserva` component allows users to cancel a booking from a list of available bookings.
 * It fetches booking data from an API, displays the bookings in a dropdown menu, and provides a button
 * to cancel the selected booking. The component also displays the status of the cancellation operation.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered CancelarReserva component.
 *
 * @remarks
 * - The component uses `axios` to fetch and update booking data from the API.
 * - The `useState` hook is used to manage the state of bookings, the selected booking, status messages, and loading state.
 * - The `useEffect` hook is used to fetch bookings when the component is mounted.
 *
 * @example
 * ```tsx
 * import CancelarReserva from './CancelarReserva';
 *
 * const App: React.FC = () => {
 *   return <CancelarReserva />;
 * };
 * ```
 *
 * @dependencies
 * - `axios` for HTTP requests.
 * - `Header` and `BackButton` components for UI structure.
 *
 * @state
 * - `bookings` (`Booking[]`): List of bookings fetched from the API.
 * - `selectedBooking` (`string`): The ID of the currently selected booking.
 * - `status` (`string`): The status message displayed to the user.
 * - `statusColor` (`string`): The color of the status message text.
 * - `loading` (`boolean`): Indicates whether the component is loading data.
 *
 * @methods
 * - `handleCancelar`: Sends a request to cancel the selected booking and updates the status message.
 *
 * @styles
 * - The status message (`#estadoLab`) is styled dynamically based on the `statusColor` state.
 */
const CancelarReserva: React.FC = () => {
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
   * Handles the cancellation of a selected booking.
   * 
   * This function sends a PUT request to cancel the selected booking.
   * If the cancellation is successful, it updates the status message and color to indicate success.
   * If an error occurs, it updates the status message and color to indicate the error.
   * 
   * @returns {void} This function does not return a value.
   */
  const handleCancelar = (): void => {
    if (!selectedBooking) return;

    axios.put(`https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings/cancel/${selectedBooking}`)
      .then(response => {
        setStatus("✅ Reserva cancelada con exito");
        setStatusColor("green");
      })
      .catch(error => {
        setStatus(error.response?.data?.message || "❌ No hay reservas en este lab");
        setStatusColor("red");
      });
  };

  return (
    <div>
      <Header title="Cancelar reserva" />
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
        onClick={handleCancelar}
      >
        Cancelar
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

export default CancelarReserva;