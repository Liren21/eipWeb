import React from 'react';
import urls from "../../lib/urls";
import {GenericDataGrid} from "../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const ContractCategories = () => {
    const URL: string = urls.CONTRACT_CATEGORIES

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
