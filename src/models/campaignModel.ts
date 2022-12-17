import mongoose, { Schema, model } from "mongoose";
import { CampaignState, CampaignType } from "./enumerations";
import { transactionSchema } from "./TransactionModel";

export const campaignSchema = new Schema({
    _id: {
        type: String,       
        trim: true        
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
       // type: mongoose.Schema.Types.ObjectId,
        type: String,
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
        type: Number,
        default: CampaignState.created,
        enum: CampaignState
    },
    campaignType: {
        type: Number,
        required: true,
        enum: CampaignType
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

export default model("Campaign", campaignSchema);