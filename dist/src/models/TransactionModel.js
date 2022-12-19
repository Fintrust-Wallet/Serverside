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
exports.transactionSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
        trim: true
    },
    campaign: {
        type: String,
        ref: "Campaign",
        required: true,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
        default: Date.now().toLocaleString()
    },
    type: {
        type: String,
        default: Object.values(enumerations_1.TransactionType)[enumerations_1.TransactionType.Donate],
        enum: Object.values(enumerations_1.TransactionType),
        required: true
    },
    amount: {
        type: Number,
        min: [0, "Must be graeter than 0"],
        required: true
    },
    state: {
        type: String,
        default: Object.values(enumerations_1.TransactionState)[enumerations_1.TransactionState.Pending],
        enum: Object.values(enumerations_1.TransactionState)
    },
    token: {
        type: String,
        default: Object.values(enumerations_1.Token)[enumerations_1.Token.Matic],
        enum: Object.values(enumerations_1.Token)
    },
    network: {
        type: String,
        default: Object.values(enumerations_1.Network)[enumerations_1.Network.Polygon],
        enum: Object.values(enumerations_1.Network)
    }
});
exports.default = mongoose_1.default.model("Transaction", exports.transactionSchema);
