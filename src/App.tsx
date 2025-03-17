import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConsultarDisponibilidad from './pages/ConsultarDisponibilidad';
import ReservarLaboratorio from './pages/ReservarLaboratorio';
import CancelarReserva from './pages/CancelarReserva';
import './styles/Global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consultar-disponibilidad" element={<ConsultarDisponibilidad />} />
        <Route path="/reservar-laboratorio" element={<ReservarLaboratorio />} />
        <Route path="/cancelar-reserva" element={<CancelarReserva />} />
      </Routes>
    </Router>
  );
}

export default App;