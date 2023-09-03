import React from 'react';
import urls from "../../lib/urls";
import {counterpartiesService} from "../../lib/store/services/counterpartiesService";
import {GenericDataGrid} from "../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const Counterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const {data: counterparties} = counterpartiesService.useFetchCounterpartiesQuery('')
    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
            lookupData={counterparties}
        />
    );
}
