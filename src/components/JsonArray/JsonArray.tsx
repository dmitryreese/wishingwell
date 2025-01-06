import { memo, useCallback, useRef, type FC } from "react";

import {
    ClearButton,
    Content,
    DownloadButton,
    Header,
    UploadButton,
} from "./components";

import "./JsonArray.css";

export const JsonArray: FC = memo(() => {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleContentScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
        headerRef.current?.scrollTo({ left: (e.target as HTMLElement).scrollLeft });
    }, []);

    const handleHeaderScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
        contentRef.current?.scrollTo({
            left: (e.target as HTMLElement).scrollLeft,
        });
    }, []);

    return (
        <div className="wrapper">
            <Header innerRef={headerRef} onScroll={handleHeaderScroll} />
            <Content innerRef={contentRef} onScroll={handleContentScroll} />
            <div className="button-container">
                <ClearButton />
                <div>
                    <DownloadButton />
                    <UploadButton />
                </div>
            </div>
        </div>
    );
});
