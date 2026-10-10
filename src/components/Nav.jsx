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
  color: '#FFD700', // Acento dorado en la lupa
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

export default function Nav({ busquedaNav, onBusquedaNav }) {
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
              color: '#FFD700', // Color personalizado dorado para el título
              fontWeight: 800,
              letterSpacing: 0.8,
            }}
          >
            PORTAL POSTS
          </Typography>

          {/* Enlaces de Navegación del Menú */}
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

          {/* Buscador integrado de la plantilla */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar posts…"
              inputProps={{ 'aria-label': 'search' }}
              value={busquedaNav || ''}
              onChange={(e) => onBusquedaNav && onBusquedaNav(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}