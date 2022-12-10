var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _user = require("../../models/userModel");
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
exports.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password, role, walletAddress } = req.body;
        if (!walletAddress || !password) {
            res.status(400).send("Wallet address and password are required!");
        }
        const passwordHash = yield hashPassword(password);
        const newUser = new _user({
            email,
            _id: walletAddress,
            password: passwordHash,
            role: role || "visitor",
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
exports.authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const error = "Invalid Email or Password";
    try {
        const { password, email } = req.body;
        let user = yield _user.findOne({ email });
        if (!user) {
            return next(new Error(error));
        }
        // validPassword = await validatePassword(user.password, password);
        // const validPassword = "";
        // if (!validPassword) {
        //     return next(new Error(error));
        // }
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        yield _user.findByIdAndUpdate(user._id, { accessToken });
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
//Current
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { walletAddress } = req.body;
        //Validate wallet Address
        let currentUser = yield _user.findById(walletAddress);
        if (!currentUser) {
            currentUser = new _user({
                _id: walletAddress
            });
            currentUser = yield currentUser.save();
        }
        const accessToken = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" });
        yield _user.findByIdAndUpdate(currentUser._id, { accessToken });
        res.status(200).json({
            data: currentUser,
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userName, email, withdrawAccount } = req.body;
        const { walletAddress } = req.params;
        if (!userName || !email || !withdrawAccount || !walletAddress) {
            res.status(400).json({
                Status: false,
                Message: "Invalid input"
            });
        }
        try {
            const user = yield _user.findByIdAndUpdate({
                _id: walletAddress
            }, { email, userName, withdrawAccount, role: "user" });
            if (!user) {
                res.status(400).send("Invalid wallet address");
            }
        }
        catch (error) {
            let message = error.message.toLowerCase();
            if (message.includes("duplicate") && message.includes("username"))
                throw new Error("UserName already exists");
            if (message.includes("duplicate") && message.includes("email"))
                throw new Error("Email already exists");
            throw error;
        }
        res.status(200).send("Success");
    }
    catch (error) {
        next(error);
    }
});
//Validate Address
//ethers.utils.isAddress(address)
