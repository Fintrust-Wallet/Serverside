"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
class Signer {
    /**
     *
     */
    constructor(_userId) {
        this.userId = _userId;
        this.hasVoted = false;
        this.confirmed = false;
    }
}
exports.Signer = Signer;
