import { Box, Typography, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Qr = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "30vh",
        py: 8,
        px: 2,
        backgroundImage: "url('/images/modificaciones/FONDODRESS.webp')", // 👈 textura de fondo
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Fade in={inView} timeout={800}>
        <Box
          sx={{
            transform: inView ? "scale(1)" : "scale(0.95)",
            transition: "transform 0.6s ease-out",
          }}
        >

          <Box display="flex" justifyContent="center" mb={2}>
            <Box
              component="img"
              src="/images/005/qr2.png"
              alt="Código QR"
              sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Quicksand'",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "#000000",
              mb: 1,
            }}
          >
            Escaneá este QR
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Quicksand'",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#000000",
              mb: 2,
            }}
          >
            ¡Compartí las fotos del evento con los anfitriones!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Quicksand'",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#000000",
              mb: 1,
            }}
          >
            O podés presionar aquí
          </Typography>

          {/* Botón personalizado */}
          <Box mt={2}>
            <Box
              component="a"
              href="https://photos.google.com/share/AF1QipNKlPJpArd3Gwx065v_uAllQsMzaq2Q2rhJ3Sz4NZ5gUwI6BOp9jPpdUKVoecDLPQ?key=YjJ6WGVhMDMzZDQxVVA5by1QSEF4SmZQZU9MT2JR"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-block",
                px: 4,
                py: 1.2,
                borderRadius: "50px",
                backgroundColor: "#000000",
                color: "#ffffff",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: "bold",
                fontSize: "1rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Ir al Álbum
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Qr;
