import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../UI/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const ProviderClassifications = () => {
    const URL: string = urls.PROVIDER_CLASSIFICATIONS

    return (
        <GenericDataGrid
            nameForm={"классификации поставщика"}
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
