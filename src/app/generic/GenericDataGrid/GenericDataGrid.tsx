import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    Form,
    HeaderFilter,
    Lookup,
    Popup,
    Scrolling,
    Search
} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import reducer from '../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey} from '../../../core/lib/api/actions';
import {Item} from "devextreme-react/form";
import {TableVariable} from "../Variable/TableVariable";
import {validationRules} from "../ValidationRules/ValidationRules";

interface IProps {
    URL: string
    columns: any
    keyExpr: any
    lookupData?: any
    AdditionalURL?:string
    nameForm:string
}

export const GenericDataGrid = ({URL, columns, keyExpr,AdditionalURL,nameForm }: IProps) => {
    const [state, dispatch] = useReducer(reducer, TableVariable);


    useEffect(() => {
        loadOrders(dispatch, URL,AdditionalURL)
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
        <React.Fragment>
            <LoadPanel
                position={{of: '#gridContainer'}}
                visible={state.isLoading}
            />
            <DataGrid
                id="gridContainer"
                keyExpr={keyExpr}
                dataSource={state.data}
                showBorders={true}
                repaintChangesOnly
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                onSaving={onSaving}
                height={'85vh'}
            >
                <Scrolling
                    columnRenderingMode={"virtual"}
                    mode={'virtual'}
                />
                <FilterRow visible={true}/>

                <HeaderFilter visible={true}>
                    <Search enabled={true}/>
                </HeaderFilter>
                <Editing
                    mode="popup"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                    changes={state.changes}
                    onChangesChange={onChangesChange}
                    editRowKey={state.editRowKey}
                    onEditRowKeyChange={onEditRowKeyChange}>
                    <Popup title={`Создание ${nameForm}`} showTitle={true} width={"50vw"} height={"70vh"}/>
                    <Form>
                        {columns.map(column => (
                            column.item ? <Item key={column.dataField} dataField={column.dataField}/> : null
                        ))}
                    </Form>
                </Editing>
                {columns.map((column,index) => (
                    <Column
                        fixed={index===0}
                        key={column.dataField}
                        dataField={column.dataField}
                        allowEditing={column.allowEditing}
                        caption={column.caption}
                        dataType={column.dataType}
                        validationRules={column.validationRules ? validationRules : null}
                    >
                        {
                            column.nestedColumns && column.nestedColumns.map((data) => (
                                <Column
                                    width={'180'}
                                    key={data.dataField}
                                    dataField={data.dataField}
                                    allowEditing={data.allowEditing}
                                    caption={data.caption}
                                    dataType={data.dataType}
                                    validationRules={data.validationRules ? validationRules : null}>
                                    {data.lookup &&
                                        <Lookup
                                            dataSource={data.lookup}
                                            valueExpr="id"
                                            displayExpr={'id'}
                                        />
                                    }
                                </Column>
                            ))
                        }
                        {column.lookup &&
                            <Lookup
                                dataSource={column.lookup}
                                valueExpr="id"
                                displayExpr={'id'}
                            />
                        }
                    </Column>
                ))}
            </DataGrid>
        </React.Fragment>
    );
}
