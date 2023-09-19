import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from "../../../generic/Variable/TableVariable";


export const ContractCategories = () => {
    const URL: string = urls.CONTRACT_CATEGORIES
    const [state, dispatch] = useReducer(reducer, TableVariable);


    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        if (changes !== undefined) {
            setChanges(dispatch, changes);
        }
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);

    const handleRowUpdated = (e) => {
        if (e.dataField === 'style') {
            const styleValue = e.value;
            // Теперь у вас есть доступ к значению столбца style (styleValue)
            // Вы можете сделать с ним что-то здесь
        }
    };
    const styleCellRender = (cellData) => {
        const styleValue = cellData.value;
        const cellStyle = {
            backgroundColor: styleValue,
            padding: '9px',
            borderRadius:'1rem'
        };
        return (
            <div style={cellStyle}>

            </div>
        );
    };
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
                <Popup title="Создание категории договора" showTitle={true}/>
                <Form>
                    <Item itemType="group" colCount={3} colSpan={2}>
                        <Item dataField="style" editorType={"dxColorBox"}/>
                        <Item dataField={'sortIndex'}/>
                        <Item dataField={'name'}/>
                        <Item dataField={'group'}/>
                        <Item dataField={'note'}/>
                    </Item>
                </Form>
            </Editing>

            <Column alignment={"center"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"center"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="name" caption={'Наименование'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="group" caption={'Группа'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="note" caption={'Примечание'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="style" caption={'Цветовое обозначение'} dataType={"number"}
                    validationRules={validationRules} cellRender={styleCellRender}/>

        </CustomDataGrid>
    )
}
