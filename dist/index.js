var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = require("./src/utils/logger");
const { env } = require("./src/config");
const SetupServer = require("./src/utils/server");
const { PORT } = env;
const ExitStatus = {
    Failure: 1,
    Success: 0,
};
// If there is an unhandled exception,
// lets throw the error and let the uncaughtException handle below handle it
process.on("unhandledRejection", (reason, promise) => {
    logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
    throw reason;
});
//Catch any uncaught exceptions and exit the process
process.on("uncaughtException", (error) => {
    logger.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
});
//Try to setup, initialize and start the server
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = new SetupServer(PORT);
        yield server.init();
        yield server.start();
        const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
        for (const exitSignal of exitSignals) {
            process.on(exitSignal, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield server.close();
                    logger.info(`App exited with success`);
                    process.exit(ExitStatus.Success);
                }
                catch (error) {
                    logger.error(`App exited with error: ${error}`);
                    process.exit(ExitStatus.Failure);
                }
            }));
        }
    }
    catch (error) {
        logger.error(`App exited with error: ${error}`);
        process.exit(ExitStatus.Failure);
    }
}))();
