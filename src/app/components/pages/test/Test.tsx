import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, { Column, Editing, Scrolling } from 'devextreme-react/data-grid';
import { LoadPanel } from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import './Test.scss'
import reducer from './reducer';
import {
    saveChange, loadOrders, setChanges, setEditRowKey,
} from './actions';

const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};

const loadPanelPosition = { of: '#gridContainer' };

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

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
                <Column dataField="id" allowEditing={false}></Column>
                <Column dataField="firstName"></Column>
                <Column dataField="email"></Column>
                <Column dataField="phone"></Column>
                <Column dataField="secondName"></Column>
                <Column dataField="OrderDate" dataType="date"></Column>
                <Column dataField="Freight"></Column>
            </DataGrid>

        </React.Fragment>
    );
}

export default App;
