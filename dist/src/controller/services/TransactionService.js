"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const campaignModel_1 = __importDefault(require("../../models/campaignModel"));
const TransactionModel_1 = __importDefault(require("../../models/TransactionModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const createTransaction = (request) => __awaiter(void 0, void 0, void 0, function* () {
    let campaign = yield campaignModel_1.default.findById({ _id: request === null || request === void 0 ? void 0 : request.campaignId });
    if (!campaign)
        throw new Error("Invalid CampaignId");
    let transaction = new TransactionModel_1.default({
        userId: request === null || request === void 0 ? void 0 : request.sender,
        campaign: request === null || request === void 0 ? void 0 : request.campaignId.toString(),
        type: request === null || request === void 0 ? void 0 : request.type,
        amount: request === null || request === void 0 ? void 0 : request.amount,
        createdAt: request === null || request === void 0 ? void 0 : request.timeStamp
    });
    let user = yield userModel_1.default.findById({ _id: request === null || request === void 0 ? void 0 : request.sender });
    if (!user)
        throw new Error("Invalid User");
    user.transactions.push(transaction);
    campaign.transactions.push(transaction);
    user.save();
    campaign.save();
});
exports.createTransaction = createTransaction;
// export const requestWithdrawal = async (request: CreateWithdrawRequestRequest) => {
//     let campaign = await campaignModel.findById({ campaign: "campaignId" });
//     if (!campaign)
//         throw new Error("Invalid CampaignId");
//     if (campaign.userId != request.sender)
//         throw new Error("Unauthorized Sender");
//     if (campaign.campaignType == 1) {
//         throw new Error("Individual Campaign does not need a withdraw request");
//     }
//     let allowedSigners = [];
//     for (const user in campaign.signatories) {
//         allowedSigners.push(new Signer(user))
//     }
//     let withdrawRequest = new withdrawRequestModel({
//         campaign: request.campaignId,
//         signatories: campaign.signatories,
//         signers: allowedSigners
//     })
//     withdrawRequest.save();
// }
// export const validateWithdrawalRequest = async (req, res, next) => {
//     //Get a request
//     const { requestId } = req.params;
//     const { userId } = req.body;
//     //validate request Id
//     if (!requestId)
//         res.status(400).send("Invalid Request Id");
//     let withdrawRequest = await withdrawRequestModel.findById(requestId);
//     if (!withdrawRequest)
//         res.status(404).send("Request Not Found");
//     let signer = withdrawRequest.signers.find(x => x.prototype.userId == userId);
//     if (signer === undefined)
//         res.status(400).send("User Id does not belong to any signer");
//     let signerIndex = withdrawRequest.signers.indexOf(signer);
//     signer.prototype.confirmed = true;
//     signer.prototype.hasVoted = true;
//     withdrawRequest.signers[signerIndex] = signer;
//     withdrawRequest.save();   
// }
// export const rejectWithdrawalRequest = async (req, res, next) => {
//     const { requestId } = req.params;
//     const { userId } = req.body;
//     //validate request Id
//     if (!requestId)
//         res.status(400).send("Invalid Request Id");
//     let withdrawRequest = await withdrawRequestModel.findById(requestId);
//     if (!withdrawRequest)
//         res.status(404).send("Request Not Found");
//     let signer = withdrawRequest.signers.find(x => x.prototype.userId == userId);
//     if (signer === undefined)
//         res.status(400).send("User Id does not belong to any signer");
//     let signerIndex = withdrawRequest.signers.indexOf(signer);
//     signer.prototype.confirmed = false;
//     signer.prototype.hasVoted = false;
//     withdrawRequest.confirmations += 1;
//     withdrawRequest.signers[signerIndex] = signer;
//     withdrawRequest.save();
// }
// - Deposit
//     - Withdrawal✅
//     - Request withdrawal✅
//         - Create a new withdrawRequest
//             - Change State to allow withdrawal(The new state value can come with the signatures)
// - Confirm / reject withdrawal✅
//     - Withdraw
//     - Get all withdraw requests
/*
 * FLow
 * - Create a withdraw request
 * - For Every one who is a signatory display withdrawal requests that are unresolved and order by timeStamps
 * - As a signatory when I click on Confirm, update the withdraw request by increasing confirmations and add the signatory to the ApprovedBy array
 * - As a signatory when I click on Reject, change the state of the withdraw request to rejected and add the signatory to the RejectedBy Array
 * -
 */
