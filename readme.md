# Fintrust API
Contract : 0x2Df9063DaC57aC33544113eE3Ce1a2FA4D36fCB4
Token: 0x1B33d4Ab4FaA951cb0d759be6284e5A74e37A1CD

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
 - Request withdrawal
        - Create a new withdrawRequest
        - Change State to allow withdrawal (The new state value can come with the signatures)
 - Confirm/reject withdrawal
 - Withdraw
        - Get all withdraw requests
### Smart Contract Functions
 - Create Campaign
 - Donate to a campaign
### Event Based Changes
 - Create a campaign
 - Deposit to a campaign




Relationships

A campaign has embedded transactions (Denormalization)✅
A campaign has userId (Normalization)✅

A user has an embedded array of transactions (Denormalization)✅


A transaction will have a hybrid stuff with (campaign id, campaign title, campaign target)✅

Note
If the data is mostly read and does not change quickly, we should probably embed. If the data is updated frequently, we should probably reference.


//To Do 
- Declare a wallet type and Add Validation for it
- When a person selects public campaign from the FE, we collect the signatories and store also with the files on IPFS
after the contract event has triggered the server to create a campaign, we will check if the campaign is public. Then we will collect the signatories from web3storage and store it in our DB
- Whitelister to smart contract, you must be whitelisted to perform operatins on the SC
- There is a method callable by only admin that will whitelist multiple users. After you register, you hvae to wait for a period for verification, to be able to create campaigns etc
- logger to automatically run functions like => Create a campaign, Create a transaction
- Enums in transaction should be strings for easy readability