import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <button id="backBtn" onClick={() => navigate('/')}>
      ⬅️
    </button>
  );
}

export default BackButton;