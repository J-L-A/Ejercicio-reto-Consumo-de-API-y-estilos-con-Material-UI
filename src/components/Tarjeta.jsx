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
  // Imagen dinámica basada en el ID del post o fallback
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