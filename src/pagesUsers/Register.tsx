import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../service/api';
import '../styles/Register.css';
import iconEscuelaIng from '../assets/icons/iconEscuelaIng.png';

/**
 * User reservations consultation component.
 * Allows users to view, filter, and cancel their existing laboratory reservations.
 * @returns {JSX.Element} Reservations consultation component.
 */

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.userId || !formData.email || !formData.password || !formData.passwordConfirmation) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    if (formData.password !== formData.passwordConfirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await authService.register(formData);
      
      // Registro exitoso
      alert('Registro exitoso. Ahora puede iniciar sesión.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={iconEscuelaIng} alt="Logo ECI" className="auth-logo" />
        <h2>Registro de Usuario</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="userId">ID de Usuario</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              placeholder="Confirme su contraseña"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <p className="auth-link">
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia Sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Register;