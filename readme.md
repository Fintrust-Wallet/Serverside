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