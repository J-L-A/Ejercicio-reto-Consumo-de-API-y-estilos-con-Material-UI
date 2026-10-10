import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Home.css';

function Home() {
  return (
    <div className="home-contenedor">
      <div className="home-tarjeta">
        <Typography variant="h3" component="h1" className="home-titulo" color="primary.dark">
          Bienvenido al Portal
        </Typography>
        <Typography variant="body1" className="home-descripcion">
          Ejercicio reto: Consumo de la API JSONPlaceholder y estilos con Material UI.
        </Typography>
        <Button
          component={Link}
          to="/posts"
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Explorar Posts
        </Button>
      </div>
    </div>
  );
}

export default Home;