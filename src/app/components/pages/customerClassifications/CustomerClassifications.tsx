import React from 'react';
import urls from "../../../lib/urls";
import {GenericDataGrid} from "../../../generic/GenericDataGrid/GenericDataGrid";
import {columns} from "./columns/columns";


export const CustomerClassifications = () => {
    const URL: string = urls.CUSTOMER_CLASSIFICATIONS

    return (
        <GenericDataGrid
            URL={URL}
            columns={columns}
            keyExpr="id"
        />
    );
}
