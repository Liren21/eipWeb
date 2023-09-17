import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import ColorBox from 'devextreme-react/color-box';



export const ContractCategories = () => {
    const URL: string = urls.CONTRACT_CATEGORIES
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [color, setColor] = useState('')




    useEffect(() => {
        loadOrders(dispatch, URL);

    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        console.log(changes)
        console.log(color)
        setChanges(dispatch, changes);
    }, [color]);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);

    const changeColor = (e) => {
        setColor(e.value)
    }
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

                        <Item dataField="style"  editorType={'dxColorBox'}>
                            <ColorBox
                                value={color}
                                onValueChanged={changeColor}
                                applyValueMode="instantly"
                            />
                        </Item>
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
            <Column alignment={"center"} dataField="name" caption={'Имя'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="group" caption={'Группа'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="note" caption={'Примечание'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="style"  caption={'Цветовое обозначение'} dataType={"number"}
                    validationRules={validationRules}/>

        </CustomDataGrid>
    )
}
