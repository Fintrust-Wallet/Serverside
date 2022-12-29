const pino = require("pino");
module.exports = pino({
    enabled: true,
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: { //Change the level to its string value
        level: label => {
            return {
                level: label
            }
        },
        
    },   
}, 
pino.destination(`${__dirname}/logs.csv`));