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
exports.getMyCreatedCampaigns = exports.getMySignatoryCampaigns = exports.getCampaigns = exports.getACampaign = exports.createCampaign = void 0;
const campaignModel_1 = __importDefault(require("../../models/campaignModel"));
const createCampaign = (request, signatories = []) => __awaiter(void 0, void 0, void 0, function* () {
    const campaign = new campaignModel_1.default({
        _id: request.campaignId,
        creator: request.creator,
        uri: request.url,
        amount: request.amount,
        type: request.campaignType,
        signatories: signatories,
        description: request.description,
        title: request.title,
        media: request.media,
        campaignType: request.campaignType
    });
    return yield campaign.save();
});
exports.createCampaign = createCampaign;
const getACampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).send("Invalid Campaign Id");
        const campaign = yield campaignModel_1.default.findById(id);
        if (!campaign)
            return res.status(404).send("Campaign not found");
        return res.status(200).send(campaign);
    }
    catch (err) {
        next(err);
    }
});
exports.getACampaign = getACampaign;
const getCampaigns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;
        const campaigns = yield campaignModel_1.default.find({
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
    catch (err) {
        next(err);
    }
});
exports.getCampaigns = getCampaigns;
const getMySignatoryCampaigns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;
        const { address } = req.params;
        const campaigns = yield campaignModel_1.default.find({
            signatories: address,
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
    catch (error) {
        next(error);
    }
    // DO NOT REMOVE:  await campaignModel.find({ signatories: {"$in" : [address]} });
});
exports.getMySignatoryCampaigns = getMySignatoryCampaigns;
const getMyCreatedCampaigns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageNumber, pageSize, searchQuery } = req.query;
        const { address } = req.params;
        const campaigns = yield campaignModel_1.default.find({
            creator: address,
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
    catch (error) {
        next(error);
    }
});
exports.getMyCreatedCampaigns = getMyCreatedCampaigns;
