import React, {useCallback, useEffect, useReducer} from 'react';
import urls from "../../../lib/urls";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {Column, Editing, Form, Popup} from "devextreme-react/data-grid";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import reducer from "../../../../core/lib/api/reducer";
import {loadOrders, saveChange, setChanges, setEditRowKey} from "../../../../core/lib/api/actions";
import {TableVariable} from "../../../generic/Variable/TableVariable";


export const Rases = () => {
    const URL: string = urls.RASES
    const [state, dispatch] = useReducer(reducer, TableVariable);



    useEffect(() => {
        loadOrders(dispatch, URL);

    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
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
                <Popup title="Создание РЭС" showTitle={true}/>
                <Form>
                        <Item dataField={'sortIndex'}/>
                        <Item dataField={'name'}/>
                        <Item dataField={'note'} editorType={'dxTextArea'} colSpan={2}/>
                </Form>
            </Editing>

            <Column alignment={"center"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"center"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="name" caption={'Наименование'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="note" caption={'Расшифровка'} dataType={"string"}
                    validationRules={validationRules}/>

        </CustomDataGrid>
    );
}
