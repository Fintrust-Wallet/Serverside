export const createDate = (unixTime: number): Date =>
    new Date(unixTime / 1000);
