import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const CounterpartyFormats = () => {
    const URL: string = urls.COUNTERPARTY_FORMATS

    return (
        <GenericDataGrid
            nameForm={"формы контрагента"}
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
