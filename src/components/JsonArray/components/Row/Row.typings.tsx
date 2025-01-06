import { IItem } from "../../JsonArray.typings";

export interface IRowProps {
    item: IItem;
    lockScroll?: (lock: boolean) => void;
}
