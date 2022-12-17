import mongoose, { Schema } from "mongoose";
import { campaignSchema } from "./campaignModel";
import { Network, Token, TransactionState, TransactionType } from "./enumerations";
import { userSchema } from "./userModel";

export const transactionSchema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
        trim: true //add user email or wallet address
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
        type: Number,
        default: TransactionType.donate,
        enum: TransactionType
    },
    amount: Number,
    state: {
        type: Number,
        default: TransactionState.pending,
        enum: TransactionState
    },
    token: {
        type: Number,
        default: Token.Matic,
        enum: Token
    },
    network: {
        type: Number,
        default: Network.Polygon,
        enum: Network
    }
})

export default mongoose.model("Transaction", transactionSchema);