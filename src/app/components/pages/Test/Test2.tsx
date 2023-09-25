import React, {ReactNode, useCallback, useEffect, useReducer, useState} from 'react';
import { Editing, Form, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange,} from '../../../../core/lib/api/actions';
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from "../../../generic/Variable/TableVariable"
import {setEditRowKey} from "../../../../core/lib/api/actions";
import {setChanges} from "../../../../core/lib/api/actions";

interface Interface {
    URL:string
    ItemColumns?:ReactNode
    dataColumns?:ReactNode
}
export const Test2 = ({URL,ItemColumns,dataColumns}:Interface) => {
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')

    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        setTitleMethod("Создать")
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setTitleMethod("Изменить")
        setEditRowKey(dispatch, editRowKey);
    }, []);

    return (
        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={state.data}
            onSaving={onSaving}
        >
            <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
                changes={state.changes}
                onChangesChange={onChangesChange}
                editRowKey={state.editRowKey}
                onEditRowKeyChange={onEditRowKeyChange}
            >
                <Popup
                    title={`${titleMethod} категорию договора`}
                    showTitle={true}
                />
                    {ItemColumns}
            </Editing>

            {dataColumns}
        </CustomDataGrid>
    )
}
