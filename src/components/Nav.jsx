import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
// Cada opción del menú apunta a una ruta definida en <Routes> (App.jsx)
const navItems = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Posts', ruta: '/posts' },
];

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Menú lateral que se muestra en pantallas pequeñas
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700, color: 'primary.main' }}>
        PORTAL POSTS
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ texto, ruta }) => (
          <ListItem key={ruta} disablePadding>
            <ListItemButton
              component={Link}
              to={ruta}
              selected={pathname === ruta}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={texto} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: 'secondary.main', // acento dorado
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            PORTAL POSTS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ texto, ruta }) => (
              <Button
                key={ruta}
                component={Link}
                to={ruta}
                sx={{
                  color: '#fff',
                  borderRadius: 0,
                  borderBottom: '2px solid',
                  borderColor: pathname === ruta ? 'secondary.main' : 'transparent',
                }}
              >
                {texto}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento al abrir en móvil.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default Nav;