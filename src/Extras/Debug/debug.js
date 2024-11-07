import pino from "pino";

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

  const simplifiedMessage = message.split(" ").slice(0, 5).join(" ");

  if (
    lastLogMessages.has(simplifiedMessage) &&
    currentTime - lastLogMessages.get(simplifiedMessage).time < 2000
  ) {
    return;
  }

  lastLogMessages.set(simplifiedMessage, { time: currentTime, message });

  const processedArgs = args.map((arg) =>
    typeof arg === "object" ? JSON.stringify(arg) : arg,
  );
  logger.debug(message, ...processedArgs);
};

export const log = {
  debug: logWithThrottle,
};

export default log;
