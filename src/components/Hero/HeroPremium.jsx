

import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const desktopImage = "/images/imagenes/PORTADA2.webp";
const mobileImage = "/images/imagenes/PORTADA2.webp";

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("No se pudo reproducir el audio:", error);
      });
    }

    setIsPlaying(!isPlaying);
  };

  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundImage: `url(${isMobile ? mobileImage : desktopImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Capa oscura */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1,
        }}
      />

      {/* Contenido principal */}
      {/* Botón de música + Texto */}
      <Box
  sx={{
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 3,
    display: "flex",
    flexDirection: "column", // texto debajo
    alignItems: "center",
    gap: 0.5,
  }}
>
  <IconButton
    onClick={toggleAudio}
    sx={{
      backgroundColor: "rgba(255,255,255,0.7)",
      color: "#000",
      width: 50,
      height: 50,
      borderRadius: "50%",
      boxShadow: 2,
      animation: "bounceMusic 1.5s infinite",
      "@keyframes bounceMusic": {
        "0%, 20%, 50%, 80%, 100%": {
          transform: "translateY(0)",
        },
        "40%": {
          transform: "translateY(-6px)",
        },
        "60%": {
          transform: "translateY(-3px)",
        },
      },
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.9)",
      },
    }}
  >
    {isPlaying ? <PauseIcon /> : <MusicNoteIcon />}
  </IconButton>

  <Typography
    variant="subtitle2"
    sx={{
      color: "#000",
      fontWeight: "bold",
      backgroundColor: "rgba(255,255,255,0.7)",
      px: 1,
      py: 0.3,
      borderRadius: "6px",
      animation: "bounceText 1.5s infinite", // animación
      "@keyframes bounceText": {
        "0%, 20%, 50%, 80%, 100%": {
          transform: "translateY(0)",
        },
        "40%": {
          transform: "translateY(-6px)",
        },
        "60%": {
          transform: "translateY(-3px)",
        },
      },
    }}
  >
    {!isPlaying ? "¡Apretá Play!" : "Pausar audio"}
  </Typography>
</Box>


      {/* Audio element */}
      <audio ref={audioRef} src="/images/imagenes/Efecto.mp3" preload="auto" />

      {/* Flecha animada */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          animation: "bounce 2s infinite",
          fontSize: "3rem",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "40%": {
              transform: "translateX(-50%) translateY(-10px)",
            },
            "60%": {
              transform: "translateX(-50%) translateY(-5px)",
            },
          },
        }}
      >
        <a href="#info" style={{ color: "#000000", textDecoration: "none" }}>
          <KeyboardArrowDownIcon fontSize="inherit" />
        </a>
      </Box>
    </Box>
  );
};

export default Hero;

// import {
//   Box,
//   Button,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import PauseIcon from "@mui/icons-material/Pause";
// import { useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";

// const Hero = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const desktopImage = "/images/004/portadacompu.webp";
//   const mobileImage = "/images/004/portadacelu.webp";

//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false); // inicia en pausa
//   const [showOverlay, setShowOverlay] = useState(true); // overlay de bienvenida

//   const toggleAudio = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.muted = false;
//       audio.play().catch((err) => console.error("Error al reproducir:", err));
//       setIsPlaying(true);
//     }
//   };

//   const handleEnterWithMusic = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.muted = false;
//       audio.play().catch((err) => console.error("Error al reproducir:", err));
//       setIsPlaying(true);
//     }
//     setShowOverlay(false);
//   };

//   const handleEnterWithoutMusic = () => {
//     setIsPlaying(false);
//     setShowOverlay(false);
//   };

//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.2,
//   });

//   return (
//     <Box
//       ref={ref}
//       sx={{
//         position: "relative",
//         height: "100vh",
//         width: "100vw",
//         margin: 0,
//         padding: 0,
//         backgroundImage: `url(${isMobile ? mobileImage : desktopImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         overflow: "hidden",
//       }}
//     >
//       {/* Capa oscura */}
//       {showOverlay && (
//   <Box
//     sx={{
//       position: "absolute",
//       inset: 0,
//       backgroundColor: "rgba(0,0,0,0.4)",
//       zIndex: 1,
//     }}
//   />
// )}

//       {/* Contenido principal */}
//       <Box
//         sx={{
//           zIndex: 2,
//           px: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           transform: inView ? "scale(1)" : "scale(0.95)",
//           transition: "transform 1s ease",
//         }}
//       ></Box>

//       {/* Overlay de bienvenida */}
//       {showOverlay && (
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             zIndex: 5,
//             backgroundColor: "rgba(0,0,0,0.85)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 3,
//             color: "#fff",
//             textAlign: "center",
//             px: 2,
//           }}
//         >
//           <Typography variant="h5" sx={{ mb: 2 }}>
//             Bienvenidos ✨
//           </Typography>
//           <Button
//   variant="contained"
//   onClick={handleEnterWithMusic}
//   startIcon={<MusicNoteIcon />}
//   sx={{
//     px: 4,
//     py: 1.5,
//     fontSize: "1rem",
//     backgroundColor: "#849CDD",
//     "&:hover": {
//       backgroundColor: "#6f86c5", // tono más oscuro para hover
//     },
//   }}
// >
//   Ingresar con Audio
// </Button>

// <Button
//   variant="contained"
//   onClick={handleEnterWithoutMusic}
//   startIcon={<MusicNoteIcon />}
//   sx={{
//     px: 4,
//     py: 1.5,
//     fontSize: "1rem",
//     backgroundColor: "#849CDD",
//     "&:hover": {
//       backgroundColor: "#6f86c5", // mismo hover
//     },
//   }}
// >
//   Ingresar sin Audio
// </Button>

//         </Box>
//       )}

//       {/* Botón de música */}
//       {!showOverlay && (
//         <IconButton
//           onClick={toggleAudio}
//           sx={{
//             position: "absolute",
//             top: 20,
//             right: 20,
//             zIndex: 3,
//             backgroundColor: "rgba(255,255,255,0.7)",
//             color: "#000",
//             width: 50,
//             height: 50,
//             borderRadius: "50%",
//             boxShadow: 2,
//             animation: "bounceMusic 1.5s infinite",
//             "@keyframes bounceMusic": {
//               "0%, 20%, 50%, 80%, 100%": {
//                 transform: "translateY(0)",
//               },
//               "40%": {
//                 transform: "translateY(-6px)",
//               },
//               "60%": {
//                 transform: "translateY(-3px)",
//               },
//             },
//             "&:hover": {
//               backgroundColor: "rgba(255,255,255,0.9)",
//             },
//           }}
//         >
//           {isPlaying ? <PauseIcon /> : <MusicNoteIcon />}
//         </IconButton>
//       )}

//       {/* Audio element */}
//       <audio ref={audioRef} src="/images/004/song.mp3" preload="auto" loop muted />

//       {/* Flecha animada */}
//       {!showOverlay && (
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 5,
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 2,
//             animation: "bounce 2s infinite",
//             fontSize: "3rem",
//             "@keyframes bounce": {
//               "0%, 20%, 50%, 80%, 100%": {
//                 transform: "translateX(-50%) translateY(0)",
//               },
//               "40%": {
//                 transform: "translateX(-50%) translateY(-10px)",
//               },
//               "60%": {
//                 transform: "translateX(-50%) translateY(-5px)",
//               },
//             },
//           }}
//         >
//           <a href="#info" style={{ color: "#fff", textDecoration: "none" }}>
//             <KeyboardArrowDownIcon fontSize="inherit" />
//           </a>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Hero;