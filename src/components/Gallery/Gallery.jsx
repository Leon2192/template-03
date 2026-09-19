import { Box, Grid, Typography, Modal, Fade } from "@mui/material";
import { useState } from "react";

const images = [
  "/images/test.jpeg",
  "/images/images.jpeg",
  "/images/test2.jpeg",
  "/images/test4.jpeg",
  "/images/test5.jpeg",
  "/images/test6.jpeg",
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Galería
      </Typography>

      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Box
              component="img"
              src={src}
              alt={`Galería ${index + 1}`}
              onClick={() => handleOpen(src)}
              sx={{
                width: "100%",
                height: 250,
                objectFit: "cover",
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
  <Fade in={open}>
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* Botón de cierre */}
      <Box
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 30,
          cursor: "pointer",
          fontSize: "2rem",
          color: "#fff",
          zIndex: 10000,
          "&:hover": {
            color: "#d1c4e9",
          },
        }}
        aria-label="Cerrar imagen"
      >
        ✖
      </Box>

      {/* Imagen ampliada */}
      {selectedImage && (
        <Box
          component="img"
          src={selectedImage}
          alt="Imagen ampliada"
          sx={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: 5,
          }}
        />
      )}
    </Box>
  </Fade>
</Modal>

    </Box>
  );
};

export default Gallery;
