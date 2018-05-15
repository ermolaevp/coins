import * as React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Content from './components/content';
import Markets from './pages/markets';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Header from './components/header';
import './assets/styles/index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7fecba',
      main: '#4ab98a',
      dark: '#00885d',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff818c',
      main: '#ed4d5f',
      dark: '#b50836',
      contrastText: '#000',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontSize: 16,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <Content>
      <Markets />
    </Content>
  </MuiThemeProvider>
);

export default App;
