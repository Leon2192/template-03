import { Box, Typography, Slide, Button } from "@mui/material";
import { useInView } from "react-intersection-observer";

const InfoEvent = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const mapsUrl =
    "https://www.google.com/maps/place/Parroquia+San+Francisco+Solano/@-27.4625881,-58.8351533,17z/data=!3m1!4b1!4m6!3m5!1s0x94456ca5f9173f77:0x5cb01a00561675f!8m2!3d-27.4625881!4d-58.8351533!16s%2Fg%2F1tf76lvx?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "60vh", md: "80vh" }, // altura visible
        backgroundColor: "#ffffff", // fondo blanco
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
       
      }}
    >
      <Slide in={inView} direction="up" timeout={800}>
        <Box sx={{ maxWidth: { xs: "300px", md: "360px" } }}>
          {/* 🌿 GIF centrado arriba */}
          <Box
            component="img"
            src="/images/imagenes/GIFCELEBRACION.gif" // ← reemplazá por tu gif real
            alt="Ceremonia"
            sx={{
              width: 125,
              height: 125,
              mb: 2,
            }}
          />

          {/* Título */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Eyesome'",
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "#000000",
              fontWeight: 600,
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Ceremonia
          </Typography>

          {/* Fecha */}
          <Typography
            sx={{
              mb: 1.5,
              fontFamily: "'Opensans', serif",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#000000",
              fontWeight: "bold",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            Sábado 16 de mayo de 2026
          </Typography>

          {/* Hora */}
          <Typography
            sx={{
              mb: 1.5,
              fontFamily: "'Opensans', serif",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#000000",
              fontWeight: "bold",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            20:45 hs
          </Typography>

          {/* Dirección */}
          <Typography
            sx={{
              mb: 1.5,
              fontFamily: "'Opensans', serif",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#000000",
              fontWeight: "bold",
              lineHeight: 1.3,
            }}
          >
            Parroquia San Francisco Solano
          </Typography>

          <Typography
            sx={{
              mb: 1.5,
              fontFamily: "'Opensans', serif",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#000000",
              fontWeight: "bold",
              lineHeight: 1.3,
            }}
          >
            Mendoza 468 - Corrientes
          </Typography>

          {/* Botón */}
          <Button
            variant="contained"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 1.5,
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "50px",
              px: 2,
              py: 1,
              fontFamily: "'Opensans', serif",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#333333" },
            }}
          >
            CÓMO LLEGAR
          </Button>
        </Box>
      </Slide>
    </Box>
  );
};

export default InfoEvent;
