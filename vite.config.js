import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import selfsigned from "selfsigned";

function createCertificate() {
  const attrs = [{ name: "commonName", value: "localhost" }];
  const options = { days: 365, keySize: 2048, algorithm: "sha256" };
  const { private: key, cert } = selfsigned.generate(attrs, options);
  return { key, cert };
}

export default defineConfig({
  plugins: [react()],
  base: "/SS",
  server: {
    https: createCertificate(),
  },
});
