"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignSchema = void 0;
const mongoose_1 = require("mongoose");
const enumerations_1 = require("./enumerations");
const TransactionModel_1 = require("./TransactionModel");
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
        default: enumerations_1.CampaignState.created,
        enum: enumerations_1.CampaignState
    },
    campaignType: {
        type: Number,
        required: true,
        enum: enumerations_1.CampaignType
    },
    transactions: [TransactionModel_1.transactionSchema],
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
