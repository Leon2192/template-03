import { Box, Grid, Typography, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ py: 6, px: 2, backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Columna izquierda */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
            ¿Te gustó nuestro demo?
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            ¡Contactanos! Trabajamos desde Argentina al mundo.
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <WhatsAppIcon sx={{ fontSize: 20, color: "#4caf50", mr: 1 }} />
            <Link
              href="https://wa.me/541127682286"
              target="_blank"
              underline="none"
              sx={{ color: "#009688", fontWeight: 500 }}
            >
              ¡Envíanos un Whatsapp!
            </Link>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon sx={{ fontSize: 20, color: "text.secondary", mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              +54 11 35939460 | +54 11 21650320
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ fontSize: 20, color: "text.secondary", mr: 1 }} />
            <Link href="mailto:lacasadeldetalle@gmail.com" underline="none" sx={{ color: "#009688", fontWeight: 500 }}>
              contacto.lacasadeldetalle@gmail.com
            </Link>
          </Box>
        </Grid>

        {/* Columna derecha */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
            Seguinos en Instagram
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Para ver ejemplos de nuestro trabajo y enterarte de todas nuestras novedades.
          </Typography>
          <Box display="flex" alignItems="center">
            <InstagramIcon sx={{ fontSize: 20, color: "text.secondary", mr: 1 }} />
            <Link
              href="https://instagram.com/lacasadeldetalle_arg"
              target="_blank"
              underline="none"
              sx={{ color: "#009688", fontWeight: 500 }}
            >
              La casa del detalle
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
