import { Ref } from "react";

export interface IHeaderProps {
    innerRef?: Ref<HTMLDivElement>;
    onScroll?: (e: React.UIEvent<HTMLElement>) => void;
}
