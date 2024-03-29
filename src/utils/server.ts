import { handleEvents } from "../controller/services/eventhandler";

const cors = require("cors");
const express = require("express");
const expressPino = require("express-pino-logger");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
import User from "../models/userModel";

const logger = require("./logger");
const routes = require("../routes");
const { secrets: { PORT } } = require("../config/env");
const { database } = require("../config/database");

export class SetupServer {
    app = express();
    server;
    port: number;

    /*
     * same as this.port = port, declaring as private here will
     * add the port variable to the SetupServer instance
     */
    constructor(port = PORT) {
        this.port = port;
    }

    /*
     * We use a different method to init instead of using the constructor
     * this way we allow the server to be used in tests and normal initialization
     */
    async init() {
        this.setupExpress();
        this.setupControllers();

        //must be the last
        this.setupErrorHandlers();
    }

    //Step One
    setupExpress() {
        database();
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(
            expressPino({
                logger,
            })
        );
        this.app.use(
            cors({
                origin: "*",
            })
        );
        this.app.use(async (req, res, next) => {
            if (req.headers["x-access-token"]) {
                const accessToken: string = req.headers["x-access-token"];
                const { walletAddress, exp } = jwt.verify(accessToken, process.env.JWT_SECRET);

                // Check if token has expired
                if (exp < Date.now().valueOf() / 1000) {
                    return res.status(401).json({
                        error: "JWT token has expired, please login to obtain a new one",
                    });
                }
                res.locals.loggedInUser = await User.findOne({ _id: walletAddress });
                next();
            } else {
                next();
            }
        });
    }

    //Step two
    setupControllers() {
        this.app.get("/", (req, res) =>
            res.status(200).send({
                message: "Welcome to Fintrust API",
            })
        );
        this.app.use("/v2.0/api", routes.userroutes);
        this.app.use("/v2.0/api", routes.campaignroutes.default); //I exported this as an es6 module

        this.app.all("*", (req, res) => res.send({ message: "route not found" }));
    }

    setupErrorHandlers() {
        this.app.use((err, _, res, __) => {
            if (err.name === "HttpError") {
                return res.status(500).json({ success: false, error: err.name });
            }
            res
                .status(500)
                .json({ success: false, error: `An error occurred\n ${err.message}` });
        });
    }

    getApp() {
        return this.app;
    }

    async close() {
        if (this.server) {
            await new Promise((resolve, reject) => {
                this.server.close((err) => {
                    if (err) {
                        logger.error(err);
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        }
    }

    start() {
        this.server = this.app.listen(this.port || 4001, '0.0.0.0', async () => {
            logger.info("Server listening on port: " + this.port);
            await handleEvents();
        });
    }
}


module.exports = SetupServer;
