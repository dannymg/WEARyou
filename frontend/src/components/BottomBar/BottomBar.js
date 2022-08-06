import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const BottomBar = () => {
  return (
    <AppBar color="primary" sx={{ top: 'auto', bottom: 0 }} position='relative'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} >
          <small>&copy; Copyright 2022, WEARyou</small>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
