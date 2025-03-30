import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

/**
 * Represents a booking entity with details about a reservation.
 *
 * @interface Booking
 * @property {string} bookingId - The unique identifier for the booking.
 * @property {string} bookingClassRoom - The name or identifier of the classroom associated with the booking.
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
 * React functional component for canceling a booking.
 * 
 * This component fetches a list of bookings from an API, displays them in a dropdown menu,
 * and allows the user to cancel a selected booking. It also provides feedback on the status
 * of the cancellation operation.
 * 
 * @component
 * @returns {JSX.Element} The rendered CancelarReserva component.
 * 
 * @remarks
 * - The component uses `axios` for HTTP requests.
 * - The component manages its state using React hooks (`useState` and `useEffect`).
 * - The API endpoints used are hardcoded and should be replaced with environment variables in production.
 * 
 * @example
 * ```tsx
 * <CancelarReserva />
 * ```
 * 
 * @state {Booking[]} bookings - The list of bookings fetched from the API.
 * @state {string} selectedBooking - The ID of the booking selected by the user.
 * @state {string} status - The status message displayed to the user after an operation.
 * @state {string} statusColor - The color of the status message text.
 * @state {boolean} loading - Indicates whether the bookings are being loaded.
 * 
 * @dependencies
 * - `axios` for HTTP requests.
 * - `Header` and `BackButton` components for UI structure.
 * 
 * @methods
 * - `handleCancelar`: Sends a PUT request to cancel the selected booking and updates the status message.
 * 
 * @remarks
 * The component handles the following scenarios:
 * - Displays a loading message while fetching bookings.
 * - Shows a message if no bookings are available.
 * - Disables the dropdown and button while loading or if no bookings are available.
 * - Provides feedback on the success or failure of the cancellation operation.
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
   * This function sends a PUT request to the booking service API to cancel the selected booking.
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