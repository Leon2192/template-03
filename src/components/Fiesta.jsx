import { Box, Typography, Slide, Button } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Fiesta = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const mapsUrl =
    "https://www.google.com/maps/place/Espacio+Andes/@-27.5100255,-58.810316,17z/data=!3m1!4b1!4m6!3m5!1s0x94456beb49fd5c7b:0x69776977c2cfd670!8m2!3d-27.5100255!4d-58.810316!16s%2Fg%2F11hcsqphlz?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "60vh", md: "80vh" },
        backgroundColor: "#ffffff", // fondo blanco
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      
      }}
    >
      <Slide in={inView} direction="up" timeout={800}>
        <Box sx={{ maxWidth: { xs: "300px", md: "360px" } }}>
          {/* 🎉 GIF arriba del todo */}
          <Box
            component="img"
            src="/images/imagenes/GIFFIESTA.gif" // cambia esta ruta por tu gif
            alt="Fiesta"
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
            Fiesta
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
            Luego de la ceremonia
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
            Espacio Andes
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
            Av. Maipú 3841 - Corrientes
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

export default Fiesta;
