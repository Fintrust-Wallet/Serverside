import mongoose, { Schema } from "mongoose";
import { transactionSchema } from "./TransactionModel";

export const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    _id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    withdrawAccount: {
        type: String,        
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        default: "visitor",
        enum: ["visitor", "user", "admin"],
    },
    accessToken: {
        type: String,
        unique: true,
        trim: true
    },
    totalAmountRaised: {
        type: Number
    },
    totalAmountDonations: {
        type: Number
    },
    totalCampaignsCreated: {
        type: Number
    },
    transactions: [transactionSchema],
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },  
});

export default mongoose.model("User", userSchema);