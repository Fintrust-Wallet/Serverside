import mongoose, { Schema } from "mongoose";
import { campaignSchema } from "./campaignModel";
import { Network, Token, TransactionState, TransactionType } from "./enumerations";
import { userSchema } from "./userModel";

export const transactionSchema = new Schema({    
    user: {
        type: userSchema,
        required: true,
        trim: true
    },
    campaign: {
        type: campaignSchema,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toLocaleString()
    },
    type: {
        type: TransactionType,
        required: true        
    },
    amount: Number,
    state: {
        type: TransactionState,
        default: TransactionState.pending
    },
    token: {
        type: Token,
        default: Token.Matic        
    }, 
    network: {
        type: Network,
        default: Network.Polygon
    } 
})

export default mongoose.model("Transaction", transactionSchema);