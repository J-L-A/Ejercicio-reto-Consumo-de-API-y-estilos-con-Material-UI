import { useEffect, useState } from 'react';
import ObtenerPosts from '../services/postsService';
import Tarjeta from '../components/Tarjeta';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import './Posts.css';

const LIMITE = 10; // posts por página (_limit)

const crearClave = (pagina, busqueda) => `${pagina}|${busqueda}`;

function Posts() {
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  // Guarda la respuesta junto con la petición (clave) a la que pertenece
  const [resultado, setResultado] = useState({ clave: null, posts: [], total: 0, error: false });

  // Mientras la respuesta guardada no corresponda a la página/búsqueda actual, se está cargando
  const cargando = resultado.clave !== crearClave(pagina, busqueda);

  useEffect(() => {
    let cancelado = false; // evita mostrar respuestas viejas si el usuario sigue escribiendo

    ObtenerPosts(pagina, LIMITE, busqueda).then((respuesta) => {
      if (cancelado) return;
      setResultado({
        clave: crearClave(pagina, busqueda),
        posts: respuesta ? respuesta.datos : [],
        total: respuesta ? respuesta.total : 0,
        error: respuesta === null,
      });
    });

    return () => {
      cancelado = true;
    };
  }, [pagina, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(resultado.total / LIMITE));

  // Al buscar se vuelve a la página 1
  const cambiarBusqueda = (evento) => {
    setBusqueda(evento.target.value);
    setPagina(1);
  };

  const cambiarPagina = (evento, valor) => {
    setPagina(valor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mostrarContenido = () => {
    if (cargando) {
      return (
        <div className="posts-estado">
          <CircularProgress />
        </div>
      );
    }

    if (resultado.error) {
      return (
        <Alert severity="error" className="posts-estado">
          No se pudieron cargar los posts. Revisa tu conexión e inténtalo de nuevo.
        </Alert>
      );
    }

    if (resultado.posts.length === 0) {
      return (
        <Typography color="text.secondary" className="posts-estado">
          No se encontraron posts con el título “{busqueda}”.
        </Typography>
      );
    }

    return (
      <div className="posts-grid">
        {resultado.posts.map((post) => (
          <Tarjeta key={post.id} id={post.id} titulo={post.title} cuerpo={post.body} />
        ))}
      </div>
    );
  };

  return (
    <div className="posts-contenedor">
      <Typography variant="h4" component="h1" className="posts-titulo" color="primary.dark">
        Listado de Posts
      </Typography>

      {/* Buscador de Material UI */}
      <div className="posts-buscador">
        <TextField
          label="Buscar por título"
          variant="outlined"
          value={busqueda}
          onChange={cambiarBusqueda}
          sx={{ width: '100%', maxWidth: 420 }}
        />
      </div>

      {mostrarContenido()}

      {/* Paginación con Material UI: usa _page y _limit en cada cambio de página */}
      {!resultado.error && resultado.total > 0 && (
        <div className="posts-paginacion">
          <Pagination
            count={totalPaginas}
            page={pagina}
            onChange={cambiarPagina}
            color="primary"
            size="large"
          />
        </div>
      )}
    </div>
  );
}

export default Posts;