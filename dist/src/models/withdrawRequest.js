/**
 * Campaign
 * Confirmations
 * Id
 * Status (Rejected, Pending, Confirmed)
 * Signer: [{
 * email: xyz (to be gotten from campaign),
 * hasVoted: boolean,
 * confirmed: boolean
 * },
 * {
 * email: xyz (to be gotten from campaign),
 * hasVoted: boolean,
 * confirmed: boolean
 * }
 * ]
 * ApprovedBy [string]
 * Rejected by [string]
 * CreatedAt
 * UpdatedAt
 *
 * FLow
 * - Create a withdraw request
 * - For Every one who is a signatory display withdraw requests that are unresolved and order by timeStamps
 * - As a signatory when I click on Confirm, update the withdraw request by increasing confirmations and add the signatory to the ApprovedBy array
 * - As a signatory when I click on Reject, change the state of the withdraw request to rejected and add the signatory to the RejectedBy Array
 * -
 */ 
