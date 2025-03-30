import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pagesBookings/HomePage';
import ConsultarDisponibilidad from './pagesBookings/ConsultarDisponibilidad';
import ReservarLaboratorio from './pagesBookings/ReservarLaboratorio';
import CancelarReserva from './pagesBookings/CancelarReserva';
import Login from './pagesUsers/Login';
import Register from './pagesUsers/Register';
import './styles/Global.css';


/**
 * Props for the ProtectedRoute component.
 *
 * @interface ProtectedRouteProps
 * @property {ReactNode} children - The child components to be rendered within the protected route.
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A React functional component that acts as a protected route wrapper.
 * It checks if the user is logged in by verifying a value in localStorage.
 * If the user is not logged in, it redirects them to the login page.
 * Otherwise, it renders the child components.
 *
 * @param {ProtectedRouteProps} props - The props for the ProtectedRoute component.
 * @param {React.ReactNode} props.children - The child components to render if the user is logged in.
 * @returns {JSX.Element} - The rendered component or a redirection to the login page.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

/**
 * The main application component that defines the routing structure for the app.
 * 
 * This component uses React Router to define both public and protected routes.
 * Protected routes are wrapped with the `ProtectedRoute` component to ensure
 * that only authenticated users can access them.
 * 
 * Routes:
 * - Public Routes:
 *   - `/login`: Renders the `Login` component.
 *   - `/register`: Renders the `Register` component.
 * 
 * - Protected Routes:
 *   - `/`: Renders the `HomePage` component, wrapped with `ProtectedRoute`.
 *   - `/consultar-disponibilidad`: Renders the `ConsultarDisponibilidad` component, wrapped with `ProtectedRoute`.
 *   - `/reservar-laboratorio`: Renders the `ReservarLaboratorio` component, wrapped with `ProtectedRoute`.
 *   - `/cancelar-reserva`: Renders the `CancelarReserva` component, wrapped with `ProtectedRoute`.
 * 
 * - Fallback Route:
 *   - Any undefined route (`*`) redirects to `/login`.
 * 
 * @component
 */
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