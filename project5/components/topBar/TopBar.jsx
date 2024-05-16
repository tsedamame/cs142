import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');

  const getUserModel = (userId, callback) => {
    const userModel = window.cs142models.userModel(userId);
    if (userModel) {
      callback(userModel);
    }
  };

  const updateTitle = () => {
    const { pathname } = location;

    if (pathname === '/') {
      setTitle('Welcome');
    } else if (pathname.includes('/users/')) {
      const userId = pathname.split('/')[2];
      getUserModel(userId, (userModel) => {
        if (userModel) {
          setTitle(`${userModel.first_name} ${userModel.last_name}`);
        }
      });
    } else if (pathname.includes('/photos/')) {
      const userId = pathname.split('/')[2];
      getUserModel(userId, (userModel) => {
        if (userModel) {
          setTitle(`Photos of ${userModel.first_name} ${userModel.last_name}`);
        }
      });
    }
  };

  useEffect(() => {
    updateTitle();
  }, [location]);

  return (
    <AppBar>
      <Toolbar>

        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
