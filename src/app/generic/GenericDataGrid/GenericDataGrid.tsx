import React, {Fragment, useCallback, useEffect, useReducer} from 'react';
import reducer from '../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey} from '../../../core/lib/api/actions';
import Form, {Item} from "devextreme-react/form";
import {TableVariable} from "../Variable/TableVariable";
import {validationRules} from "../ValidationRules/ValidationRules";
import './GenericDataGrid.scss'
import {CustomDataGrid} from "../../components/UI/CustomDataGrid/CustomDataGrid";
import {Column, Editing, Popup} from 'devextreme-react/data-grid';

interface IProps {
    URL: string
    columns: any
    keyExpr: any
    lookupData?: any
    AdditionalURL?: string
    nameForm: string
    dataOnInitNewRow?: any
}

export const GenericDataGrid = ({URL, columns, keyExpr, AdditionalURL, nameForm, dataOnInitNewRow}: IProps) => {
    const [state, dispatch] = useReducer(reducer, TableVariable);


    useEffect(() => {
        loadOrders(dispatch, URL, AdditionalURL)
    }, [AdditionalURL, URL]);

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
        <Fragment>
            <CustomDataGrid
                visible={state.isLoading}
                keyExpr={keyExpr}
                dataSource={state.data}
                onSaving={onSaving}
                dataOnInitNewRow={dataOnInitNewRow}

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
                    <Popup title={`Создание ${nameForm}`} showTitle={true}/>
                    <Form>
                        <Item itemType="group" colCount={3} colSpan={2}>
                            {columns.map(column => (
                                column.item && <Item key={nameForm + column.dataField} dataField={column.dataField}/>
                            ))}
                        </Item>
                    </Form>
                </Editing>
                {columns.map((column, index) => (
                    <Column
                        fixed={index === 0}
                        alignment={"center"}
                        key={column.dataField}
                        dataField={column.dataField}
                        defaultSortOrder={column.defaultSortOrder}
                        allowEditing={column.allowEditing}
                        caption={column.caption}
                        dataType={column.dataType}
                        validationRules={column.validationRules ? validationRules : null}
                    />

                ))}
            </CustomDataGrid>
        </Fragment>

    );
}
