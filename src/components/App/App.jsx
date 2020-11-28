import React from 'react';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../../theme';
import routes from '../../routes';
import { renderRoutes } from 'react-router-config';

import 'assets/styles/index.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>{renderRoutes(routes)}</Router>
    </ThemeProvider>
  );
}

export default App;
