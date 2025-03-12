import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  
  return (
    <button id="backBtn" onClick={() => navigate('/')}>
      ⬅️
    </button>
  );
}

export default BackButton;