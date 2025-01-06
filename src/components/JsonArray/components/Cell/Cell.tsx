import { FocusEvent, memo, MouseEvent, useCallback, useRef, type FC } from "react";

import { getIsColumnEditable } from "../../JsonArray.utils";

import { useEditing } from "./Cell.hooks/useEditing";
import { ICellProps } from "./Cell.typings";

import "./Cell.css";

export const Cell: FC<ICellProps> = memo(({ columnName, item, lockScroll }) => {
    const value = `${item[columnName]}`;
    const ref = useRef<HTMLButtonElement>(null);
    const isEditable = getIsColumnEditable(columnName);

    const {
        handleChange,
        handleStartEditing,
        handleCancel,
        handleSave,
        inputValue,
        isEditMode,
    } = useEditing({ value, item, columnName, isEditable, lockScroll });

    const cancelEditing = useCallback(
        (e: FocusEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>) => {
            if (e.relatedTarget !== ref.current) {
                handleCancel();
            }
    }, [handleCancel]);

    return isEditable && isEditMode ? (
        <div className="cell-wrapper">
            <textarea
                className={`column content-column column-${columnName}`}
                onChange={handleChange}
                onBlur={cancelEditing}
                value={inputValue}
                autoFocus
            />
            <div className="input-button-container">
                <button ref={ref} onClick={handleSave}>✔️</button>
                <button onClick={cancelEditing}>❌</button>
            </div>
        </div>
    ) : (
        <div
            className={`column content-column column-${columnName}`}
            onClick={handleStartEditing}
        >
            {inputValue}
        </div>
    );
});
