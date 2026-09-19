# Coti & Nico · Invitación PWA

Invitación de casamiento en React y Material UI, compilada con Vite.

## Desarrollo y publicación

Requiere Node.js 20.19+ o 22.12+.

```sh
npm ci
npm run dev
```

Para publicar en la raíz de un dominio HTTPS, copiar `.env.example` a `.env.local`
y cambiar `VITE_SITE_URL` por la URL pública real. Esta variable permite generar
las direcciones absolutas de las miniaturas de WhatsApp/redes y la URL canónica.
Sin ella, las imágenes usan rutas relativas al dominio; algunos servicios de
vista previa necesitan la URL absoluta. No contiene secretos.

```sh
npm run build
npm run preview
```

Publicar el contenido de `dist/`. Servir `sw.js` e `index.html` con revalidación
(`Cache-Control: no-cache`) para permitir actualizaciones. El service worker y
la instalación funcionan con HTTPS o localhost. El modo desarrollo no registra
el service worker; verificar la PWA con la compilación de producción.

## Instalación y modo sin conexión

- En navegadores que emiten `beforeinstallprompt`, aparece un aviso luego de
  cinco segundos. El botón Instalar abre la confirmación nativa del navegador.
- En iPhone/iPad, el aviso explica cómo agregar la invitación desde Safari.
- “Ahora no” o rechazar el diálogo nativo oculta el aviso durante siete días.
- Al abrir la aplicación instalada no se muestra el aviso. iOS no permite
  detectar desde una pestaña normal si ya existe otra instalación.
- Se guardan la página, fuentes e imágenes después de la primera visita y de
  que termine de instalarse el service worker. Maps y Google Forms necesitan
  conexión. El audio se almacena cuando se descarga completo bajo el control
  del service worker; no se garantiza en la primera visita sin conexión.

## Íconos y miniaturas

`public/images/imagenes/MINI.png` es el diseño original. Para regenerar los
íconos de 192 y 512 px, el ícono maskable con margen seguro, el ícono Apple de
180 px, favicon de 32 px y la miniatura social de 1200 × 630 px:

```sh
npm run assets:pwa
```

Los resultados se guardan en `public/icons/` y `public/social-preview.png`.
No se modifica el original. Portada y agradecimiento usan `contain` para
mostrar las imágenes completas en celular y escritorio.

## Verificación

```sh
npm run lint
npm run build
npm run test:e2e
```

Las pruebas usan Google Chrome instalado (`channel: chrome`). Comprueban
manifest, recursos, carga sin conexión, aviso de instalación, cancelación,
instrucciones de iPhone y ajuste de portada. Los eventos de instalación y la
identificación de iPhone se simulan: la instalación real debe verificarse en
los dispositivos de destino una vez publicado el sitio con HTTPS.
