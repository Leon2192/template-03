import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./App.css";

import Hero from "./components/Hero/HeroPremium";
import Countdown from "./components/CountDown/CountDownPremium";
import InfoEvent from "./components/InfoEvent";
import Gift from "./components/Gift";
import Confirm from "./components/Confirm";
import Dresscode from "./components/Dresscode";
import SuggestSong from "./components/SugerirCancion";
import Qr from "./components/QR";
import Thanks from "./components/Thanks";
import Fiesta from "./components/Fiesta";


function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        background: "#ffffff",
        color: "#fff",
      }}
    >
      <Box
        component="img"
        src="/images/imagenes/logo.png"
        alt="Logo"
        sx={{
          width: 175,
          height: "auto",
          mb: 2,
        }}
      />

      <CircularProgress sx={{ color: "#536449", }} />
      {/* Texto */}
      <Typography sx={{ fontFamily: "'Prata', serif", color: "#536449", }}>Cargando…</Typography>
    </Box>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Hero />
      <InfoEvent />
      <Fiesta />
      <Confirm />
      <Gift />
      <Thanks/>
    </>
  );
}

export default App;
