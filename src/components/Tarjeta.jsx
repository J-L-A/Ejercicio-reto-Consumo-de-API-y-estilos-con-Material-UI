import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Tarjeta({
  id,
  titulo,
  cuerpo,
  imagen,
  nombreUsuario,
  correo,
}) {
  // Imagen basada en el ID del post (o la que se envíe por props)
  const imagenUrl = imagen || `https://picsum.photos/seed/${id || 1}/400/200`;
  const encabezado = titulo || nombreUsuario || 'Sin título';

  return (
    <Card sx={{ maxWidth: 345, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" alt={encabezado} height="140" image={imagenUrl} />
      <CardContent sx={{ flexGrow: 1 }}>
        {id && (
          <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
            Post #{id}
          </Typography>
        )}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textTransform: 'capitalize' }}
        >
          {encabezado}
        </Typography>
        {correo && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {correo}
          </Typography>
        )}
        {cuerpo && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {cuerpo}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Compartir</Button>
        <Button size="small">Ver más</Button>
      </CardActions>
    </Card>
  );
}