var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require("../../models/userModel");
//CRUD
exports.getUsers = (_, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield User.find({});
    res.status(200).json({
        data: users,
    });
});
exports.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User.findById(userId);
        if (!user)
            return next(new Error("User does not exist"));
        res.status(200).json({
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        yield User.findByIdAndUpdate(userId, update);
        const user = yield User.findById(userId);
        res.status(200).json({
            data: user,
            message: "User has been updated",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: "User has been deleted",
        });
    }
    catch (error) {
        next(error);
    }
});
