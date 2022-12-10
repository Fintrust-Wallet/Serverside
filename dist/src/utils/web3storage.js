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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.storeFiles = void 0;
//import { Web3Storage } from "web3.storage";
const { Web3Storage } = require("web3.storage");
const axios = require("axios");
const { start } = require("repl");
require("dotenv").config();
function getAccessToken() {
    return `${process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN}`;
}
function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}
const storeFiles = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const client = makeStorageClient();
    const cid = yield client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
});
exports.storeFiles = storeFiles;
const retrieveFiles = (cid) => __awaiter(void 0, void 0, void 0, function* () {
    const client = makeStorageClient();
    const res = yield client.get(cid);
    if (!res.ok) {
        return null;
    }
    // unpack File objects from the response
    const files = yield res.files();
    return files;
});
//Work on this
const getFiles = (cid) => __awaiter(void 0, void 0, void 0, function* () {
    let files = yield retrieveFiles(cid);
    if (files.length > 0) {
        let campaignDetails = {};
        let finalresult = {
            campaignAmount: 0,
            campaignDescription: "",
            campaignTitle: "",
            images: []
        };
        files.forEach((file, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (file._name.includes(".jpeg") || file._name.includes(".png")) {
                finalresult.images.push(`https://ipfs.io/ipfs/${file.cid}`);
            }
            else {
                campaignDetails[file._name] = axios
                    .get(`https://${file.cid}.ipfs.w3s.link/`)
                    .then((data) => data.data);
            }
        }));
        let campaignDetailKeys = Object.keys(campaignDetails);
        let campaignDetailvalues = yield Promise.all(Object.values(campaignDetails));
        campaignDetailKeys.forEach((key, index) => {
            finalresult[key] = campaignDetailvalues[index];
        });
        return finalresult;
    }
    return null;
});
exports.getFiles = getFiles;
