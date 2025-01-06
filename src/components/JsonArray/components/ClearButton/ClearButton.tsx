import { memo, useCallback, useContext, type FC } from "react";

import { JsonArrayContext } from "../..";

export const ClearButton: FC = memo(() => {
    const { setData, setEditedData, setColumns } = useContext(JsonArrayContext);

    const handleClick = useCallback(() => {
        setEditedData(() => ({}));
        setData([]);
        setColumns([]);
    }, [setColumns, setData, setEditedData]);

    return <button onClick={handleClick}>Clear</button>;
});
