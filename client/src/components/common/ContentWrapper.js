import React, { useEffect, useRef, useState } from 'react';
import { Toolbar, Container, Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';
import { Paper } from '../../../node_modules/@mui/material/index';
import Footer from './Footer';

const ContentWrapper = ({children}) => {
  const [sidebarMaxHeight, setSidebarMaxHeight] = useState('90vh');
  const paperRef = useRef(document.getElementById('ContentPaper'));

  useEffect(() => {
    if (paperRef.current) {
      setSidebarMaxHeight(paperRef.current.offsetHeight);
    }
    }, [paperRef, children]);


    return (
      <>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  bottom: 0,
                  zIndex: 1,
                  height: `${sidebarMaxHeight}px`,
                  overflow: 'auto',
                }}
              >
                <Sidebar />
              </Box>
            </Grid>
            <Grid item xs>
              <Paper
                elevation={1}
                sx={{
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                id="ContentPaper"
              >
                <Box component="main" flexGrow={1} p={3}>
                  <Toolbar />
                  {/* This is to keep the main content below the AppBar */}
                  <Container maxWidth="lg">
                    {/* Add your main content here */}
                    {children}
                  </Container>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ zIndex: 2, position: 'relative' }}>
            <Footer />
          </Box>
        </Box>
      </>
    );
};

export default ContentWrapper;