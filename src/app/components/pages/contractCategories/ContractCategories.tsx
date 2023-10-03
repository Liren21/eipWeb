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
import Element from "./element";


export const ContractCategories = () => {
    const URL: string = urls.CONTRACT_CATEGORIES
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')

    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        const data = e.changes[0].data

        if (data !== undefined) {
            data['style'] = JSON.stringify({
                color: data.style.color,
                cursive: data.style.cursive,
                fontFatness: data.style.fontFatness,
                colorFont: data.style.colorFont
            })
            delete data.color
            delete data.cursive
            delete data.fontFatness
            delete data.colorFont
        }
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const dataChange = state.data.map((item) => {
        if (item.style !== undefined) {
            return {...item, style: JSON.parse(item.style)}
        } else {
            return {
                ...item, style: {
                    color: '',
                    cursive: false,
                    fontFatness: false,
                    colorFont: ''
                }
            }
        }
    })

    return (
        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={dataChange}
            onSaving={onSaving}
            dataOnInitNewRow={{style: {cursive: false, fontFatness: false}}}
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
                <Form colCount={2}>
                    <Item dataField={'sortIndex'}/>
                    <Item dataField={'name'}/>
                    <Item dataField={'group'}/>
                    <Item dataField="note" editorType={'dxTextArea'} colSpan={2}/>
                    <Item itemType={"group"} caption={'Стили'} colCount={2} colSpan={2}>
                        <Item dataField="style.color" editorType="dxColorBox"/>
                        <Item dataField="style.colorFont" editorType="dxColorBox"/>
                        <Item dataField={'style.cursive'} colSpan={1}/>
                        <Item dataField={'style.fontFatness'} colSpan={1}/>

                    </Item>
                </Form>
            </Editing>

            <Column alignment={"left"} fixed={true} dataField="id" defaultSortOrder={"asc"}
                    caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"left"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                    validationRules={validationRules} cellRender={(data) => <Element data={data}/>}
            />
            <Column alignment={"left"} dataField="name" caption={'Наименование'} dataType={"string"}
                    validationRules={validationRules} cellRender={(data) => <Element data={data}/>}
            />
            <Column alignment={"left"} dataField="group" caption={'Группа'} dataType={"string"}
                    validationRules={validationRules} cellRender={(data) => <Element data={data}/>}
            />
            <Column alignment={"left"} dataField="note" caption={'Примечание'} dataType={"string"}
                    cellRender={(data) => <Element data={data}/>}
            />
            <Column alignment={"left"} dataField="style.colorFont" caption={'Цвет шрифта'} dataType={"string"}
                    visible={false}
            />
            <Column alignment={"left"} dataField="style.cursive" caption={'Курсив'} dataType={"boolean"}
                    visible={false}
            />
            <Column alignment={"left"} dataField="style.fontFatness" caption={'Жирность шрифта'} dataType={"boolean"}
                    visible={false}
            />
            <Column alignment={"left"} dataField="style.color" caption={'Цветовое обозначение'}
                    dataType={"string"}
                    cellRender={(data) => <Element data={data}/>}
            />

        </CustomDataGrid>
    )
}
