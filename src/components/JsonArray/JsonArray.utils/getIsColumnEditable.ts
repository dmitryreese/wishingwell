import { RESTRICTED_COLUMNS } from "../JsonArray.const";
import { IItem } from "../JsonArray.typings";

export const getIsColumnEditable = (column: keyof IItem) => {
    return !RESTRICTED_COLUMNS.includes(column);
};
