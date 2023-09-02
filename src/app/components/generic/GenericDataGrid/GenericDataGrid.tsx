import React, { useCallback, useEffect, useReducer } from 'react';
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
import { LoadPanel } from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import reducer from '../../lib/func/reducer';
import { saveChange, loadOrders, setChanges, setEditRowKey } from '../../lib/func/actions';
import { Item } from "devextreme-react/form";
import { validationRules } from "../Validation/ValidationRules";

interface IProps {
    URL:string
    columns:any
    keyExpr:any
    lookupData?:any
}

const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};

 export const GenericDataGrid = ({ URL, columns, keyExpr,lookupData }:IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);


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
        <React.Fragment>
            <LoadPanel
                position={{ of: '#gridContainer' }}
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
                columnWidth={180}
                height={'85vh'}
            >
                <Scrolling
                    columnRenderingMode={"virtual"}
                    mode={'virtual'}
                />
                <FilterRow visible={true} />

                <HeaderFilter visible={true}>
                    <Search enabled={true} />
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
                    <Popup title="Employee Info" showTitle={true} width={700} height={525} />
                    <Form>
                        {columns.map(column => (
                            column.item?<Item key={column.dataField} dataField={column.dataField} />:null
                        ))}
                    </Form>
                </Editing>
                {columns.map(column => (
                    <Column
                        key={column.dataField}
                        dataField={column.dataField}
                        allowEditing={column.allowEditing}
                        caption={column.caption}
                        dataType={column.dataType}
                        validationRules={validationRules}
                    >
                        {column.lookup && (
                            <Lookup
                                dataSource={lookupData}
                                valueExpr="id"
                                displayExpr={'id'}
                            />
                        )}
                    </Column>
                ))}
            </DataGrid>
        </React.Fragment>
    );
}
