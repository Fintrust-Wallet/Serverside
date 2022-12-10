"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDate = void 0;
const createDate = (unixTime) => new Date(unixTime / 1000);
exports.createDate = createDate;
