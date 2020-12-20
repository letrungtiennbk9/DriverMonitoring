import React, { Suspense } from 'react';

import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'assets/styles/index.scss';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { LinearProgress } from '@material-ui/core';
import routes from 'routes';
import { configureStore } from '../../store';

import theme from '../../theme';

const store = configureStore();
function App() {
  return (
    <StoreProvider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Suspense fallback={<LinearProgress />}>{renderRoutes(routes)}</Suspense>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
