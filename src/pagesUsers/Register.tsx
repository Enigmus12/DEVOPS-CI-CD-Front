import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

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