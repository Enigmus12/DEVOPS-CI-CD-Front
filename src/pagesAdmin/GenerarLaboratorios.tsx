import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingGenerateService } from '../service/api';
import Header from '../components/Header';

// Definimos la interfaz para la respuesta del servidor
interface GenerateBookingsResponse {
  message: string;
  totalGenerated: number;
}

// Definimos un tipo para el manejo de errores
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function GenerarLaboratorios() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GenerateBookingsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [min, setMin] = useState<number>(100);
  const [max, setMax] = useState<number>(1000);
  
  const handleGenerarLaboratorios = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await bookingGenerateService.generateBookings(min, max);
      setResult(response as GenerateBookingsResponse);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || apiError.message || 'Error al generar laboratorios');
      console.error('Error generando laboratorios:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    navigate('/admin');
  };
  
  return (
    <div>
      <Header title="Generar Laboratorios" />
      <button className="btn-logmenu" onClick={handleLogout}>
        Volver al menu
      </button>
      <div className="container">
        <div className="card">
          <h2>Generación de Laboratorios</h2>
          <p>Esta función generará automáticamente laboratorios disponibles para reserva.</p>
          
          <div className="form-group">
            <label htmlFor="min">Mínimo de laboratorios:</label>
            <input 
              type="number" 
              id="min"
              value={min} 
              onChange={(e) => setMin(parseInt(e.target.value) || 100)}
              min="1"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="max">Máximo de laboratorios:</label>
            <input 
              type="number" 
              id="max"
              value={max} 
              onChange={(e) => setMax(parseInt(e.target.value) || 1000)}
              min={min + 1}
              className="form-control"
            />
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={handleGenerarLaboratorios}
            disabled={loading}
          >
            {loading ? 'Generando...' : 'Generar Laboratorios'}
          </button>
          
          {result && (
            <div className="success-message">
              <h3>Laboratorios generados exitosamente</h3>
              <p>{result.message}</p>
              <p>Total generados: {result.totalGenerated}</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerarLaboratorios;