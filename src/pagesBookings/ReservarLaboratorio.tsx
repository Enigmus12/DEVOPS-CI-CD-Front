import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

interface Booking {
  bookingId: string;
  bookingClassRoom: string;
  bookingDate: string;
  bookingTime: string;
  disable: boolean;
}

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