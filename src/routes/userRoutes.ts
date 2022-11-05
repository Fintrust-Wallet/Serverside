const { Router } = require("express");
const auth = require("../middlewares/auth");
const repo = require("../controller/repository/userRepository");
const services = require("../controller/services/userService");

const userRouter = Router();

userRouter.post("/users", services.login);
userRouter.put("/users/:walletAddress", auth.allowIfLoggedIn, services.updateProfile);

export { userRouter };