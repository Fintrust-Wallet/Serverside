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
exports.withdrawRequestSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enumerations_1 = require("./enumerations");
exports.withdrawRequestSchema = new mongoose_1.Schema({
    campaign: {
        type: String,
        ref: "Campaign",
        required: true,
    },
    creator: {
        type: String,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(enumerations_1.TransactionState),
        default: Object.values(enumerations_1.TransactionState)[enumerations_1.TransactionState.Pending]
    },
    createdAt: {
        type: String,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: Date.now().toLocaleString()
    },
    signers: {
        type: [{
                _id: { type: String, ref: "User", required: true },
                email: { type: String, required: true },
                hasVoted: { type: Boolean, required: true },
                confirmed: { type: Boolean, required: true }
            }]
    }
});
exports.default = mongoose_1.default.model("WithdrawRequest", exports.withdrawRequestSchema);
