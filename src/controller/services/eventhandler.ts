// import { TransactionType } from "../../models/enumerations";
// import { CreateCampaignRequest, CreateTransactionRequest } from "../../models/interfaces";
// import { createDate } from "../../utils/helpers";
// import { getFiles } from "../../utils/web3storage";
// import { createCampaign } from "./campaignService";
// import { createTransaction } from "./TransactionService";

// const ethers = require("ethers");
// const abi = require("../../contract/ABI/fintrust.json");
// require("dotenv").config();

// export async function handleEvents () {
//     const fintrustAddress = "";
//     const provider = new ethers.providers.WebSocketProvider("wss://polygon-mumbai.g.alchemy.com/v2/R2WUD0JVyC7HXqRqPyQ1TeECHNm6JX7K");

//     const contract = new ethers.Contract(fintrustAddress, abi, provider);
//     contract.on("CampaignCreated", async (campaignId, creator, url, timeStamp, campaignType, amount, event) => {
//        //Use url to get the signatories!
//        const campaignInfo = await getFiles(url);

//        if (campaignInfo == null){
//         throw new Error("Campaign details not found!\n Did you send a correct CID to the smart contract?")
//        }

//         const request : CreateCampaignRequest = {
//             campaignId,
//             creator,
//             url,
//             amount,
//             campaignType,
//             timeStamp,
//             signatories : [],
//             title : campaignInfo.campaignTitle,
//             description : campaignInfo.campaignDescription,
//             media: campaignInfo.images            
//         };       

//         await createCampaign(request);   
//     })

//     contract.on("Donated", async (campaignId, sender, timestamp, amount, event) => {
//         const request : CreateTransactionRequest= {
//             campaignId,
//             sender,
//             type: TransactionType.donate,
//             amount,
//             timeStamp: createDate(timestamp)
//         } 

//         await createTransaction(request);
//     });

//     contract.on("WithDrawn", async (campaignId, sender, timestamp, amount, event) => {
//         const request: CreateTransactionRequest = {
//             campaignId,
//             sender,
//             type: TransactionType.withdraw,
//             amount,
//             timeStamp: createDate(timestamp)
//         }

//         await createTransaction(request);
//     });
// }