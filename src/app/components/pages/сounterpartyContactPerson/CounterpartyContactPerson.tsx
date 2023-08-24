import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {Button, Column, Editing, HeaderFilter, Scrolling, Search} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import './СounterpartyContactPerson.scss'
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

function CounterpartyContactPerson() {
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
                showBorders
                repaintChangesOnly
                onSaving={onSaving}
                columnWidth={150}
            >
                <Scrolling
                    columnRenderingMode={"virtual"}
                    mode={'virtual'}
                />
                <HeaderFilter visible={true}>
                    <Search enabled={true} />
                </HeaderFilter>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                    changes={state.changes}
                    onChangesChange={onChangesChange}
                    editRowKey={state.editRowKey}
                    onEditRowKeyChange={onEditRowKeyChange}
                />
                <Column fixed dataField="id" allowEditing={false}/>
                <Column dataField="counterpartyFormatId" caption='идентификатор формы контрагента' dataType={"number"}/>
                <Column dataField="name" caption='Имя'/>
                <Column dataField="inn"/>
                <Column dataField="isWithOutNDS" dataType={"boolean"}/>
                <Column dataField="isCustomer" dataType={"boolean"}/>
                <Column dataField="customerClassificationId"  caption={'Идентификатор классификации клиента'} dataType={"number"}/>
                <Column dataField="isSubcontractor"  caption={'Является субподрядчиком'} dataType={"boolean"}/>
                <Column dataField="isProvider"  caption={'Поставщик'} dataType={"boolean"}/>
                <Column dataField="counterpartyStatusId"  caption={'идентификатор статуса контрагента'} dataType={"number"}/>
                <Column dataField="note" caption='Примечание'/>
                <Column dataField="counterpartyFormat" caption='Формат контрагента'>
                    <Column dataField="id" dataType={"number"}/>
                    <Column dataField="name" caption={'Имя'} dataType={"string"}/>
                    <Column dataField="sortIndex" caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="isSmallFormatInn" caption={'Это небольшой формат'} dataType={"boolean"}/>
                </Column>
                <Column dataField="customerClassification" caption='Классификация клиентов'>
                    <Column dataField="id" dataType={"number"}/>
                    <Column dataField="name" caption={'Имя'} dataType={"string"}/>
                    <Column dataField="sortIndex" caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="note" caption='Примечание'/>
                </Column>
                <Column dataField="counterpartyStatus" caption='Статус контрагента'>
                    <Column dataField="id" dataType={"number"}/>
                    <Column dataField="name" caption={'Имя'} dataType={"string"}/>
                    <Column dataField="sortIndex" caption={'Сортировочный индекс'} dataType={"number"}/>
                </Column>
                <Column dataField="providerClassifications" caption='Классификации поставщиков'>
                    <Column dataField="id" dataType={"number"}/>
                    <Column dataField="name" caption={'Имя'} dataType={"string"}/>
                    <Column dataField="sortIndex" caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="note" caption='Примечание'/>
                </Column>
                <Column dataField="subcontractorClassifications" caption='Классификации субподрядчиков'>
                    <Column dataField="id" dataType={"number"}/>
                    <Column dataField="name" caption={'Имя'} dataType={"string"}/>
                    <Column dataField="sortIndex" caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="note" caption='Примечание'/>
                </Column>
            </DataGrid>

        </React.Fragment>
    );
}

export default CounterpartyContactPerson;
