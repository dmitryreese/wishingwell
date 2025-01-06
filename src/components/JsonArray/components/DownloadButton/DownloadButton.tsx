import { memo, useCallback, useContext, type FC } from "react";

import { JsonArrayContext } from "../..";

export const DownloadButton: FC = memo(() => {
    const { data, editedData } = useContext(JsonArrayContext);

    const handleClick = useCallback(() => {
        const element = document.createElement("a");
        const downloadData = data.map((item) => editedData[item.guid] ?? item);
        const stringified = JSON.stringify(downloadData);
        const file = new Blob([stringified], { type: "text/plain" });

        element.href = URL.createObjectURL(file);
        element.download = "data.json";
        element.click();
    }, [data, editedData]);

    return <button onClick={handleClick}>Download</button>;
});
