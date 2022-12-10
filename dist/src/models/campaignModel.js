"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enumerations_1 = require("./enumerations");
//import { transactionSchema } from "./TransactionModel";
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
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: enumerations_1.CampaignState,
        default: enumerations_1.CampaignState.created
    },
    campaignType: {
        type: enumerations_1.CampaignType,
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
exports.default = (0, mongoose_1.model)("Campaign", exports.campaignSchema);
