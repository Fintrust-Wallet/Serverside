"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignSchema = void 0;
const mongoose_1 = require("mongoose");
const enumerations_1 = require("./enumerations");
const TransactionModel_1 = require("./TransactionModel");
const userModel_1 = require("./userModel");
exports.campaignSchema = new mongoose_1.Schema({
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
    creator: {
        type: userModel_1.userSchema,
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
        type: enumerations_1.CampaignState,
        default: enumerations_1.CampaignState.created
    },
    type: {
        type: enumerations_1.CampaignType,
        required: true
    },
    transactions: [TransactionModel_1.transactionSchema],
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date
    },
});
exports.default = (0, mongoose_1.model)("Campaign", exports.campaignSchema);
