import { useMemo, useState } from "react";
import { type FC } from "react";

import { JsonArray as Component } from "./JsonArray";

import { initContext } from "../../context/JsonArray/JsonArrayContext";
import { IItem } from "./JsonArray.typings";

export const JsonArrayContext = initContext();

export const JsonArray: FC = () => {
    const [data, setData] = useState<IItem[]>([]);
    const [columns, setColumns] = useState<(keyof IItem)[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<{ [key: string]: IItem }>({});

    const value = useMemo(() => {
        return {
            data,
            editedData,
            columns,
            isEditing,
            setData,
            setEditedData,
            setColumns,
            setIsEditing,
        };
    }, [data, editedData, columns, isEditing]);

    return (
        <JsonArrayContext.Provider value={value}>
            <Component />
        </JsonArrayContext.Provider>
    );
};
