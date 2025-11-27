import React, { useState } from "react";

type SafeImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackColor?: string;
};

export function SafeImg({
  fallbackColor = "#111",
  className,
  style,
  loading,        // ⬅️ tomamos loading desde props
  ...imgProps
}: SafeImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: fallbackColor,
        overflow: "hidden",
        ...style,
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#ccc",
          }}
        >
          Cargando…
        </div>
      )}

      {!error && (
        <img
          {...imgProps}
          loading={loading ?? "lazy"}  // ⬅️ si no pasas nada, será lazy
          onLoad={(e) => {
            setLoaded(true);
            imgProps.onLoad?.(e);
          }}
          onError={(e) => {
            setError(true);
            imgProps.onError?.(e);
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: loaded ? "block" : "none",
          }}
        />
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#f87171",
          }}
        >
          Error al cargar
        </div>
      )}
    </div>
  );
}
