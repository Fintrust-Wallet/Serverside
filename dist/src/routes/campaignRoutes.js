"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const _auth = require("../middlewares/auth");
const _repo = require("../controller/repository/userRepository");
const _services = require("../controller/services/campaignService");
const campaignRoutes = Router();
// - Get All Campaigns
campaignRoutes.get("/campaigns", _auth.allowIfLoggedIn, _services.getCampaigns);
// - Get a campaign
campaignRoutes.get("/campaigns/:id", _auth.allowIfLoggedIn, _services.getACampaign);
// - Get My Created Campaigns
campaignRoutes.get("/campaigns/user/created", _auth.allowIfLoggedIn, _auth.grantAccess("readAny", "profile"), _services.getMyCreatedCampaigns);
// - Get All Campaigns where I am a signatory
campaignRoutes.get("/campaigns/user/signatory", _auth.allowIfLoggedIn, _auth.grantAccess("readAny", "profile"), _services.getMySignatoryCampaigns);
exports.default = campaignRoutes;
