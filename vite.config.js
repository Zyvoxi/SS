import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./localhost-key.pem"), // Caminho para a chave privada
      cert: fs.readFileSync("./localhost-cert.pem"), // Caminho para o certificado
    },
  },
});
