import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const Rases = () => {

    return (
        <GenericDataGrid
            nameForm={"названия РЭС"}
            URL={urls.RASES}
            columns={columns}
            keyExpr="id"
        />
    );
}
