import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

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