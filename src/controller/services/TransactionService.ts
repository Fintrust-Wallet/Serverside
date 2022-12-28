import campaignModel from "../../models/campaignModel";
import { CreateTransactionRequest, CreateWithdrawRequestRequest, Signer } from "../../models/interfaces";
import TransactionModel from "../../models/TransactionModel";
import userModel from "../../models/userModel";
import withdrawRequestModel from "../../models/withdrawRequestModel";

export const createTransaction = async (request: CreateTransactionRequest) => {
    let campaign = await campaignModel.findById({ _id: request?.campaignId });
    if (!campaign)
        throw new Error("Invalid CampaignId");

    let transaction = new TransactionModel({
        userId: request?.sender,
        campaign: request?.campaignId.toString(),
        type: request?.type,
        amount: request?.amount,
        createdAt: request?.timeStamp
    });    

    let user = await userModel.findById({ _id: request?.sender });

    if (!user)
        throw new Error("Invalid User"); 
        
    user.transactions.push(transaction);    

    campaign.transactions.push(transaction);        
    user.save();
    campaign.save();
    transaction.save();
}

export const createRequestWithdrawal = async (req, res, next) => {
    const {campaignId} = req.body;
    let currentUser = req.user;

    let campaign = await (await campaignModel.findById({ _id: campaignId })).populate("signatories");

    if (!campaign)
        throw new Error("Invalid CampaignId");

    if (campaign.userId != currentUser._id)
        throw new Error("Unauthorized Sender");

    if ((campaign.campaignType as string).toLowerCase() != "public") {
        throw new Error("Individual Campaign does not need a withdraw request");
    }

    let allowedSigners = [];
    let signatories = campaign.signatories as [typeof userModel] //cast to a list of campaignModels

    for (let user in signatories) { 
        allowedSigners.push(user);
    }

    let withdrawRequest = new withdrawRequestModel({
        campaign: campaignId,
        signatories: campaign.signatories,
        signers: allowedSigners
    })

    withdrawRequest.save();
}

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
