import { Box } from '@mui/material';
import React from 'react';
import {Header} from "./UI/Header/Header";

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <React.Fragment>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </React.Fragment>
  );
};

export default Layout;
