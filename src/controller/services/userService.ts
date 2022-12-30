import User from "../../models/userModel";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Get types from expreeess -> response, request etc

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function validatePassword(passwordHash, plainPassword) {
    return await bcrypt.compare(plainPassword, passwordHash);
}

//Login
exports.login = async (req, res, next) => {
    try {
        console.log(User, "USER")
        const { walletAddress } = req.body;
        //Validate wallet Address
        let currentUser = await User.findById(walletAddress);

        if (!currentUser) {
            currentUser = new User({
                _id: walletAddress
            });
            currentUser = await currentUser.save();
        }

        const accessToken = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" })
        await User.findByIdAndUpdate(currentUser._id, { accessToken });

        res.status(200).json({
            data: currentUser,
            newToken: accessToken,
        });

    } catch (error) {
        next(error);
    }
}

//Verification
exports.updateProfile = async (req, res, next) => {
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
            const user = await User.findByIdAndUpdate({
                _id: walletAddress
            }, { email, userName, withdrawAccount, role: "user" });

            if (!user) {
                res.status(400).json({
                    Status: false,
                    Message: "Invalid wallet address"
                });
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

        res.status(200).json({
            Status: true,
            Message: "User details updated"
        });

    } catch (error) {
        next(error)
    }
}

//Validate Address
//ethers.utils.isAddress(address)