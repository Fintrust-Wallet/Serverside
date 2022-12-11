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
const web3storage_1 = require("../../utils/web3storage");
const campaignService_1 = require("./campaignService");
//import { createTransaction } from "./TransactionService";
const ethers = require("ethers");
const abi = require("../../contract/ABI/fintrust");
require("dotenv").config();
function handleEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const fintrustAddress = "0x2Df9063DaC57aC33544113eE3Ce1a2FA4D36fCB4";
        const provider = new ethers.providers.WebSocketProvider("wss://polygon-mumbai.g.alchemy.com/v2/R2WUD0JVyC7HXqRqPyQ1TeECHNm6JX7K");
        const contract = new ethers.Contract(fintrustAddress, abi, provider);
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
            yield (0, campaignService_1.createCampaign)(request);
        }));
        // contract.on("Donated", async (campaignId, sender, timestamp, amount, event) => {
        //     const request : CreateTransactionRequest= {
        //         campaignId,
        //         sender,
        //         type: TransactionType.donate,
        //         amount,
        //         timeStamp: createDate(timestamp)
        //     } 
        //     await createTransaction(request);
        // });
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
