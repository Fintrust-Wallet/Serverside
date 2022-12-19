import mongoose, { Schema, model } from "mongoose";
import { CampaignState, CampaignType } from "./enumerations";

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
        trim: true,
        unique: true
    },
    media: {
        type: [String],
        required: false
    },
    userId: {
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
        type: [{
            _id: {
                type: String,
                trim: true,
                ref: "User"
            }
        }],
        required: function () {
            return this.campaignType.toLowerCase() === "public"
        }
    },
    balance: Number,
    deposited: Number,
    amount: Number,
    IsWithdrawRequested: Boolean,
    withdrawAccount: {
        type: String,
        trim: true
    },
    state: {
        type: String,        
        default: Object.values(CampaignState)[CampaignState.Active],
        enum: Object.values(CampaignState)
    },
    campaignType: {
        type: String,
        required: true,
        enum: Object.values(CampaignType)
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    withrawRequests: [{
        type: Schema.Types.ObjectId,
        ref: "WithdrawRequest"
    }],
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