import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * BackButton component.
 *
 * This component renders a button that navigates the user back to the home page ('/').
 * It uses the `useNavigate` hook from React Router to handle navigation.
 *
 * @returns A button element with an arrow emoji and an `onClick` handler to navigate to the home page.
 */
const BackButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <button id="backBtn" onClick={() => navigate('/')}>
      ⬅️
    </button>
  );
}

export default BackButton;