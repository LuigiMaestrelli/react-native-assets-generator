import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './App';

import 'typeface-roboto';

import theme from './theme';

const AppLayout = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

ReactDOM.render(AppLayout, document.getElementById('root'));
