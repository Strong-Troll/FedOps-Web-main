import React from 'react';
import { Grid, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export const TaskRefresh = ({ loading, onRequestData }) => (
  <Grid item xs={12} sm={6} container justifyContent="flex-end">
    <Button
      variant="outlined"
      color="primary"
      startIcon={<RefreshIcon />}
      onClick={onRequestData}
      disabled={loading}
    >
      Refresh
    </Button>
  </Grid>
);