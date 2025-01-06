import { Ref } from "react";

export interface IContentProps {
    innerRef?: Ref<HTMLDivElement>;
    onScroll?: (e: React.UIEvent<HTMLElement>) => void;
}
