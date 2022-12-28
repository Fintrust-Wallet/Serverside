import mongoose, { Schema } from "mongoose";
import { transactionSchema } from "./TransactionModel";
import { Role } from "./enumerations";

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
        default: Object.values(Role)[Role.Visitor],
        enum: Object.values(Role),
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
    transactions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Transaction"
        }]
    },
    campaigns: {
        type: [{
            type: String,
            ref: "Campaign"
        }]
    },
    signatorycampaigns: {
        type: [{
            type: String,
            ref: "Campaign"
        }]
    },    
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