"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Get types from expreeess -> response, request etc
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.hash(password, 10);
    });
}
function validatePassword(passwordHash, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(plainPassword, passwordHash);
    });
}
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        const passwordHash = yield hashPassword(password);
        const newUser = new userModel_1.default({
            email,
            password: passwordHash,
            role: role || "basic",
        });
        const accessToken = jwt.sign({
            userId: newUser._id,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        newUser.accessToken = accessToken;
        yield newUser.save();
        res.json({
            data: newUser,
            accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = "Invalid Email or Password";
    try {
        const { password, email } = req.body;
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return next(new Error(error));
        }
        // validPassword = await validatePassword(user.password, password);
        const validPassword = "";
        if (!validPassword) {
            return next(new Error(error));
        }
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        yield userModel_1.default.findByIdAndUpdate(user._id, { accessToken });
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletAddress } = req.body;
        //Validate wallet Address
        let user = yield userModel_1.default.findById(walletAddress);
        if (!user) {
            user = new userModel_1.default({
                _id: walletAddress
            });
            user = yield user.save();
        }
        const accessToken = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" });
        yield userModel_1.default.findByIdAndUpdate(user._id, { accessToken });
        res.status(200).json({
            data: user,
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alias: userName, email, withdrawAccount } = req.body;
        const { walletAddress } = req.params;
        const user = userModel_1.default.findByIdAndUpdate({
            walletAddress
        }, { email, userName, withdrawAccount, role: "user" });
        res.status(200).send(user);
    }
    catch (error) {
        next(error);
    }
});
//Validate Address
//ethers.utils.isAddress(address)