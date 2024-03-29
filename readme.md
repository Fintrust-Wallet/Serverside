# Fintrust API
Fintrust is a fundraising platform utilizing the blockchain to ensure massive societal change by enabling people create campaigns and donate funds. On the platform, funds donated are secure and records are transparent. Campaign creators have the tools needed to manage their campaigns, add in signatories and have it before the audience that’s needed.

_______________

## Author
[Ogubuike Alex](https://github.com/king-Alex-d-great)

## Tech Stack

**Blockchain:** Solidity, Hardhat, 

**Server:** Typescript, Express, web3.storage, ethers, mongoDB

## CAs

#### Contract : 0x9600178ade94d8652241aE8c3D75B42Ff5Ac61B8
#### Token: 0x1B33d4Ab4FaA951cb0d759be6284e5A74e37A1CD

## Endpoints

### Authentication

- login
- update profile

### Campaign

- Get a campaign
- Get All Campaigns
- Get My Created Campaigns
- Get All Campaigns where I am a signatory

### Transaction

- Deposit
- Withdrawal
- Request withdrawal - Create a new withdrawRequest - Change State to allow withdrawal (The new state value can come with the signatures)
- Confirm/reject withdrawal
- Withdraw - Get all withdraw requests

### Smart Contract Functions

- Create Campaign
- Donate to a campaign

### Event Based Changes

- Create a campaign
- Deposit to a campaign

#### Relationships

- A campaign has list of transaction Ids(Normalization)
- A campaign has list of WithdrawRequest Ids(Normalization)
- A campaign has a conditional list of User Ids (signatories)(Normalization)
- A campaign has userId (Normalization)✅

- A user has an array of transaction Ids (Normalization)✅
- A user has an array of Campaign Ids (Normalization)✅

- A transaction has a hybrid relationship with (UserID, campaign id, campaign title, campaign target)✅
- A withdrawRequest has userId and CampaignId (Normalization)✅

#### Roadmap

- Declare a wallet type and Add Validation for it
- When a person selects public campaign from the FE, we collect the signatories and store also with the files on IPFS
  after the contract event has triggered the server to create a campaign, we will check if the campaign is public. Then we will collect the signatories from web3storage and store it in our DB
- Whitelister to smart contract, you must be whitelisted to perform operatins on the SC
- There is a method callable by only admin that will whitelist multiple users. After you register, you hvae to wait for a period for verification, to be able to create campaigns etc
- logger to automatically run functions like => Create a campaign, Create a transaction
- Enums in transaction should be strings for easy readability
- Hash user wallet Address
- How will admin signup
- Add Role management system as a middleware
- Add Helmet

Question:
Best way to set and fetch images for mongodb
How to write the schema for that

Reference:
Schema Validation: https://mongoosejs.com/docs/validation.html

A user creates a public campaign
The user has 3 signatories

I should be able to see all the withdraw requests for me

For any campaign where I am a signatory, I should be able to see the withraw request attached

//This is a good approach for the transaction request in My Portfolio Section
A withdraw request should have a list of signatories
For a logged in user, get all withdraw requests where my wallet address appears in the list of signatories

\*\* Signing the withdrawal request

- A signatory has two options => Accept or decline request
- Accept will allow him to sign a message signature
- then he will send the hashed message and signature to the withdrawee

To withdraw from the platform
The withdrawee will send across the three signatures and hashed messages and corresponding public addresses for the the signatories
If they all correspond, he gets his funds

//Sign and verify signature
Setting up Logger

https://fintrust-wallet-mad-max-fury.vercel.app/
