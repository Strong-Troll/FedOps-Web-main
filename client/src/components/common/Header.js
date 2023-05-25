import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../../modules/user';

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box display="flex" flexGrow={1} justifyContent="space-between">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" component="div">
                FedOps
              </Typography>
            </Link>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <UserInfo>{user.username}</UserInfo>
                <Button onClick={onLogout} color="inherit">
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
};

export default Header;