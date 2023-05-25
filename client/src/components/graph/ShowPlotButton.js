import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowTrainButton = ({ onClick, to, disabled, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
    // Navigate to the specified page
    navigate(to);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ShowTrainButton;
