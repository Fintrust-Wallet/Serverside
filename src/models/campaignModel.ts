import mongoose, { Schema, model } from "mongoose";
import { CampaignState, CampaignType } from "./enumerations";
//import { transactionSchema } from "./TransactionModel";

export const campaignSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    media: {
        type: [String],
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    uri: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    signatories: {
        type: [String],
        trim: true
    },
    balance: Number,
    deposited: Number,
    amount: Number,
    withdrawAccount: {
        type: String,
        trim: true
    },
    state: {
        type: CampaignState,
        default: CampaignState.created
    },
    campaignType: {
        type: CampaignType,
        required: true
    },
   // transactions: [transactionSchema],
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
});

export default model("Campaign", campaignSchema);