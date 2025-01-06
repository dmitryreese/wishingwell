import { useContext, useMemo } from "react";

import { JsonArrayContext } from "..";
import { CONTAINER_HEIGHT, ITEM_HEIGHT } from "../JsonArray.const";

interface IUseVisibleItemsArgs {
    scrollTop: number;
    overscan?: number;
}

export const useVisibleItems = ({ scrollTop, overscan = 0 }: IUseVisibleItemsArgs) => {
    const { data } = useContext(JsonArrayContext);

    const startIndex = useMemo(
        () => Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - overscan),
        [overscan, scrollTop]
    );

    const endIndex = useMemo(
        () => Math.min(
            data.length,
            startIndex + (overscan * 2) + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT),
        ), [data.length, overscan, startIndex]
    );

    const visibleItems = useMemo(
        () => data.slice(startIndex, endIndex + 1),
        [data, endIndex, startIndex]
    );

    return { visibleItems, startIndex, endIndex };
};
