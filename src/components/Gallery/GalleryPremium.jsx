import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/pagination";

const images = [
  "/images/004/1.jpeg",
  "/images/004/2.jpeg",
  "/images/004/3.jpeg",
  "/images/004/4.jpeg",
  "/images/004/5.jpeg",
  "/images/004/6.jpeg",
  "/images/004/7.jpeg",
];

const CARD_RATIO = "4 / 3";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const swiperRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        px: 2,
        maxWidth: "1200px",
        mx: "auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Título solo en mobile */}
      <Typography
        variant="h3"
        sx={{
          display: { xs: "block", sm: "none" },
          mb: 4,
          textAlign: "center",
          fontFamily: "'Eyesome'",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Galería
      </Typography>

      {/* MOBILE: carrusel con autoplay */}
      {isMobile ? (
        <Swiper
          modules={[Keyboard, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          keyboard
          slidesPerView={1}
          spaceBetween={16}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{ width: "100%" }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: CARD_RATIO,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "#ffffff",
                }}
                onClick={() => handleOpen(index)}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Imagen ${index + 1}`}
                  loading="lazy"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    display: "block",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // DESKTOP: grilla
        <Grid container spacing={2} justifyContent="center">
          {images.map((src, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: CARD_RATIO,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
                onClick={() => handleOpen(index)}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Imagen ${index + 1}`}
                  loading="lazy"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 3,
                    },
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* MODAL (lightbox) */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", sm: "90%", md: "1000px" },
              mx: "auto",
            }}
          >
            {/* Cerrar */}
            <CloseIcon
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: { xs: 8, sm: 16 },
                right: { xs: 8, sm: 16 },
                fontSize: { xs: 24, sm: 30 },
                color: "#fff",
                cursor: "pointer",
                zIndex: 10000,
                "&:hover": { color: "#d1c4e9" },
              }}
            />

            {/* Flechas: ocultas en mobile para evitar desalineación */}
            <IconButton
              onClick={() => swiperRef.current?.slidePrev()}
              sx={{
                display: { xs: "none", sm: "flex" },
                position: "absolute",
                left: -40,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                zIndex: 10000,
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => swiperRef.current?.slideNext()}
              sx={{
                display: { xs: "none", sm: "flex" },
                position: "absolute",
                right: -40,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                zIndex: 10000,
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            {/* Visor con autoplay (navegación por swipe en mobile) */}
            <Swiper
              initialSlide={startIndex}
              keyboard
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Keyboard, Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              style={{ width: "100%" }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={src}
                    alt={`Slide ${index + 1}`}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "100%", sm: "90vw" },
                      maxHeight: { xs: "80vh", sm: "90vh" },
                      objectFit: "contain",
                      objectPosition: "center",
                      borderRadius: 2,
                      display: "block",
                      mx: "auto",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
