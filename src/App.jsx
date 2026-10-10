import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Nav from './components/Nav';
import Home from './pages/Home';
import Posts from './pages/Posts';

// Configuración de Tema: Royal Blue + Acentos Dorados
const theme = createTheme({
  palette: {
    primary: {
      main: '#4169E1', // Royal Blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFD700', // Dorado / Oro
      contrastText: '#1a1a1a',
    },
    background: {
      default: '#F4F6FB',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;