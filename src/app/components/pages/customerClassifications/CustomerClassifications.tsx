import React, {useCallback, useEffect, useReducer, useState} from 'react';
import urls from "../../../lib/urls";
import reducer from "../../../../core/lib/api/reducer";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {loadOrders, saveChange} from "../../../../core/lib/api/actions";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {Column, Editing, Form, Popup} from "devextreme-react/data-grid";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";


export const CustomerClassifications = () => {
    const URL: string = urls.CUSTOMER_CLASSIFICATIONS
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')

    useEffect(() => {
        loadOrders(dispatch, URL);

    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

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
                onChangesChange={useCallback((e) => OnChangesChange(dispatch, e, setTitleMethod), [])}
                editRowKey={state.editRowKey}
                onEditRowKeyChange={useCallback((e) => OnEditRowKeyChange(dispatch, e, setTitleMethod), [])}
            >
                <Popup title={`${titleMethod} классификацию заказчика`} showTitle={true}/>
                <Form>
                    <Item dataField={'sortIndex'}/>
                    <Item dataField={'name'}/>
                    <Item dataField={'note'} editorType={'dxTextArea'} colSpan={2}/>

                </Form>
            </Editing>

            <Column alignment={"left"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"left"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="name" caption={'Наименование'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="note" caption={'Примечание'} dataType={"string"}
            />

        </CustomDataGrid>
    );
}
