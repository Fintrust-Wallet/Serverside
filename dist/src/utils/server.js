"use strict";
//import { handleEvents } from "../controller/services/eventhandler";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
const cors = require("cors");
const express = require("express");
const expressPino = require("express-pino-logger");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const logger = require("./logger");
const routes = require("../routes");
const { secrets: { PORT } } = require("../config/env");
const { database } = require("../config/database");
class SetupServer {
    /*
     * same as this.port = port, declaring as private here will
     * add the port variable to the SetupServer instance
     */
    constructor(port = PORT) {
        this.app = express();
        this.port = port;
    }
    /*
     * We use a different method to init instead of using the constructor
     * this way we allow the server to be used in tests and normal initialization
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupExpress();
            this.setupControllers();
            //must be the last
            this.setupErrorHandlers();
        });
    }
    //Step One
    setupExpress() {
        database();
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(expressPino({
            logger,
        }));
        this.app.use(cors({
            origin: "*",
        }));
        this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers["x-access-token"]) {
                const accessToken = req.headers["x-access-token"];
                const { walletAddress, exp } = jwt.verify(accessToken, process.env.JWT_SECRET);
                // Check if token has expired
                if (exp < Date.now().valueOf() / 1000) {
                    return res.status(401).json({
                        error: "JWT token has expired, please login to obtain a new one",
                    });
                }
                res.locals.loggedInUser = yield User.findOne({ walletAddress });
                ;
                next();
            }
            else {
                next();
            }
        }));
    }
    //Step two
    setupControllers() {
        this.app.get("/", (req, res) => res.status(200).send({
            message: "Welcome to Role Based Sytem",
        }));
        this.app.use("/v2.0/api", routes.userroutes);
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
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.server) {
                yield new Promise((resolve, reject) => {
                    this.server.close((err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(true);
                    });
                });
            }
        });
    }
    start() {
        this.server = this.app.listen(this.port || 4001, () => {
            logger.info("Server listening on port: " + this.port);
            //handleEvents();
        });
    }
}
exports.SetupServer = SetupServer;
module.exports = SetupServer;
