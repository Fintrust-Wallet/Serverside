const { Router } = require("express");
const auth = require("../middlewares/auth");
const repo = require("../controller/repository/userRepository");
const services = require("../controller/services/campaignService");

const campaignRoutes = Router();

// - Get All Campaigns
campaignRoutes.get("/campaigns", auth.allowIfLoggedIn , services.getCampaigns);

// - Get a campaign
campaignRoutes.get("/campaigns/:id", auth.allowIfLoggedIn, services.getACampaign);

// - Get My Created Campaigns
campaignRoutes.get("/campaigns/created", auth.allowIfLoggedIn, auth.grantAccess("readAny", "profile"), services.getMyCreatedCampaigns);

// - Get All Campaigns where I am a signatory
campaignRoutes.get("/campaigns/signatory", auth.allowIfLoggedIn, auth.grantAccess("readAny", "profile"), services.getMySignatoryCampaigns);

export { campaignRoutes };