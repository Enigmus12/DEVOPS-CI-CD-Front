import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Login.css';


/**
 * Login component for the application.
 *
 * This component renders a login form that allows users to authenticate
 * by providing a username and password. It includes the following features:
 *
 * - Input fields for username and password.
 * - Validation logic to check if the credentials match predefined values.
 * - Displays an error message if the credentials are incorrect.
 * - Redirects to the home page upon successful login.
 * - Provides a link to the registration page for users without an account.
 *
 * @component
 * @returns {JSX.Element} The rendered login component.
 *
 * @remarks
 * This component uses React's `useState` hook to manage form state and
 * `useNavigate` from `react-router-dom` for navigation.
 *
 * @example
 * ```tsx
 * import Login from './Login';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <Login />
 *     </div>
 *   );
 * };
 * ```
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  /**
   * Handles the login form submission.
   *
   * @param e - The form event triggered on submission.
   *
   * This function prevents the default form submission behavior,
   * validates the username and password, and performs the following actions:
   * - If the username is 'admin' and the password is 'password', it sets a flag
   *   in local storage to indicate the user is logged in and navigates to the home page.
   * - Otherwise, it sets an error message indicating incorrect credentials.
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Lógica de validación
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <Header title="Inicio de Sesión - Reservas ECI" />
      
      <div className="login-form-container">
        <img src={iconEscuelaIng} alt="Icono Escuela de Ingeniería" className="login-logo" />
        
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Ingresar</button>
          
          <div className="register-link">
            ¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;