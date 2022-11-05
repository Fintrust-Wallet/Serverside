import { Bytes } from "ethers/lib/utils";
import { CampaignType } from "./enumerations";

export interface CreateCampaignRequest {
    campaignId : Bytes,
    creator : string, 
    url: string, 
    timeStamp : Date, 
    campaignType : CampaignType, 
    amount: number,
    signatories: string[],
    title: string,
    description: string,
    media: string[]
}

export interface GetCampaignInfoResponse {
    campaignTitle : string,
    campaignDescription: string,
    campaignAmount: number,
    images: string[]
}

