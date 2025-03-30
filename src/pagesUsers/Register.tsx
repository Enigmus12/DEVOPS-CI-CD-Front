import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Register.css';

/**
 * Register Component
 * 
 * This component renders a user registration form for the "Reservas ECI" application.
 * It allows users to create an account by providing a username, email, password, 
 * and confirming the password. The component includes validation to ensure that 
 * the password and confirm password fields match.
 * 
 * State Variables:
 * - `username`: Stores the username entered by the user.
 * - `email`: Stores the email address entered by the user.
 * - `password`: Stores the password entered by the user.
 * - `confirmPassword`: Stores the confirmation password entered by the user.
 * - `error`: Stores an error message if the passwords do not match.
 * 
 * Functions:
 * - `handleRegister`: Handles the form submission, validates the input, and 
 *   navigates the user to the login page upon successful registration.
 * 
 * Features:
 * - Displays an error message if the passwords do not match.
 * - Logs the registration details to the console (for demonstration purposes).
 * - Shows a success alert upon successful registration.
 * - Navigates the user to the login page after registration.
 * 
 * UI Elements:
 * - A form with input fields for username, email, password, and confirm password.
 * - A submit button to create the account.
 * - A link to navigate to the login page if the user already has an account.
 * 
 * Dependencies:
 * - `useState` and `useNavigate` hooks from React.
 * - `Link` component for navigation.
 * - `Header` component for displaying the page title.
 * - `iconEscuelaIng` for displaying the logo.
 */
const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  /**
   * Handles the registration process when the form is submitted.
   * 
   * @param e - The form submission event.
   * 
   * This function prevents the default form submission behavior, checks if the 
   * password and confirmPassword fields match, and sets an error message if they do not.
   * If the passwords match, it logs the user registration details, displays a success 
   * alert, and navigates the user to the login page.
   */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    console.log('Usuario registrado:', { username, email, password });
    
    alert('Cuenta creada con éxito. Por favor inicia sesión.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <Header title="Registro - Reservas ECI" />
      
      <div className="register-form-container">
        <img src={iconEscuelaIng} alt="Icono Escuela de Ingeniería" className="register-logo" />
        
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Crear Cuenta</h2>
          
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
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="register-button">Crear Cuenta</button>
          
          <div className="login-link">
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;