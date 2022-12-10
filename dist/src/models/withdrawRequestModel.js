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
const joi_1 = require("joi");
const mongoose_1 = __importStar(require("mongoose"));
const enumerations_1 = require("./enumerations");
const interfaces_1 = require("./interfaces");
exports.withdrawRequestSchema = new mongoose_1.Schema({
    campaign: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    confirmations: {
        type: joi_1.number,
        default: 0
    },
    status: {
        type: enumerations_1.TransactionState,
        default: enumerations_1.TransactionState.pending
    },
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    signers: {
        type: [interfaces_1.Signer]
    }
});
exports.default = mongoose_1.default.model("WithdrawRequest", exports.withdrawRequestSchema);
