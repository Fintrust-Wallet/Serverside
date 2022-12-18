import mongoose, { Schema } from "mongoose";
import { TransactionState } from "./enumerations";

export const withdrawRequestSchema = new Schema({
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
        enum: Object.values(TransactionState),
        default: Object.values(TransactionState)[TransactionState.Pending]
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

export default mongoose.model("WithdrawRequest", withdrawRequestSchema);
