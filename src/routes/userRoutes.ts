const { Router } = require("express");
const auth = require("../middlewares/auth");
const repo = require("../controller/repository/userRepository");
const services = require("../controller/services/userService");

const userRouter = Router();

userRouter.post("/login", services.login);
userRouter.put("/:walletAddress", auth.allowIfLoggedIn, services.updateProfile);

module.exports = userRouter;