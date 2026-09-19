import Button from "@mui/material/Button";

export default function ButtonLinks({
  label,
  href,
  onClick,
  newTab = false,
  sx,
  bounce = true,
}) {
  const baseSx = {
    borderRadius: 999,
    px: 4,
    backgroundColor: "#000000", // 🔑 fondo negro
    fontFamily: "'Quicksand'",
    color: "#FFFFFF", // 🔑 texto blanco
    boxShadow: "none",
    transition: "transform .2s ease, background-color .2s ease, color .2s ease",
    ...(bounce && { animation: "bounceBtn 2s infinite" }),
    "@keyframes bounceBtn": {
      "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
      "40%": { transform: "translateY(-6px)" },
      "60%": { transform: "translateY(-3px)" },
    },

    /* Hover: aclaramos un poco el negro */
    "&:hover": {
      backgroundColor: "#333333",
      color: "#FFFFFF",
      transform: "scale(1.05)",
    },

    /* Al presionar vuelve a negro y achica */
    "&:active, &:hover:active": {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      transform: "scale(0.98)",
    },

    /* Focus limpio */
    "&:focus": { outline: "none", boxShadow: "none" },
    "&:focus-visible": {
      outline: "2px solid #FFFFFF",
      outlineOffset: "2px",
    },

    /* Si es <a>, evita cambios por visited */
    "&:visited": { color: "#FFFFFF" },
  };

  const commonProps = {
    variant: "contained",
    sx: [baseSx, sx],
    disableElevation: true,
    disableRipple: true,
    onClick: (e) => {
      onClick?.(e);
      e.currentTarget.blur();
    },
    onMouseUp: (e) => e.currentTarget.blur(),
    onTouchEnd: (e) => e.currentTarget.blur(),
  };

  return href ? (
    <Button
      component="a"
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      style={{ textDecoration: "none" }}
      {...commonProps}
    >
      {label}
    </Button>
  ) : (
    <Button {...commonProps}>{label}</Button>
  );
}
