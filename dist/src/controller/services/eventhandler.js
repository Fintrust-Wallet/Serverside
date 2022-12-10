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
const ethers = require("ethers");
const abi = require("../../contract/ABI/fintrust.json");
require("dotenv").config();
function handleEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const fintrustAddress = "";
        const provider = new ethers.providers.WebSocketProvider("wss://polygon-mumbai.g.alchemy.com/v2/R2WUD0JVyC7HXqRqPyQ1TeECHNm6JX7K");
        const contract = new ethers.Contract(fintrustAddress, abi, provider);
        contract.on("CampaignCreated", (campaignId, creator, url, timeStamp, campaignType, amount, event) => __awaiter(this, void 0, void 0, function* () {
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
            console.log(request, "REQUEST");
            yield (0, campaignService_1.createCampaign)(request);
        }));
    });
}
exports.handleEvents = handleEvents;
