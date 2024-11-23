/* global __dirname */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compression from "vite-plugin-compression";
import selfsigned from "selfsigned";
import fs from "fs";
import path from "path";

const certPath = path.join(__dirname, "localhost.crt");
const keyPath = path.join(__dirname, "localhost.key");

function generateAndSaveCertificate() {
  const attrs = [{ name: "commonName", value: "localhost" }];
  const options = { days: 31, keySize: 2048, algorithm: "sha256" };

  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    const { private: key, cert } = selfsigned.generate(attrs, options);

    fs.writeFileSync(certPath, cert);
    fs.writeFileSync(keyPath, key);
  }
}

generateAndSaveCertificate();

export default defineConfig({
  plugins: [
    react({ plugins: [["@swc/plugin-styled-components", {}]] }),
    compression({
      algorithm: "brotliCompress",
    }),
  ],
  base: "/topskill",
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
  },
  build: {
    target: "ES2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("src/Extras/users.json")) {
            return "users";
          }
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          if (id.indexOf("react") !== -1) {
            return;
          }
        },
      },
    },
  },
});
