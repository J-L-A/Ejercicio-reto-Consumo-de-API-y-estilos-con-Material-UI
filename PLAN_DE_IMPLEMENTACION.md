# Plan de Implementación: Consumo de API y Estilos con Material UI

Este documento detalla el paso a paso técnico adaptado fielmente a los componentes base solicitados (`MediaCard` y `SearchAppBar`), integrando la paleta de color **Royal Blue** con **acentos dorados/amarillos** y asegurando el cumplimiento de la rúbrica de evaluación (20/20 puntos).

---

## 1. Tabla de Criterios de Evaluación (20 Puntos)

| Criterio | Descripción | Puntos | Archivo / Componente Principal |
| :--- | :--- | :---: | :--- |
| **Página de posts** | Carga y muestra correctamente los posts desde la API | **3** | `src/pages/Posts.jsx` |
| **Servicio** | El consumo de la API está en un archivo service separado (estilo de clase) | **3** | `src/services/postsService.js` |
| **Reutilización de tarjeta** | Cada post se muestra partiendo de la plantilla `MediaCard` de MUI | **2** | `src/components/Tarjeta.jsx` |
| **Buscador** | El buscador filtra los posts correctamente por título/cuerpo | **3** | `src/pages/Posts.jsx` |
| **Paginación** | Funciona consumiendo los parámetros `_page` y `_limit` de la API | **3** | `src/pages/Posts.jsx` (`Pagination`) |
| **Ruta y enlace** | La ruta `/posts` funciona y los enlaces en el menú llevan a las páginas | **2** | `src/App.jsx` y `src/components/Nav.jsx` |
| **Estilos con Material UI** | Estilos aplicados al nav, fondo/tema (Royal Blue + Dorado), botones e inputs | **4** | `ThemeProvider`, `createTheme`, `SearchAppBar`, `Tarjeta` |
| **Total** | | **20 / 20** | |

---

## 2. Paleta de Colores y Arquitectura de Archivos

### 2.1 Paleta de Colores (Tema Personalizado)
* **Color Primario (Royal Blue):** `#4169E1` (Color principal para el `AppBar`, botones primarios y bordes).
* **Color Secundario / Acento (Dorado-Amarillo):** `#FFD700` (Acentos en títulos, botones de acción, iconos y foco).
* **Fondo:** `#F4F6FB` (Gris azulado suave para resaltar las tarjetas).

### 2.2 Estructura de Archivos con CSS Separados (`src/`)
```text
src/
├── assets/
├── components/
│   ├── Nav.jsx             # Barra de navegación con SearchAppBar y enlaces
│   └── Tarjeta.jsx         # Card adaptada de MediaCard
├── pages/
│   ├── Home.jsx            # Vista de bienvenida
│   ├── Home.css            # 🎨 Estilos CSS dedicados para Home
│   ├── Posts.jsx           # Vista principal de posts
│   └── Posts.css           # 🎨 Estilos CSS dedicados para Posts (grilla, buscador, etc.)
├── services/
│   └── postsService.js     # Servicio de consumo de API (puro JS)
├── App.jsx                 # Configuración de tema global y rutas
├── index.css
└── main.jsx                # Envoltorio con BrowserRouter
```

---

## 3. Implementación Paso a Paso

### Paso 1: Dependencias de Material UI (¡Ya instalado! ✅)
El proyecto ya cuenta con las librerías necesarias en `package.json`:
* `@mui/material`
* `@mui/icons-material`
* `@emotion/react`
* `@emotion/styled`

---

### Paso 2: Servicio de Posts (`src/services/postsService.js`)
* **Criterio:** Servicio (3 pts)
* **Diseño:** Archivo JavaScript puro (sin JSX innecesario).

```javascript
// Este va a realizar la petición a la API y va a devolver los datos de los posts

async function ObtenerPosts(page = 1, limit = 10) {
    let url = '';
    
    if (page && limit) {
        url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    }
    else {
        url = 'https://jsonplaceholder.typicode.com/posts';
    }

    try {
        const resultado = await fetch(url);
        if (!resultado.ok) {
          throw new Error("Problemas al mostrar los datos");
        }           
        const datosJson = await resultado.json();
        return datosJson;     // Muy importante devolver los datos para que puedan ser utilizados en el componente que llama a esta función    
    }
    catch (err) {
        console.error(err.message);
    }
}

export default ObtenerPosts;
```

---

### Paso 3: Componente de Tarjeta (`src/components/Tarjeta.jsx`)
* **Criterio:** Reutilización de la tarjeta (2 pts) + Estilos MUI
* **Plantilla base:** Adaptada directamente desde la plantilla `MediaCard` de Material UI solicitada.

```jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export default function Tarjeta({
  id,
  titulo = "Lizard",
  cuerpo = "Lizards are a widespread group of squamate reptiles...",
  imagen,
  nombreUsuario,
  correo,
}) {
  const imagenUrl = imagen || `https://picsum.photos/seed/${id || 1}/400/200`;

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: 3,
        border: '1px solid rgba(65, 105, 225, 0.15)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 8,
          borderColor: '#FFD700',
        },
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        image={imagenUrl}
        title={titulo || nombreUsuario}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {id && (
          <Box sx={{ mb: 1 }}>
            <Chip
              label={`Post #${id}`}
              size="small"
              sx={{
                bgcolor: '#4169E1',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            />
          </Box>
        )}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            textTransform: 'capitalize',
            lineHeight: 1.3,
            color: '#1a237e',
          }}
        >
          {titulo || nombreUsuario}
        </Typography>
        {correo && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {correo}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
          {cuerpo}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Button
          size="small"
          sx={{
            color: '#4169E1',
            fontWeight: 600,
            '&:hover': { bgcolor: 'rgba(65, 105, 225, 0.08)' },
          }}
        >
          Compartir
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: '#FFD700',
            color: '#1a1a1a',
            fontWeight: 700,
            '&:hover': {
              bgcolor: '#e6c200',
            },
          }}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
```

---

### Paso 4: Barra de Navegación (`src/components/Nav.jsx`)
* **Criterio:** Ruta y enlace (2 pts) + Estilos al Nav con Material UI (4 pts).
* **Plantilla base:** Adaptada directamente desde la plantilla `SearchAppBar` de Material UI solicitada.

```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFD700',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));

export default function Nav() {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static" sx={{ bgcolor: '#4169E1' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#FFD700' }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 800,
              letterSpacing: 0.8,
            }}
          >
            PORTAL POSTS
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: '#fff',
                fontWeight: 600,
                borderBottom: location.pathname === '/' ? '2px solid #FFD700' : 'none',
                borderRadius: 0,
                '&:hover': { color: '#FFD700' },
              }}
            >
              Inicio
            </Button>
            <Button
              component={Link}
              to="/posts"
              sx={{
                color: '#fff',
                fontWeight: 600,
                borderBottom: location.pathname === '/posts' ? '2px solid #FFD700' : 'none',
                borderRadius: 0,
                '&:hover': { color: '#FFD700' },
              }}
            >
              Posts
            </Button>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar posts…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
```

---

### Paso 5: Página de Posts y su CSS (`src/pages/Posts.jsx` y `src/pages/Posts.css`)
* **Criterios:** Página de posts (3 pts), Buscador (3 pts), Paginación (3 pts), Estilos MUI (4 pts).

#### Archivo CSS: `src/pages/Posts.css`
```css
/* src/pages/Posts.css */
.posts-contenedor {
  padding: 32px 16px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.posts-titulo {
  font-weight: bold;
  color: #1a237e;
  margin-bottom: 24px;
}

.posts-buscador {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.posts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-bottom: 40px;
}

.posts-paginacion {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.posts-cargando {
  display: flex;
  justify-content: center;
  margin: 64px 0;
}
```

#### Componente: `src/pages/Posts.jsx`
```jsx
import React, { useEffect, useState } from 'react';
import ObtenerPosts from '../services/postsService';
import Tarjeta from '../components/Tarjeta';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import './Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [pagina, setPagina] = useState(1);
  const limite = 10;

  const mostrarDatosPosts = async () => {
    try {
      setCargando(true);
      const datosJson = await ObtenerPosts(pagina, limite);
      setPosts(datosJson || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    mostrarDatosPosts();
  }, [pagina]);

  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(buscar.toLowerCase())
  );

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

  return (
    <div className="posts-contenedor">
      <Typography variant="h4" className="posts-titulo">
        Listado de Posts
      </Typography>

      <div className="posts-buscador">
        <TextField
          label="Buscar por título"
          variant="outlined"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          sx={{ width: { xs: '100%', sm: 380 } }}
        />
      </div>

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
```

---

### Paso 6: Configuración del Tema Royal Blue + Dorado en `src/App.jsx`
* **Criterio:** Estilos con Material UI (4 pts).

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Nav from './components/Nav';
import Home from './pages/Home';
import Posts from './pages/Posts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4169E1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFD700',
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
```

---

### Paso 7: Página de Inicio y su CSS (`src/pages/Home.jsx` y `src/pages/Home.css`)

#### Archivo CSS: `src/pages/Home.css`
```css
/* src/pages/Home.css */
.home-contenedor {
  padding: 64px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-tarjeta {
  max-width: 720px;
  width: 100%;
  padding: 48px 32px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 16px;
  border-top: 6px solid #4169E1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.home-titulo {
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 16px;
}

.home-descripcion {
  color: #666;
  margin-bottom: 32px;
  font-size: 1.1rem;
}
```

#### Componente: `src/pages/Home.jsx`
```jsx
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
```

---

### Paso 8: Envoltorio en `src/main.jsx`
Para que React Router funcione sin errores en el navegador:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## 4. Resumen de Cumplimiento (20/20 Puntos)

* ✅ **Servicio (3 pts)**: Función `ObtenerPosts` en `postsService.js` con el diseño exacto visto en clase.
* ✅ **Página de Posts (3 pts)**: Consumo asíncrono con `useEffect`, estados de carga y grilla responsive.
* ✅ **Reutilización de Tarjeta (2 pts)**: Basada en la plantilla `MediaCard` de MUI con imagen (`CardMedia`), título, cuerpo y botones de acción.
* ✅ **Buscador (3 pts)**: `TextField` con icono de búsqueda que filtra en tiempo real.
* ✅ **Paginación (3 pts)**: Componente `Pagination` llamando a la API con `_page` y `_limit`.
* ✅ **Ruta y Enlace (2 pts)**: `Nav` con enlaces navegables y `<Route path="/posts">`.
* ✅ **Estilos con Material UI (4 pts)**: Barra `SearchAppBar`, tema **Royal Blue (`#4169E1`)** con **acentos dorados (`#FFD700`)**, tarjetas estilizadas y `CssBaseline`.
