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
        trim: true,        
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
        type: String,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: Date.now().toLocaleString()
    },  
});

export default mongoose.model("User", userSchema);