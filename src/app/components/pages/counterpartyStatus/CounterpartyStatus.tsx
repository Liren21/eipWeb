import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const CounterpartyStatus = () => {
    const URL: string = urls.COUNTERPARTY_STATUS

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
