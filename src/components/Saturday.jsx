import { Box, Slide, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Saturday = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      id="info"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Slide in={inView} direction="up" timeout={800}>
        <Fade in={inView} timeout={1200}>
          {/* 👇 usamos la imagen directamente */}
          <Box
            component="img"
            src="/images/004/domingo.webp"
            alt="Saturday"
            sx={{
              width: "100%",
              height: "auto", // respeta la proporción original
              display: "block",
            }}
          />
        </Fade>
      </Slide>
    </Box>
  );
};

export default Saturday;
