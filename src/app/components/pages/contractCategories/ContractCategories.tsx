import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from "../../../generic/Variable/TableVariable"
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";


export const ContractCategories = () => {
    const URL: string = urls.CONTRACT_CATEGORIES
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
                <Popup
                    title={`${titleMethod} категорию договора`}
                    showTitle={true}
                />
                <Form>
                    <Item dataField="style" editorType="dxColorBox"/>
                    <Item dataField={'sortIndex'}/>
                    <Item dataField={'name'}/>
                    <Item dataField={'group'}/>
                    <Item dataField="note" editorType={'dxTextArea'} colSpan={2}/>
                </Form>
            </Editing>

            <Column  alignment={"center"} fixed={true} dataField="id" defaultSortOrder={"asc"}
                    caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"center"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="name" caption={'Наименование'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="group" caption={'Группа'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="note" caption={'Примечание'} dataType={"string"}
            />
            <Column  alignment={"center"} dataField="style" caption={'Цветовое обозначение'}
                    dataType={"string"}
                    cellRender={(cellData) => (
                        <div style={{backgroundColor: cellData.value, padding: '9px', borderRadius: '1rem'}}>

                        </div>
                    )}/>

        </CustomDataGrid>
    )
}
