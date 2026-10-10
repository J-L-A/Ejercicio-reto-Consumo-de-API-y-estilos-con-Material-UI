import React, { useEffect, useState } from 'react';
import ObtenerPosts from '../services/postsService';
import Tarjeta from '../components/Tarjeta';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import './Posts.css'; // 🎨 Importación de estilos separados para Posts

function Posts() {
  // 1. Estados
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [pagina, setPagina] = useState(1);
  const limite = 10; // 10 posts por página (10 páginas en total)

  // 2. Función que consume el servicio
  const mostrarDatosPosts = async () => {
    try {
      setCargando(true);
      const datosJson = await ObtenerPosts(pagina, limite);
      setPosts(datosJson);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // 3. Se ejecuta al iniciar y cada vez que cambia de página
  useEffect(() => {
    mostrarDatosPosts();
  }, [pagina]);

  // 4. Filtrado del buscador en tiempo real
  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(buscar.toLowerCase())
  );

  // 5. Retornos tempranos para carga y error (como en ListarUsuarios)
  if (cargando) {
    return (
      <div className="posts-cargando">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ my: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  // 6. Renderizado principal con clases CSS separadas
  return (
    <div className="posts-contenedor">
      <Typography variant="h4" className="posts-titulo">
        Listado de Posts
      </Typography>

      {/* Buscador de Material UI */}
      <div className="posts-buscador">
        <TextField
          label="Buscar por título"
          variant="outlined"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          sx={{ width: { xs: '100%', sm: 380 } }}
        />
      </div>

      {/* Lista de Tarjetas Reutilizadas */}
      <div className="posts-grid">
        {postsFiltrados.map((post) => (
          <Tarjeta
            key={post.id}
            id={post.id}
            titulo={post.title}
            cuerpo={post.body}
          />
        ))}
      </div>

      {/* Paginación con Material UI */}
      <div className="posts-paginacion">
        <Pagination
          count={10}
          page={pagina}
          onChange={(event, valor) => setPagina(valor)}
          color="primary"
          size="large"
        />
      </div>
    </div>
  );
}

export default Posts;