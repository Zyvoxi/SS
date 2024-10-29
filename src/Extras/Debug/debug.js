import pino from "pino";

// Constantes para evitar "magic numbers"
const MAX_WORDS_TO_DISPLAY = 5;
const LOG_THROTTLE_TIME = 2000;

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "warn",
  transport: {
    target: "pino-pretty",
  },
});

// Variável para controlar logs recentes
const lastLogMessages = new Map();

const logWithThrottle = (message, ...args) => {
  const currentTime = Date.now();

  // Simplificando a mensagem para comparação
  const simplifiedMessage = message
    .split(" ")
    .slice(0, MAX_WORDS_TO_DISPLAY)
    .join(" ");

  // Verifica se a mensagem foi logada recentemente
  if (
    lastLogMessages.has(simplifiedMessage) &&
    currentTime - lastLogMessages.get(simplifiedMessage).time <
      LOG_THROTTLE_TIME
  ) {
    return; // Ignora o log
  }

  // Atualiza o último log
  lastLogMessages.set(simplifiedMessage, { time: currentTime, message });

  // Exibe o log normalmente
  logger.debug(
    message,
    ...args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)),
  );
};

export const log = {
  debug: logWithThrottle,
};

export default log;
