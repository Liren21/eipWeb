import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const Rases = () => {
    const URL: string = urls.RASES

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
