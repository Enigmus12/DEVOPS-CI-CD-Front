import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

function ConsultarDisponibilidad() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://reservaslaboratorios-e3amapggfafca5bn.canadacentral-01.azurewebsites.net/booking-service/bookings")
      .then(response => response.json())
      .then(data => {
        console.log("Datos recibidos:", data); // Verificar Datos con esta línea
        setBookings(data);
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