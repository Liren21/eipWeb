import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const Employees = () => {
    const URL: string = urls.EMPLOYEES

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
            AdditionalURL={' '}
        />
    );
}
