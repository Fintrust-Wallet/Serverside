"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignSchema = void 0;
const mongoose_1 = require("mongoose");
const enumerations_1 = require("./enumerations");
exports.campaignSchema = new mongoose_1.Schema({
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
            return this.campaignType.toLowerCase() === "public";
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
        default: Object.values(enumerations_1.CampaignState)[enumerations_1.CampaignState.Active],
        enum: Object.values(enumerations_1.CampaignState)
    },
    campaignType: {
        type: String,
        required: true,
        enum: Object.values(enumerations_1.CampaignType)
    },
    transactions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Transaction"
        }],
    withrawRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)("Campaign", exports.campaignSchema);
