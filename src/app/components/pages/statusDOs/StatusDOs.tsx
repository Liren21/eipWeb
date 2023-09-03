import React from 'react';
import urls from "../../lib/urls";
import {GenericDataGrid} from "../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const StatusDOs = () => {
    const URL: string = urls.SUBCONTRACTOR_CLASSIFICATIONS

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
