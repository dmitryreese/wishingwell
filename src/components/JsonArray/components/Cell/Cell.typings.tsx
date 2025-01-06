import { IItem } from "../../JsonArray.typings";

export interface ICellProps {
    columnName: keyof IItem;
    item: IItem;
    lockScroll?: (lock: boolean) => void;
}
