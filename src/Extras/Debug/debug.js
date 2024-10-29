// src/utils/pinoLogger.js
import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "warn",
  transport: {
    target: "pino-pretty", // Para um formato de log mais legível
  },
});

export default logger;
