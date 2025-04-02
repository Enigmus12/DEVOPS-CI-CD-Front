import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../service/api';
import Header from '../components/Header';
import '../styles/ReservarLaboratorio.css';


/**
 * Component for reserving laboratories.
 * Allows users to filter available laboratories by date, classroom, and priority.
 * Users can make reservations directly from the list of available laboratories.
 * @returns {JSX.Element} Reservation component.
 */
interface Booking {
  bookingId: string;
  bookingDate: string;
  disable: boolean;
  bookingClassRoom: string;
  priority: number;
  reservedBy: string | null;
}

const ReservarLaboratorio: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    date: '',
    classroom: '',
    priority: ''
  });
  
  useEffect(() => {
    fetchBookings();
  }, []);
  
  const handleLogoutmenu = () => {
    navigate('/');
  };
  
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings() as Booking[];
      
      // Filtramos solo los disponibles (disable = true)
      const availableBookings = data.filter((booking: Booking) => booking.disable);
      setBookings(availableBookings);
    } catch (err: any) {
      setError('Error al cargar las reservas disponibles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
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
  
  const handleMakeReservation = async (bookingId: string) => {
    try {
      if (window.confirm('¿Está seguro de realizar esta reserva?')) {
        await bookingService.makeReservation(bookingId);
        alert('Reserva realizada con éxito');
        fetchBookings(); // Recargar la lista sin redirigir
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al realizar la reserva');
    }
  };

  return (
    <div>
      <Header title="Reservar Laboratorio" />
      <button className="btn-logmenu" onClick={handleLogoutmenu}>
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
          <p className="loading">Cargando disponibilidad...</p>
        ) : (
          <div className="bookings-table">
            {filteredBookings.length === 0 ? (
              <p className="no-bookings">No hay laboratorios disponibles con esos criterios</p>
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
                            onClick={() => handleMakeReservation(booking.bookingId)}
                          >
                            Reservar
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

export default ReservarLaboratorio;
