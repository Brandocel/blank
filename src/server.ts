// src/server.ts
import "dotenv/config";                  // 👈 carga .env automático
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact";

const app = express();

// ✅ CORS: permite peticiones desde tu front en Vite
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost",
    ],
  })
);

// ✅ Para JSON
app.use(express.json());

// ✅ Rutas
app.use("/api", contactRouter); // -> POST http://localhost:3000/api/contact

// Ruta sencilla para probar que el server está vivo
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
