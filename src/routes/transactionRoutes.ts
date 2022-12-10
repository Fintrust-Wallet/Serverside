const { Router } = require("express");
const auth = require("../middlewares/auth");
const repo = require("../controller/repository/userRepository");
const services = require("../controller/services/campaignService");

const transactionRoutes = Router();

// - Get All Campaigns
transactionRoutes.get("/campaigns", auth.allowIfLoggedIn, services.getCampaigns);

// - Get a campaign
transactionRoutes.get("/campaigns/:id", auth.allowIfLoggedIn, services.getACampaign);

// - Get My Created Campaigns
transactionRoutes.get("/campaigns/created", auth.allowIfLoggedIn, auth.grantAccess("readAny", "profile"), services.getMyCreatedCampaigns);

// - Get All Campaigns where I am a signatory
transactionRoutes.get("/campaigns/signatory", auth.allowIfLoggedIn, auth.grantAccess("readAny", "profile"), services.getMySignatoryCampaigns);

export { transactionRoutes };