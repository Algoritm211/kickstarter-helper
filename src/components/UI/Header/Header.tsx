import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link href="/">
          <Typography sx={{ cursor: 'pointer', textDecoration: 'none' }} variant="h6" color="inherit" href="/" component="a">
            KickStarter helper
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
