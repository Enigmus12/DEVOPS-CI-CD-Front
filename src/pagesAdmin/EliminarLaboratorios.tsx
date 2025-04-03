import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../service/api';
import Header from '../components/Header';
import '../styles/EliminarLaboratorios.css';

// Definición de la interfaz para las reservas
interface Booking {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  bookingClassRoom: string;
  priority: number;
  disable: boolean;
  reservedBy: string | null;
}

const EliminarLaboratorios: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      setBookings(data as Booking[]);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error al cargar las reservas:", err);
      setError("Error al cargar las reservas. Por favor, intente de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId: string): Promise<void> => {
    if (window.confirm("¿Está seguro que desea eliminar esta reserva?")) {
      try {
        await bookingService.deleteBooking(bookingId);
        // Actualizar la lista de reservas después de eliminar
        fetchBookings();
        alert("Reserva eliminada exitosamente");
      } catch (err) {
        console.error("Error al eliminar la reserva:", err);
        alert("Error al eliminar la reserva. Por favor, intente de nuevo.");
      }
    }
  };

  const handleVolver = (): void => {
    navigate('/admin');
  };

  return (
    <div className="eliminar-container">
      <Header title="Eliminar Laboratorios" />
      <button className="btn-volver" onClick={handleVolver}>
        Volver
      </button>

      {loading ? (
        <p className="loading-message">Cargando reservas...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-container">
          {bookings.length === 0 ? (
            <p className="info-message">No hay reservas disponibles</p>
          ) : (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Salón</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Reservado Por</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.bookingDate}</td>
                    <td>{booking.bookingTime}</td>
                    <td>{booking.bookingClassRoom}</td>
                    <td>{booking.priority}</td>
                    <td>{booking.disable ? 'Disponible' : 'Reservado'}</td>
                    <td>{booking.reservedBy || 'N/A'}</td>
                    <td>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDeleteBooking(booking.bookingId)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default EliminarLaboratorios;