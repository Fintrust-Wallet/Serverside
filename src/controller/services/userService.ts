import User from "../../models/userModel"
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
        const { email, password, role } = req.body;
        const passwordHash = await hashPassword(password);

        const newUser = new User({
            email,
            password: passwordHash,
            role: role || "basic",
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

        let user = await User.findOne({ email });

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

        await User.findByIdAndUpdate(user._id, { accessToken });

        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { walletAddress } = req.body;
//Validate wallet Address
        let user = await User.findById(walletAddress);
        if (!user) {
            user = new User({
                _id : walletAddress                
            });
            user = await user.save();
        }   

        const accessToken = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" })        
        await User.findByIdAndUpdate(user._id, { accessToken });

        res.status(200).json({
            data: user,
            accessToken,
        });       

    } catch (error) {
        next(error);
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const { alias: userName, email, withdrawAccount } = req.body;
        const { walletAddress } = req.params;

        const user = User.findByIdAndUpdate({
            walletAddress
        }, { email, userName, withdrawAccount, role : "user" });

        res.status(200).send(user);

    } catch (error) {
        next(error)
    }
}

//Validate Address
//ethers.utils.isAddress(address)