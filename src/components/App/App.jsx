import React, {Suspense} from 'react';
import { Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';

import theme from '../../theme';
import { configureStore } from '../../store';
import routes from '../../routes';
import { LinearProgress } from '@material-ui/core';

const history = createBrowserHistory();
const store = configureStore();
function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <Suspense fallback={<LinearProgress/>}>
              {renderRoutes(routes)}
            </Suspense>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
