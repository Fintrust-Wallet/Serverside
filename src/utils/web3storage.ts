import { GetCampaignInfoResponse } from "../models/interfaces";

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

export const storeFiles = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
};

const retrieveFiles = async (cid) => {
  const client = makeStorageClient();
  const res = await client.get(cid);

  if (!res.ok) {
    return null;
  }

  // unpack File objects from the response
  const files = await res.files();
  return files;
};

//Work on this
export const getFiles = async (cid) => {
  let files = await retrieveFiles(cid);

  if (files.length > 0) {
    let campaignDetails = {};

    let finalresult: GetCampaignInfoResponse = {
      campaignAmount: 0,
      campaignDescription: "",
      campaignTitle: "",
      images: []
    };

    files.forEach(async (file, index) => {
      if (file._name.includes(".jpeg") || file._name.includes(".png")) {
        finalresult.images.push(`https://ipfs.io/ipfs/${file.cid}`);
      } else {
        campaignDetails[file._name] = axios
          .get(`https://${file.cid}.ipfs.w3s.link/`)
          .then((data) => data.data);
      }
    });

    let campaignDetailKeys = Object.keys(campaignDetails);
    let campaignDetailvalues = await Promise.all(Object.values(campaignDetails));

    campaignDetailKeys.forEach((key, index) => {
      finalresult[key] = campaignDetailvalues[index];
    });
    return finalresult;
  }

  return null;
};