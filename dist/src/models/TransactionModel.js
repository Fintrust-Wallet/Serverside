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
exports.transactionSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enumerations_1 = require("./enumerations");
const userModel_1 = require("./userModel");
exports.transactionSchema = new mongoose_1.Schema({
    user: {
        type: userModel_1.userSchema,
        required: true,
        trim: true
    },
    // campaign: {
    //     type: campaignSchema,
    //     required: true,
    //     trim: true
    // },
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    type: {
        type: enumerations_1.TransactionType,
        default: enumerations_1.TransactionType.donate
    },
    amount: Number,
    state: {
        type: enumerations_1.TransactionState,
        default: enumerations_1.TransactionState.pending
    },
    token: {
        type: enumerations_1.Token,
        default: enumerations_1.Token.Matic
    },
    network: {
        type: enumerations_1.Network,
        default: enumerations_1.Network.Polygon
    }
});
exports.default = mongoose_1.default.model("Transaction", exports.transactionSchema);
