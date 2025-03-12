import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

function ReservarLaboratorio() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings")
      .then(response => response.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error obteniendo reservas:", error);
        setLoading(false);
      });
  }, []);

  const handleReservar = () => {
    if (!selectedBooking) return;

    fetch(`https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings/make/${selectedBooking}`, { 
      method: "PUT" 
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("❌ Ya está reservado este laboratorio.");
        }
      })
      .then(() => {
        setStatus("✅ Reserva realizada con éxito.");
        setStatusColor("green");
      })
      .catch(error => {
        setStatus(error.message);
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