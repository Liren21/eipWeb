import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,
    Scrolling,
    Search
} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import reducer from '../../lib/func/reducer';
import {
    saveChange, loadOrders, setChanges, setEditRowKey,
} from '../../lib/func/actions';

import urls from "../../lib/urls";


const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export const CustomerClassifications= () => {
    const URL: string = urls.CUSTOMER_CLASSIFICATIONS
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        loadOrders(dispatch, URL);
    }, []);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, []);

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
                keyExpr="id"
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
                    onEditRowKeyChange={onEditRowKeyChange}
                />
                <Column dataField="id" caption={'id'} allowEditing={false} dataType={"number"}/>
                <Column dataField="name" allowEditing={true}
                        caption={'Имя'} dataType={"string"}/>
                <Column dataField="sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                        dataType={"number"}/>
            </DataGrid>

        </React.Fragment>
    );
}
