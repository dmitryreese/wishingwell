import { memo, useContext, type FC } from "react";

import { JsonArrayContext } from "../..";
import { ITEM_HEIGHT } from "../../JsonArray.const";
import { Cell } from "../Cell";

import { IRowProps } from "./Row.typings";

import "./Row.css";

export const Row: FC<IRowProps> = memo(({ item, lockScroll }) => {
    const { columns } = useContext(JsonArrayContext);
    const { guid } = item;

    return (
        <div className="row" style={{ height: ITEM_HEIGHT }}>
            {columns.map((column) => {
                return (
                    <Cell
                        key={`${column}_${guid}`}
                        item={item}
                        columnName={column}
                        lockScroll={lockScroll}
                    />
                );
            })}
        </div>
    );
});
