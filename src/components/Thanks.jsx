import { Box, useMediaQuery, useTheme } from "@mui/material";

const Thanks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const desktopImage = "/images/imagenes/GRACIAS2.png";
  const mobileImage = "/images/imagenes/GRACIAS2.png";

  return (
    <Box
      sx={{
        position: "relative",
        height: "50vh",
        m: 0,
        p: 0,
        backgroundImage: `url(${isMobile ? mobileImage : desktopImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Color de fondo para “letterboxing” cuando usamos contain
        backgroundColor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Capa opcional (por ahora transparente) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "transparent", 
          zIndex: 1,
        }}
      />

      {/* Contenido principal */}
      <Box
        sx={{
          zIndex: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "transform 1s ease",
        }}
      >
      </Box>
    </Box>
  );
};

export default Thanks;
