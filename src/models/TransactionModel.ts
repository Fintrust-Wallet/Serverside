// import mongoose, { Schema } from "mongoose";
// import { campaignSchema } from "./campaignModel";
// import { Network, Token, TransactionState, TransactionType } from "./enumerations";
// import { userSchema } from "./userModel";

// export const transactionSchema = new Schema({    
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//         trim: true //add user email or wallet address
//     },
//     campaign: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"Campaign",
//         required: true,       
//     },
//     createdAt: {
//         type: Date,        
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now().toLocaleString()
//     },
//     type: {
//         type: TransactionType,
//         default: TransactionType.donate        
//     },
//     amount: Number,
//     state: {
//         type: TransactionState,
//         default: TransactionState.pending
//     },
//     token: {
//         type: Token,
//         default: Token.Matic        
//     }, 
//     network: {
//         type: Network,
//         default: Network.Polygon
//     } 
// })

// export default mongoose.model("Transaction", transactionSchema);