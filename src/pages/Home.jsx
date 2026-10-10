import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Home.css';

function Home() {
  return (
    <div className="home-contenedor">
      <div className="home-tarjeta">
        <Typography variant="h3" component="h1" className="home-titulo">
          Bienvenido al Portal
        </Typography>
        <Typography variant="body1" className="home-descripcion">
          Ejercicio reto: Consumo de la API JSONPlaceholder y estilos con Material UI.
        </Typography>
        <Button
          component={Link}
          to="/posts"
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#4169E1',
            color: '#fff',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            '&:hover': { bgcolor: '#3658b5' },
          }}
        >
          Explorar Posts
        </Button>
      </div>
    </div>
  );
}

export default Home;