import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{
        top: 'auto',
        bottom: 0,
      }}
    >
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="body1" align="center">
            Footer Content
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
