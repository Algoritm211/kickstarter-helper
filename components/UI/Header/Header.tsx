import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          KickStarter helper
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
