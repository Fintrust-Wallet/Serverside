import { TransactionType } from "../../models/enumerations";
import { CreateCampaignRequest, CreateTransactionRequest } from "../../models/interfaces";
import { createDate } from "../../utils/helpers";
import { getFiles } from "../../utils/web3storage";
import { createCampaign } from "./campaignService";
import { createTransaction } from "./TransactionService";
const ethers = require("ethers");
const abi = require("../../contract/ABI/fintrust");
const logger = require("../../utils/logger")
require("dotenv").config();

const fintrustAddress = process.env.FINTRUST_ADDRESS;
const provider = new ethers.providers.WebSocketProvider(process.env.WEB_SOCKET);

const contract = new ethers.Contract(fintrustAddress, abi, provider);

export async function handleEvents() {

    contract.on("CampaignCreated", async (campaignId, creator, url, timeStamp, campaignType, amount, event) => {
        campaignId = campaignId.toString();
        timeStamp = timeStamp.toString();
        amount = amount.toString();
        creator = creator.toString();

        logger.info(`Create Campaign event fired by ${creator}`); 

        //Use url to get the signatories!
        const campaignInfo = await getFiles(url);

        if (campaignInfo == null) {
            logger.Error("Error while saving campaign. Campaign details not found!");  
            throw new Error("Campaign details not found!\n Did you send a correct CID to the smart contract?")
        }

        const request: CreateCampaignRequest = {
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

        await createCampaign(request);
        logger.info("Campaign created successfully");        

    })

    contract.on("Donated", async (campaignId, sender, timestamp, amount, event) => {
        console.log("Donation called");

        campaignId = campaignId.toString();
        timestamp = timestamp.toString();
        amount = amount.toString();
        sender = sender.toString();

        logger.info(`Donation event fired by Sender:${sender}`); 


        const request: CreateTransactionRequest = {
            campaignId,
            sender,
            type: TransactionType.Donate,
            amount,
            timeStamp: createDate(timestamp)
        }

        await createTransaction(request);
        logger.info("Donation saved successfully");       

    });

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
}

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