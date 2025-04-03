import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { bookingService } from '../service/api';
import '../styles/ConsultarReservas.css';
interface Booking {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  bookingClassRoom: string;
  disable: boolean;
  reservedBy: string;
}

const ConsultarReservas: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    setError(null);
    
    bookingService.getAllBookings()
      .then(data => {
        console.log("Datos recibidos:", data);
        setBookings(data as Booking[]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error obteniendo reservas:", error);
        setError("Error al cargar las reservas. Por favor, intenta nuevamente más tarde.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Formato de fecha para mejor visualización
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="reservas-container">
      <div className="reservas-header">
        <h1 className="reservas-title">Horarios Disponibles</h1>
        <button 
          className="refresh-button" 
          onClick={fetchBookings}
        >
          Actualizar Horarios
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-animation"></div>
          <p className="loading-text">Cargando horarios...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-container">
          <p className="empty-text">No hay horarios disponibles en este momento</p>
        </div>
      ) : (
        <div className="reservas-grid">
          {bookings.map(booking => (
            <div
              key={booking.bookingId}
              className="reserva-card"
            >
              <div className="booking-id">ID: {booking.bookingId}</div>
              
              <div className="field-container">
                <div className="field-name">Fecha</div>
                <div className="field-value">{formatDate(booking.bookingDate)}</div>
              </div>
              
              <div className="field-container">
                <div className="field-name">Hora</div>
                <div className="field-value">{booking.bookingTime}</div>
              </div>
              
              <div className="field-container">
                <div className="field-name">Aula</div>
                <div className="field-value">{booking.bookingClassRoom}</div>
              </div>

              <div className="field-container">
                <div className="field-name">reservado por </div>
                <div className="field-value">{booking.reservedBy}</div>
              </div>
              
              <div className="status-container">
                <div className="field-name">Estado</div>
                <div className={`status-badge ${booking.disable ? 'status-available' : 'status-occupied'}`}>
                  {booking.disable ? "Disponible" : "Ocupado"}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultarReservas;