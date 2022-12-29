const pino = require("pino");
console.log(__dirname, "DIER");
module.exports = pino({
    enabled: true,
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: {
        level: label => {
            return {
                level: label
            };
        },
    },
}, pino.destination(`${__dirname}/logs.csv`));
