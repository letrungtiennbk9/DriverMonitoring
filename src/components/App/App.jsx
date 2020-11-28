import React from 'react';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">Hello</Typography>
    </ThemeProvider>
  );
}

export default App;
