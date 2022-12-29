import campaignModel from "../../models/campaignModel";
import { CampaignType } from "../../models/enumerations";
import { CreateCampaignRequest } from "../../models/interfaces";

export const createCampaign = async (request: CreateCampaignRequest, signatories: string[] = []) => { 
    const campaign = new campaignModel({
        _id: request.campaignId,
        userId: request.creator,
        uri: request.url,
        amount: request.amount,
        campaignType: Object.values(CampaignType)[request.campaignType],
        signatories: signatories,
        description: request.description,
        title: request.title,
        media: request.media      
    });

    return await campaign.save();
}

export const getACampaign = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res.status(400).send("Invalid Campaign Id");

        const campaign = await campaignModel.findById(id);

        if (!campaign)
            return res.status(404).send("Campaign not found");

        return res.status(200).send(campaign);

    } catch (err) {
        next(err)
    }
}


export const getCampaigns = async (req, res, next) => {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;

        if (searchQuery){
            //Find where search query is in title or description
            const campaigns = await campaignModel.find({
                $or: [
                    { title: /.*${searchQuery}.*/i },
                    { description: /.*${searchQuery}.*/i }
                ]
            })
                .sort({ _id: 1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            return res.status(200).send(campaigns);
        }

        return res.status(200).send(await campaignModel.find());       

    } catch (err) {
        next(err)
    }
}

export const getMySignatoryCampaigns = async (req, res, next) => {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;
        const { address } = req.params;
        const currentUser = req.user;       

        if(searchQuery){
            const campaigns = await campaignModel.find({
                signatories: currentUser._id,
                $or: [
                    { title: /.*${searchQuery}.*/i },
                    { description: /.*${searchQuery}.*/i }
                ]
            })
                .sort({ _id: 1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            return res.status(200).send(campaigns);
        }

        return res.status(200).send(await campaignModel.find({
            signatories: currentUser._id
        }));
       

    } catch (error) {
        next(error)
    }

    // DO NOT REMOVE:  await campaignModel.find({ signatories: {"$in" : [address]} });
}

export const getMyCreatedCampaigns = async (req, res, next) => {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;
        const { address } = req.params;
        const currentUser = req.user;             

        if(searchQuery){
            const campaigns = await campaignModel.find({
                userId: currentUser._id,
                $or: [
                    { title: /.*${searchQuery}.*/i },
                    { description: /.*${searchQuery}.*/i }
                ]
            })
                .sort({ _id: 1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            return res.status(200).send(campaigns);
        }

        return res.status(200).send(await campaignModel.find({
            userId: address}));        

    } catch (error) {
        next(error)
    }
}

