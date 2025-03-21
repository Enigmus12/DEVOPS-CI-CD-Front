import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pagesBookings/HomePage';
import ConsultarDisponibilidad from './pagesBookings/ConsultarDisponibilidad';
import ReservarLaboratorio from './pagesBookings/ReservarLaboratorio';
import CancelarReserva from './pagesBookings/CancelarReserva';
import Login from './pagesUsers/Login';
import Register from './pagesUsers/Register';
import './styles/Global.css';

// Definir las props del componente con una interfaz
interface ProtectedRouteProps {
  children: ReactNode;
}

// Componente para proteger rutas con tipos correctos
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/consultar-disponibilidad" element={
          <ProtectedRoute>
            <ConsultarDisponibilidad />
          </ProtectedRoute>
        } />
        <Route path="/reservar-laboratorio" element={
          <ProtectedRoute>
            <ReservarLaboratorio />
          </ProtectedRoute>
        } />
        <Route path="/cancelar-reserva" element={
          <ProtectedRoute>
            <CancelarReserva />
          </ProtectedRoute>
        } />
        
        {/* Ruta para cualquier otra URL no definida */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;