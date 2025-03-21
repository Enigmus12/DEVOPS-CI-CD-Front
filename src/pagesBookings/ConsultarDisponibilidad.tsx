import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

interface Booking {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  bookingClassRoom: string;
  disable: boolean;
}

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