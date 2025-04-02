import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pagesBookings/HomePage';
import ConsultarMisReservas from './pagesBookings/ConsultarMisReservas';
import ReservarLaboratorio from './pagesBookings/ReservarLaboratorio';
import Login from './pagesUsers/Login';
import Register from './pagesUsers/Register';
import './styles/Global.css';

/**
 * ProtectedRoute component to guard routes that require authentication.
 * Redirects to login if the user is not authenticated.
 * @param {ReactNode} children - The child components to render if authenticated.
 * @returns {JSX.Element} Protected route component or redirect to login.
 */
interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const hasToken = !!localStorage.getItem('authToken'); // Verificar si existe el token
  
  if (!isLoggedIn || !hasToken) { // Verificar ambas condiciones
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
        <Route path="/consultar-MisReservas" element={
          <ProtectedRoute>
            <ConsultarMisReservas />
          </ProtectedRoute>
        } />
        <Route path="/reservar-laboratorio" element={
          <ProtectedRoute>
            <ReservarLaboratorio />
          </ProtectedRoute>
        } />
        
        {/* Ruta para cualquier otra URL no definida */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;