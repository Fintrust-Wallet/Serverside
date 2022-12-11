const _user = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Get types from expreeess -> response, request etc

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function validatePassword(passwordHash, plainPassword) {
    return await bcrypt.compare(plainPassword, passwordHash);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role, walletAddress } = req.body;

        if (!walletAddress || !password) {
            res.status(400).send("Wallet address and password are required!")
        }
        const passwordHash = await hashPassword(password);

        const newUser = new _user({
            email,
            _id: walletAddress,
            password: passwordHash,
            role: role || "visitor",
        });

        const accessToken = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        newUser.accessToken = accessToken;
        await newUser.save();

        res.json({
            data: newUser,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};

exports.authenticate = async (req, res, next) => {
    const error = "Invalid Email or Password";
    try {
        const { password, email } = req.body;

        let user = await _user.findOne({ email });

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

        await _user.findByIdAndUpdate(user._id, { accessToken });

        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};

//Current
exports.login = async (req, res, next) => {
    try {
        const { walletAddress } = req.body;
        //Validate wallet Address
        let currentUser = await _user.findById(walletAddress);
       
        if (!currentUser) {
            currentUser = new _user({
                _id: walletAddress
            });
            currentUser = await currentUser.save();
        }

        const accessToken = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" })
        await _user.findByIdAndUpdate(currentUser._id, { accessToken });

        res.status(200).json({
            data: currentUser,
            newToken : accessToken,
        });

    } catch (error) {
        next(error);
    }
}

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
            const user = await _user.findByIdAndUpdate({
                _id: walletAddress
            }, { email, userName, withdrawAccount, role: "user" });

            if (!user){
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