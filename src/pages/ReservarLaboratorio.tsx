import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

/**
 * Represents a booking for a laboratory.
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
 * ReservarLaboratorio Component
 * 
 * This component allows users to view and select available laboratory bookings
 * and make a reservation for a specific laboratory. It fetches booking data
 * from an API and provides a dropdown menu for selection, along with a button
 * to confirm the reservation.
 * 
 * @component
 * 
 * @returns {JSX.Element} The ReservarLaboratorio component.
 * 
 * @remarks
 * - The component uses React hooks (`useState`, `useEffect`) to manage state and side effects.
 * - Axios is used for API requests to fetch and update booking data.
 * - The component displays a status message upon successful or failed reservation attempts.
 * 
 * @state {Booking[]} bookings - List of available bookings fetched from the API.
 * @state {string} selectedBooking - The ID of the currently selected booking.
 * @state {string} status - The status message displayed to the user after attempting a reservation.
 * @state {string} statusColor - The color of the status message text (green for success, red for error).
 * @state {boolean} loading - Indicates whether the booking data is being loaded.
 * 
 * @effect Fetches the list of bookings from the API when the component mounts.
 * 
 * @function handleReservar
 * - Makes a PUT request to the API to reserve the selected booking.
 * - Updates the status message and color based on the API response.
 * 
 * @dependencies
 * - `axios` for HTTP requests.
 * - `Header` and `BackButton` components for UI structure.
 * 
 * @example
 * <ReservarLaboratorio />
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
   * Handles the reservation process for a laboratory.
   * 
   * This function sends a PUT request to the booking service API to make a reservation
   * for the selected laboratory. If the reservation is successful, it updates the status
   * message to indicate success. If an error occurs, it updates the status message with
   * the error details or a default error message.
   * 
   * @returns {void} This function does not return a value.
   * 
   * @remarks
   * - The function will not execute if `selectedBooking` is not defined.
   * - The API endpoint URL is hardcoded and specific to the booking service.
   * 
   * @example
   * ```typescript
   * handleReservar();
   * ```
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