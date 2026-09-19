import { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Paper, Typography,
} from '@mui/material';

const DISMISSED_KEY = 'invitation-install-dismissed';
const REMIND_AFTER = 7 * 24 * 60 * 60 * 1000;

function recentlyDismissed() {
  try {
    const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY));
    return dismissedAt > 0 && Date.now() - dismissedAt < REMIND_AFTER;
  } catch {
    return false;
  }
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

function isAppleMobile() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [installed, setInstalled] = useState(isStandalone);
  const [dismissed, setDismissed] = useState(recentlyDismissed);
  const [ready, setReady] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [error, setError] = useState('');
  const appleMobile = isAppleMobile();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 5000);
    const displayMode = window.matchMedia('(display-mode: standalone)');
    const capturePrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    const markInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setInstructions(false);
    };
    const handleDisplayMode = () => setInstalled(isStandalone());
    window.addEventListener('beforeinstallprompt', capturePrompt);
    window.addEventListener('appinstalled', markInstalled);
    displayMode.addEventListener('change', handleDisplayMode);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', capturePrompt);
      window.removeEventListener('appinstalled', markInstalled);
      displayMode.removeEventListener('change', handleDisplayMode);
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setInstructions(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      // La invitación también funciona si el navegador bloquea el almacenamiento.
    }
  };

  const install = async () => {
    if (!installEvent) {
      setInstructions(true);
      return;
    }
    setInstalling(true);
    setError('');
    try {
      await installEvent.prompt();
      const { outcome } = await installEvent.userChoice;
      setInstallEvent(null);
      if (outcome === 'accepted') setInstalled(true);
      else dismiss();
    } catch {
      setInstallEvent(null);
      setError('Podés instalar la invitación desde el menú de tu navegador.');
    } finally {
      setInstalling(false);
    }
  };

  if (!ready || installed || dismissed || (!installEvent && !appleMobile && !error)) return null;

  return (
    <>
      <Paper
        component="aside"
        role="region"
        aria-label="Instalar invitación"
        elevation={8}
        sx={{
          position: 'fixed', zIndex: 1200,
          bottom: 'max(16px, env(safe-area-inset-bottom))',
          left: { xs: 12, sm: 'auto' }, right: { xs: 12, sm: 24 },
          width: { sm: 360 }, p: 2.5, borderRadius: 3,
          border: '1px solid #e8e8e8', bgcolor: '#ffffff', color: '#242424',
          maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box component="img" src="/icons/icon-192.png" alt="" width={64} height={64}
            sx={{ borderRadius: 2, flexShrink: 0, objectFit: 'contain' }} />
          <Box>
            <Typography component="h2" sx={{ fontFamily: 'Prata, serif', fontSize: '1.1rem', mb: 0.5 }}>
              ¿Guardamos la invitación?
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              Agregala a tu pantalla de inicio para tener los detalles siempre a mano.
            </Typography>
          </Box>
        </Box>
        {error && <Typography role="status" sx={{ mt: 2, fontSize: '0.9rem' }}>{error}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Button onClick={dismiss} disabled={installing} sx={{ color: '#555', textTransform: 'none' }}>
            Ahora no
          </Button>
          {!error && <Button onClick={install} disabled={installing} variant="contained"
            sx={{ bgcolor: '#242424', borderRadius: 10, px: 3, textTransform: 'none', '&:hover': { bgcolor: '#444' } }}>
            {installing ? 'Abriendo…' : appleMobile && !installEvent ? 'Cómo instalar' : 'Instalar'}
          </Button>}
        </Box>
      </Paper>
      <Dialog open={instructions} onClose={() => setInstructions(false)} aria-labelledby="install-instructions-title">
        <DialogTitle id="install-instructions-title">Guardá la invitación en tu iPhone o iPad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Abrí esta invitación en Safari y seguí estos pasos:
          </DialogContentText>
          <Box component="ol" sx={{ pl: 3, lineHeight: 1.8 }}>
            <li>Tocá Compartir (el cuadrado con una flecha hacia arriba).</li>
            <li>Elegí “Agregar a pantalla de inicio”.</li>
            <li>Si aparece “Abrir como app”, dejalo activado y tocá “Agregar”.</li>
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={dismiss} sx={{ color: '#242424' }}>Entendido</Button></DialogActions>
      </Dialog>
    </>
  );
}
