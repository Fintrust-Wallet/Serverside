import { Bytes } from "ethers/lib/utils";
import { CampaignType, Network, Token, TransactionState, TransactionType } from "./enumerations";
import * as userModel from "./userModel";

export interface CreateCampaignRequest {
    campaignId: string,
    creator: string,
    url: string,
    timeStamp: Date,
    campaignType: CampaignType,
    amount: number,
    signatories: string[],
    title: string,
    description: string,
    media: string[]
}

export interface GetCampaignInfoResponse {
    campaignTitle: string,
    campaignDescription: string,
    campaignAmount: number,
    images: string[]
}

export interface CreateTransactionRequest {
    campaignId: string,
    sender: string,
    type: TransactionType,
    amount: number,
    timeStamp: Date
}

export interface CreateWithdrawRequestRequest {
    campaignId: string,
    sender: string
}

export class Signer {
    userId: string
    email: string;
    hasVoted: boolean;
    confirmed: boolean;

    /**
     *
     */
    constructor(_userId: string) {
        this.userId = _userId;        
        this.hasVoted = false;
        this.confirmed = false;
    }
}
