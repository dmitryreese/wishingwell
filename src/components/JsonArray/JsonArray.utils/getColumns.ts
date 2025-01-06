import { IItem } from "../JsonArray.typings";

export const getColumns = (item?: IItem) => {
    return Object.keys(item || {}) as (keyof IItem)[];
};
