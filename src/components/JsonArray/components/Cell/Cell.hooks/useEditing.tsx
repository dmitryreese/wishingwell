import { useCallback, useContext, useState } from "react";

import { JsonArrayContext } from "../../..";
import { IItem } from "../../../JsonArray.typings";

interface IUseEditingArgs {
    value: string;
    item: IItem;
    columnName: keyof IItem;
    isEditable: boolean;
    lockScroll?: (lock: boolean) => void;
}

export const useEditing = ({
    value,
    item,
    columnName,
    isEditable,
    lockScroll,
}: IUseEditingArgs) => {
    const { setEditedData } = useContext(JsonArrayContext);
    const { guid } = item;

    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleStartEditing = useCallback(() => {
        if (isEditable) {
            setIsEditMode(true);
            lockScroll?.(true);
        }
    }, [isEditable, lockScroll]);

    const handleStopEditing = useCallback(() => {
        setIsEditMode(false);
        lockScroll?.(false);
    }, [lockScroll]);

    const handleChangeData = useCallback(() => {
        setEditedData((prevValue) => {
            const changedItem = prevValue[guid];
            const changedColumn = { [columnName]: inputValue };

            if (changedItem) {
                prevValue[guid] = { ...changedItem, ...changedColumn };
            } else {
                prevValue[guid] = { ...item, ...changedColumn };
            }

            return prevValue;
        });
    }, [columnName, guid, inputValue, item, setEditedData]);

    const handleSave = useCallback(() => {
        handleChangeData();
        handleStopEditing();
    }, [handleChangeData, handleStopEditing]);

    const handleCancel = useCallback(() => {
        setInputValue(value);
        handleStopEditing();
    }, [handleStopEditing, value]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.currentTarget.value);
        }, []
    );

    return {
        handleChange,
        handleStartEditing,
        handleCancel,
        handleSave,
        inputValue,
        isEditMode,
    };
};
