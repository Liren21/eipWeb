import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    HeaderFilter, Lookup,
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
import {counterpartyFormatsService} from "../../lib/store/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../lib/store/services/сustomerClassificationsService";


const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export const Counterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const [state, dispatch] = useReducer(reducer, initialState);
    const {data: counterpartyFormats, refetch: reCounterpartyFormats} = counterpartyFormatsService.useFetchCounterpartyFormatsQuery('')
    const {data: customerClassifications, refetch: reCustomerClassifications} = customerClassificationsService.useFetchCustomerClassificationsQuery('')

    useEffect(() => {
        loadOrders(dispatch, URL);
        reCustomerClassifications()
        reCounterpartyFormats()//TODO : исправить, оно не должно вызываться каждый раз когда пользователь вызывает данный компонент, так же, избавить от дубликатов, придумать шаблон.
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
                columnWidth={180}
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
                <Column fixed={true} dataField="id" caption={'Идентификатор'} allowEditing={false} dataType={"number"}/>
                <Column dataField="counterpartyFormatId" caption={'Идентификатор формата контрагента'} allowEditing={false} dataType={"number"}/>
                <Column dataField="name" caption={'Имя'} allowEditing={true} dataType={"string"}/>
                <Column dataField="inn" caption={'ИНН'} allowEditing={false} dataType={"string"}/>
                <Column dataField="sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                        dataType={"number"}/>
                <Column dataField="isSmallFormatInn" caption={'isSmallFormatInn'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isWithOutNDS" caption={'Продается без учета НДС'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isCustomer" caption={'Клиент'} allowEditing={false} dataType={"boolean"}/>
                <Column dataField="customerClassificationId" caption={'идентификационный номер клиента'}
                        allowEditing={false}
                        dataType={"number"}/>
                <Column dataField="isSubcontractor" caption={'Субподрядчик'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isProvider" caption={'Поставщик'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="counterpartyStatusId" caption={'Идентификатор статуса контрагента'}
                        allowEditing={false}
                        dataType={"number"}/>
                <Column dataField="note" caption={'Примечание'} allowEditing={false}
                        dataType={"string"}/>
                <Column dataField="counterpartyFormat"
                        caption={'Формат контрагента'}>
                    <Lookup
                        dataSource={counterpartyFormats}
                        valueExpr="id"
                        displayExpr={(data) => (
                            data.id
                        )}
                    />
                </Column>
                <Column dataField="customerClassification"
                        caption={'Классификация заказчика'}>
                    <Lookup
                        dataSource={customerClassifications}
                        valueExpr="id"
                        displayExpr={(data) => (
                            data.id
                        )}
                    />
                </Column>
                <Column dataField="subcontractorClassifications"
                        caption={'Классификация субподрядчика'}>
                    <Lookup
                        dataSource={state.data}
                        valueExpr="id"
                        displayExpr={(data) => (
                            data.id
                        )}
                    />
                </Column>
                <Column dataField="providerClassifications"
                        caption={'Классификация поставщика'}>
                    <Lookup
                        dataSource={state.data}
                        valueExpr="id"
                        displayExpr={(data) => (
                            data.id
                        )}
                    />
                </Column>
                <Column dataField="counterpartyStatus"
                        caption={'Статус контрагента'}>
                    <Lookup
                        dataSource={state.data}
                        valueExpr="id"
                        displayExpr={(data) => (
                            data.id
                        )}
                    />
                </Column>
                {/*<Column dataField="counterpartyFormat" caption={'Формат контрагента'} allowEditing={false}>*/}
                {/*    <Column dataField="counterpartyFormat.id" caption={'Идентификатор'} allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="counterpartyFormat.name" caption={'Имя'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*    <Column dataField="counterpartyFormat.sortIndex" caption={'Сортировочный индекс'}*/}
                {/*            allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="counterpartyFormat.note" caption={'Примечание'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*</Column>*/}
                {/*<Column dataField="customerClassification" caption={'Классификация заказчика'} allowEditing={false}>*/}
                {/*    <Column dataField="customerClassification.id" caption={'Идентификатор'} allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="customerClassification.name" caption={'Имя'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*    <Column dataField="customerClassification.sortIndex" caption={'Сортировочный индекс'}*/}
                {/*            allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="customerClassification.note" caption={'Примечание'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*</Column>*/}
                {/*<Column dataField="counterpartyStatus" caption={'Статус контрагента'} allowEditing={false}>*/}
                {/*    <Column dataField="counterpartyStatus.id" caption={'Идентификатор'} allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="counterpartyStatus.name" caption={'Имя'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*    <Column dataField="counterpartyStatus.sortIndex" caption={'Сортировочный индекс'}*/}
                {/*            allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*</Column>*/}
                {/*<Column dataField="providerClassifications" caption={'Классификация поставщиков'} allowEditing={false}>*/}
                {/*    <Column dataField="providerClassifications.id" caption={'Идентификатор'} allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="providerClassifications.name" caption={'Имя'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*    <Column dataField="providerClassifications.sortIndex" caption={'Сортировочный индекс'}*/}
                {/*            allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="providerClassifications.note" caption={'Записка'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*</Column>*/}
                {/*<Column dataField="subcontractorClassifications" caption={'Классификация субподрядчиков'}*/}
                {/*        allowEditing={false}>*/}
                {/*    <Column dataField="subcontractorClassifications.id" caption={'Идентификатор'} allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="subcontractorClassifications.name" caption={'Имя'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*    <Column dataField="subcontractorClassifications.sortIndex" caption={'Сортировочный индекс'}*/}
                {/*            allowEditing={false}*/}
                {/*            dataType={"number"}/>*/}
                {/*    <Column dataField="subcontractorClassifications.note" caption={'Примечание'} allowEditing={false}*/}
                {/*            dataType={"string"}/>*/}
                {/*</Column>*/}
            </DataGrid>

        </React.Fragment>
    );
}
