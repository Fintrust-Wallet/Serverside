"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.Token = exports.WithdrawRequestState = exports.TransactionState = exports.TransactionType = exports.CampaignState = exports.Role = exports.CampaignType = void 0;
var CampaignType;
(function (CampaignType) {
    CampaignType["Individual"] = "individual";
    CampaignType["Public"] = "public";
})(CampaignType = exports.CampaignType || (exports.CampaignType = {}));
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Visitor"] = "visitor";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
var CampaignState;
(function (CampaignState) {
    CampaignState["Inactive"] = "inactive";
    CampaignState["Active"] = "active";
    CampaignState["TargetReached"] = "targetReached";
    CampaignState["Ended"] = "ended";
})(CampaignState = exports.CampaignState || (exports.CampaignState = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Withdraw"] = "withdraw";
    TransactionType["Donate"] = "donate";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState["Pending"] = "pending";
    TransactionState["Cancelled"] = "cancelled";
    TransactionState["Completed"] = "completed";
})(TransactionState = exports.TransactionState || (exports.TransactionState = {}));
var WithdrawRequestState;
(function (WithdrawRequestState) {
    WithdrawRequestState["Pending"] = "pending";
    WithdrawRequestState["Cancelled"] = "cancelled";
    WithdrawRequestState["Completed"] = "completed";
})(WithdrawRequestState = exports.WithdrawRequestState || (exports.WithdrawRequestState = {}));
var Token;
(function (Token) {
    Token["Matic"] = "matic";
})(Token = exports.Token || (exports.Token = {}));
var Network;
(function (Network) {
    Network["Polygon"] = "polygon";
})(Network = exports.Network || (exports.Network = {}));
