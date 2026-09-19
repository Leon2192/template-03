import { Box, Typography } from "@mui/material";
import ButtonLinks from "./ButtonLinks/ButtonLInks";

const Confirm = () => {
  return (
    <Box
      sx={{
        minHeight: "40vh",
        py: 8,
        px: 2,
        backgroundColor: "#ffffff",
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
      {/* Contenedor interno */}
      <Box>
        {/* Icono animado */}
        <Box
          component="img"
          src="/images/imagenes/GIFCONFIRM.gif"
          alt="Ceremonia"
          sx={{
            width: 125,
            height: 125,
            mb: 1,
          }}
        />

        {/* Título principal cursiva */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Eyesome'",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            color: "#000000",
            fontWeight: "semibold",
            mb: 2,
          }}
        >
          Confirmación de asistencia
        </Typography>

        {/* Subtítulo más pequeño */}
     

        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Opensans'",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            color: "#000000",
            mb: 1,
          }}
        >
          Esperamos que seas parte de nuestra celebración. ¡Confirmanos tu asistencia!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Opensans'",
            fontWeight:'bold',
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            color: "#000000",
            mb: 4,
          }}
        >
          Solo adultos
        </Typography>


        {/* Botón */}
        <ButtonLinks
          label="Confirmar Asistencia"
          href="https://docs.google.com/forms/d/e/1FAIpQLSc1X9CDWdw_a5VNG33tyXIZm6H2kfEVp3hdjv9HDXxaMi4MrQ/viewform"
          newTab
        />
      </Box>
    </Box>
  );
};

export default Confirm;
