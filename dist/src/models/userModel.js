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
exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const enumerations_1 = require("./enumerations");
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    _id: {
        type: String,
        trim: true,
    },
    withdrawAccount: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        default: Object.values(enumerations_1.Role)[enumerations_1.Role.Visitor],
        enum: Object.values(enumerations_1.Role),
    },
    accessToken: {
        type: String,
        unique: true,
        trim: true
    },
    totalAmountRaised: {
        type: Number
    },
    totalAmountDonations: {
        type: Number
    },
    totalCampaignsCreated: {
        type: Number
    },
    transactions: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Transaction"
            }]
    },
    campaigns: {
        type: [{
                type: String,
                ref: "Campaign"
            }]
    },
    createdAt: {
        type: String,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: Date.now().toLocaleString()
    },
});
exports.default = mongoose_1.default.model("User", exports.userSchema);
