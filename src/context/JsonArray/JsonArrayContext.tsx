import { createContext } from "react";

import { type IItem } from "../../components/JsonArray/JsonArray.typings";

export interface IContextProps {
    data: IItem[];
    editedData: { [key: string]: IItem };
    columns: (keyof IItem)[];
    isEditing: boolean;
    setData: (data: IItem[]) => void;
    setEditedData: (
        changeDataCb: (changedData: { [key: string]: IItem }) => {
            [key: string]: IItem;
        }
    ) => void;
    setColumns: (columns: (keyof IItem)[]) => void;
    setIsEditing: (isEditing: boolean) => void;
}

export const initContext = () =>
    createContext<IContextProps>({
        data: [],
        editedData: {},
        columns: [],
        isEditing: false,
        setData: () => {},
        setEditedData: () => {},
        setColumns: () => {},
        setIsEditing: () => {},
    });
