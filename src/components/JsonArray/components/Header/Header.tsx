import { memo, useCallback, useContext, type FC } from "react";

import { JsonArrayContext } from "../..";
import { getIsColumnEditable } from "../../JsonArray.utils";

import { IHeaderProps } from "./Header.typings";

import "./Header.css";

export const Header: FC<IHeaderProps> = memo(({ innerRef, onScroll }) => {
    const { columns } = useContext(JsonArrayContext);

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLElement>) => {
            onScroll?.(e);
        }, [onScroll]
    );

    return (
        <div className="header" ref={innerRef} onScroll={handleScroll}>
            {columns.map((column, idx) => {
                const isEditable = getIsColumnEditable(column);

                return (
                    <div
                        key={idx}
                        className={`column column-${column} ${
                        isEditable ? "column-editable" : ""
                        }`}
                    >
                        {column}
                    </div>
                );
            })}
        </div>
    );
});
