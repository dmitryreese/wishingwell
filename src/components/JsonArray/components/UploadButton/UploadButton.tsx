import { memo, useCallback, useContext, useRef, type FC } from "react";

import { JsonArrayContext } from "../..";
import { IItem } from "../../JsonArray.typings";
import { getColumns } from "../../JsonArray.utils";

import "./UploadButton.css";

export const UploadButton: FC = memo(() => {
    const { setData, setEditedData, setColumns } = useContext(JsonArrayContext);
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
        ref.current?.click();
    }, []);

    const handleUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setEditedData(() => ({}));
            setData([]);

            const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target?.result;

            if (text) {
                try {
                    const json = JSON.parse(text as string);
                    const columns = getColumns(json[0]);

                    setColumns(columns);
                    setData(json as IItem[]);
                    if (ref.current) ref.current.value = "";
                } catch (err) {
                    console.log(err);
                }
            }
        };

        if (e.target?.files?.[0]) {
            reader.readAsText(e.target.files[0]);
        }
        }, [setColumns, setData, setEditedData]
    );

    return (
        <>
            <button onClick={handleClick}>Upload</button>
            <input
                type="file"
                ref={ref}
                className="input-upload"
                onChange={handleUpload}
            />
        </>
    );
});
