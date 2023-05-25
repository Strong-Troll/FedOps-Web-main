import React from 'react';
import { Button } from '@mui/material';

const StartTrainButton = ({ onClick, selectedDevices, disabled }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onClick(selectedDevices)}
      disabled={disabled}
    >
      FL Start
    </Button>
  );
};

export default StartTrainButton;
