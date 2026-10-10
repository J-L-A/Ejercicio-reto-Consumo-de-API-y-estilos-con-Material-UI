import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
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
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // botones sin MAYÚSCULAS forzadas
      fontWeight: 600,
    },
  },
  components: {
    // Inputs con fondo blanco para que resalten sobre el fondo del tema
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff' },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <Box component="main">
        {/* Separador con la altura del AppBar fijo (como en la plantilla DrawerAppBar) */}
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;