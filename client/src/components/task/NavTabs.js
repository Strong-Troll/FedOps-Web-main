import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function NavTabs({ _id }) {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

useEffect(() => {
  if (location.pathname.includes(`/task/${_id}/monitoring`)) setValue(1);
  else if (location.pathname.includes(`/task/${_id}/global-model`)) setValue(2);
  // Add more conditions here for additional tabs
  else if (location.pathname.includes(`/task/${_id}`)) setValue(0);
}, [location, _id]);


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Tab component={Link} label="Clients Selection" to={`/task/${_id}`} />
        <Tab
          component={Link}
          label="Monitoring"
          to={`/task/${_id}/monitoring`}
        />
        <Tab
          component={Link}
          label="Global Model"
          to={`/task/${_id}/global-model`}
        />
      </Tabs>
    </Box>
  );
}
