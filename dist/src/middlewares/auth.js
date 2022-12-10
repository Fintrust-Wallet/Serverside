var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { roles } = require("../controller/repository/rolesRepository");
exports.grantAccess = (action, resource) => {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(403).json({
                    error: "Forbidden",
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.allowIfLoggedIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = res.locals.loggedInUser;
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
