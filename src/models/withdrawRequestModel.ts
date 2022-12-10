import { number } from "joi";
import mongoose, { Schema } from "mongoose";
import { TransactionState, TransactionType } from "./enumerations";
import { Signer } from "./interfaces";

export const withdrawRequestSchema = new Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    confirmations: {
        type: number,
        default: 0
    },
    status: {
        type: TransactionState,
        default: TransactionState.pending
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
        type: [Signer]
    }   
});

export default mongoose.model("WithdrawRequest", withdrawRequestSchema);
