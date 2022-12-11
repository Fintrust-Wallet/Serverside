"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.Token = exports.TransactionState = exports.TransactionType = exports.CampaignState = exports.CampaignType = void 0;
var CampaignType;
(function (CampaignType) {
    CampaignType[CampaignType["individual"] = 1] = "individual";
    CampaignType[CampaignType["public"] = 2] = "public";
})(CampaignType = exports.CampaignType || (exports.CampaignType = {}));
var CampaignState;
(function (CampaignState) {
    CampaignState[CampaignState["created"] = 0] = "created";
})(CampaignState = exports.CampaignState || (exports.CampaignState = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["withdraw"] = 0] = "withdraw";
    TransactionType[TransactionType["donate"] = 1] = "donate";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState[TransactionState["pending"] = 0] = "pending";
    TransactionState[TransactionState["cancelled"] = 1] = "cancelled";
    TransactionState[TransactionState["completed"] = 2] = "completed";
})(TransactionState = exports.TransactionState || (exports.TransactionState = {}));
var Token;
(function (Token) {
    Token[Token["Matic"] = 0] = "Matic";
})(Token = exports.Token || (exports.Token = {}));
var Network;
(function (Network) {
    Network[Network["Polygon"] = 0] = "Polygon";
})(Network = exports.Network || (exports.Network = {}));
