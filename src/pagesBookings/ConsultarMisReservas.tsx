import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../service/api';
import Header from '../components/Header';
import '../styles/ConsultarMisReservas.css';


/**
 * Component for consulting user reservations.
 * Allows users to view, filter, and cancel their existing laboratory reservations.
 * @returns {JSX.Element} Reservations consultation component.
 */
interface Booking {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  disable: boolean;
  bookingClassRoom: string;
  priority: number;
  reservedBy: string;
}

const ConsultarMisReservas: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    date: '',
    classroom: '',
    priority: ''
  });
  
  const handleLogoutMenu = () => {
    navigate('/');
  };

  const fetchMyReservations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyReservations() as Booking[];
      setBookings(data);
    } catch (err: any) {
      // rest of your error handling code
    } finally {
      setLoading(false);
    }
  }, [navigate]); // Add navigate as a dependency
  
  useEffect(() => {
    fetchMyReservations();
  }, [fetchMyReservations]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredBookings = bookings.filter(booking => {
    const dateMatch = filter.date ? booking.bookingDate === filter.date : true;
    const classroomMatch = filter.classroom 
      ? booking.bookingClassRoom.toLowerCase().includes(filter.classroom.toLowerCase()) 
      : true;
    const priorityMatch = filter.priority 
      ? booking.priority === Number(filter.priority) 
      : true;
    return dateMatch && classroomMatch && priorityMatch;
  });
  
  const handleCancelReservation = async (bookingId: string) => {
    try {
      if (window.confirm('¿Está seguro de cancelar esta reserva?')) {
        await bookingService.cancelReservation(bookingId);
        alert('Reserva cancelada con éxito');
        fetchMyReservations(); // Actualizar lista
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al cancelar la reserva');
    }
  };

  return (
    <div>
      <Header title="Mis Reservas" />

      <button className="btn-logmenu" onClick={handleLogoutMenu}>
        Volver al menu
      </button>
      
      <div className="container">
      <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={filter.date}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="classroom">Laboratorio:</label>
            <input
              type="text"
              id="classroom"
              name="classroom"
              value={filter.classroom}
              onChange={handleFilterChange}
              placeholder="Ej: Lab 1"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="priority">Prioridad (1-5):</label>
            <input
              type="number"
              id="priority"
              name="priority"
              min="1"
              max="5"
              value={filter.priority}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <p className="loading">Cargando sus reservas...</p>
        ) : (
          <div className="bookings-table">
            {bookings.length === 0 ? (
              <p className="no-bookings">No tiene reservas activas</p>
            ) : (
              <table>
              <thead>
                <tr>
                  <th>Laboratorio</th> 
                  <th>Fecha</th>
                  <th>Salon</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>{booking.bookingClassRoom}</td>
                    <td>{booking.priority}</td>
                    <td>
                      <button 
                        className="btn btn-small btn-primary"
                        onClick={() => handleCancelReservation(booking.bookingId)}
                      >
                        Cancelar
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
    </div>
  );
};

export default ConsultarMisReservas;