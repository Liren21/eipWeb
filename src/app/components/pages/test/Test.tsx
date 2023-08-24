import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {Column, Editing, Scrolling} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import './Test.scss'
import reducer from './reducer';
import {
    saveChange, loadOrders, setChanges, setEditRowKey, FETCH_SUCCESS, SET_CHANGES,
} from './actions';
import {customerClassificationsService} from "../../lib/store/services/сustomerClassificationsService";
import {counterpartyFormatsService} from "../../lib/store/services/counterpartyFormatsService";

const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};

const loadPanelPosition = {of: '#gridContainer'};

function Test() {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [postCustomerClassifications] = customerClassificationsService.usePostCustomerClassificationsMutation()
    // const [putCustomerClassifications] = customerClassificationsService.useUpdateCustomerClassificationsMutation()
    // const {data, isLoading} = customerClassificationsService.useFetchCustomerClassificationsQuery('')


    useEffect(() => {
        loadOrders(dispatch);
    }, []);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0]);
    }, []);

    const onChangesChange = useCallback((changes) => {
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);
    // console.log(state)
    return (
        <React.Fragment>
            <LoadPanel
                position={loadPanelPosition}
                visible={state.isLoading}
            />
            <DataGrid
                id="gridContainer"
                keyExpr="id"
                dataSource={state.data}
                showBorders
                repaintChangesOnly
                onSaving={onSaving}>
                <Scrolling
                    mode={'virtual'}
                />
                <Editing
                    mode="row"
                    allowAdding
                    allowDeleting
                    allowUpdating
                    changes={state.changes}
                    onChangesChange={onChangesChange}
                    editRowKey={state.editRowKey}
                    onEditRowKeyChange={onEditRowKeyChange}
                />
                <Column dataField="id" allowEditing={false}/>
                <Column dataField="name" caption='Имя'/>
                <Column dataField="note" caption='Примечание'/>
                <Column dataField="sortIndex" caption='Сортировочный индекс' dataType={"number"}/>
            </DataGrid>

        </React.Fragment>
    );
}

export default Test;
