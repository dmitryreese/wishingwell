import { type FC, memo, useCallback, useContext, useState } from "react";

import { JsonArrayContext } from "../..";
import {
    CONTAINER_HEIGHT,
    DEFAULT_OVERSCAN,
    ITEM_HEIGHT,
} from "../../JsonArray.const";
import { useVisibleItems } from "../../JsonArray.hooks/useVisibleItems";
import { IItem } from "../../JsonArray.typings";
import { Row } from "../Row";

import { IContentProps } from "./Content.typings";

import "./Content.css";

export const Content: FC<IContentProps> = memo(({ innerRef, onScroll }) => {
    const { data, editedData } = useContext(JsonArrayContext);

    const [isLockScroll, setIsLockScroll] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const { visibleItems, startIndex } = useVisibleItems({
        scrollTop, overscan: DEFAULT_OVERSCAN,
    });

    const handleContentScroll = useCallback(
        (e: React.UIEvent<HTMLElement>) => {
            e.stopPropagation();
            setScrollTop((e.target as HTMLElement).scrollTop);
            onScroll?.(e);
        }, [onScroll]
    );

    return (
        <div
            style={{
                height: `${CONTAINER_HEIGHT}px`,
                overflowY: isLockScroll ? "hidden" : "scroll",
            }}
            className="content"
            ref={innerRef}
            onScroll={handleContentScroll}
        >
            <div style={{ height: `${data.length * ITEM_HEIGHT}px` }}>
                <div
                    style={{
                        position: "relative",
                        height: `${visibleItems.length * ITEM_HEIGHT}px`,
                        top: `${startIndex * ITEM_HEIGHT}px`,
                    }}
                >
                    {visibleItems.map((item: IItem) => {
                        const { guid } = item;
                        const itemToUse = editedData[guid] ?? item;

                        return (
                            <Row
                                key={guid}
                                item={itemToUse}
                                lockScroll={setIsLockScroll}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
