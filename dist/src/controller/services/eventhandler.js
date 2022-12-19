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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEvents = void 0;
const enumerations_1 = require("../../models/enumerations");
const helpers_1 = require("../../utils/helpers");
const web3storage_1 = require("../../utils/web3storage");
const campaignService_1 = require("./campaignService");
const TransactionService_1 = require("./TransactionService");
const ethers = require("ethers");
const abi = require("../../contract/ABI/fintrust");
require("dotenv").config();
const fintrustAddress = process.env.FINTRUST_ADDRESS;
const provider = new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET);
const contract = new ethers.Contract(fintrustAddress, abi, provider);
function handleEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        contract.on("CampaignCreated", (campaignId, creator, url, timeStamp, campaignType, amount, event) => __awaiter(this, void 0, void 0, function* () {
            console.log("event fired");
            campaignId = campaignId.toString();
            timeStamp = timeStamp.toString();
            amount = amount.toString();
            creator = creator.toString();
            //Use url to get the signatories!
            const campaignInfo = yield (0, web3storage_1.getFiles)(url);
            if (campaignInfo == null) {
                throw new Error("Campaign details not found!\n Did you send a correct CID to the smart contract?");
            }
            const request = {
                campaignId,
                creator,
                url,
                amount,
                campaignType,
                timeStamp,
                signatories: [],
                title: campaignInfo.campaignTitle,
                description: campaignInfo.campaignDescription,
                media: campaignInfo.images
            };
            console.log(request, "CreateCampainRequest");
            yield (0, campaignService_1.createCampaign)(request);
        }));
        contract.on("Donated", (campaignId, sender, timestamp, amount, event) => __awaiter(this, void 0, void 0, function* () {
            console.log("Donation called");
            campaignId = campaignId.toString();
            timestamp = timestamp.toString();
            amount = amount.toString();
            sender = sender.toString();
            const request = {
                campaignId,
                sender,
                type: enumerations_1.TransactionType.Donate,
                amount,
                timeStamp: (0, helpers_1.createDate)(timestamp)
            };
            yield (0, TransactionService_1.createTransaction)(request);
        }));
        // contract.on("WithDrawn", async (campaignId, sender, timestamp, amount, event) => {
        //     const request: CreateTransactionRequest = {
        //         campaignId,
        //         sender,
        //         type: TransactionType.withdraw,
        //         amount,
        //         timeStamp: createDate(timestamp)
        //     }
        //     await createTransaction(request);
        // });
    });
}
exports.handleEvents = handleEvents;
// async function syncCampaigns () {
//     let campaigns  = await contract.getAllCampaigns();
//     campaigns.forEach(async (x) => {
//         let _id = x.campaignId.toString()
//         let campaign = await campaignModel.findById({ _id });
//         if (campaign){
//             console.log(true);
//         }
//         else{
//             console.log(false)
//         }
//     })
// }
// syncCampaigns();
