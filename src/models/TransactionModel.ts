import mongoose, { Schema } from "mongoose";
import { Network, Token, TransactionState, TransactionType } from "./enumerations";

export const transactionSchema = new Schema({
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
        default: Object.values(TransactionType)[TransactionType.Donate],
        enum: Object.values(TransactionType),
        required: true
    },
    amount: {
        type: Number,
        min: [0, "Must be graeter than 0"],
        required: true
    },
    state: {
        type: String,
        default: Object.values(TransactionState)[TransactionState.Pending],
        enum: Object.values(TransactionState)
    },
    token: {
        type: String,
        default: Object.values(Token)[Token.Matic],
        enum: Object.values(Token)
    },
    network: {
        type: String,
        default: Object.values(Network)[Network.Polygon],
        enum: Object.values(Network)
    }
})

export default mongoose.model("Transaction", transactionSchema);