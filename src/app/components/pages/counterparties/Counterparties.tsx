import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {Column, Editing, FilterRow, Form, HeaderFilter, Lookup, Popup, Scrolling, Search} from 'devextreme-react/data-grid';
import {Item} from 'devextreme-react/form';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import reducer from '../../lib/func/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../lib/func/actions';
import urls from "../../lib/urls";
import {customerClassificationsService} from "../../lib/store/services/сustomerClassificationsService";
import {subcontractorClassificationsService} from "../../lib/store/services/subcontractorClassificationsService";
import {providerClassificationsService} from "../../lib/store/services/providerClassificationsService";
import {counterpartyStatusService} from "../../lib/store/services/counterpartyStatusService";


const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};

export const Counterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const validationRules: any = [{type: 'required', message: 'Это поле должно быть заполнено!'}]
    const [state, dispatch] = useReducer(reducer, initialState);


    // const {data: counterpartyFormats} = counterpartyFormatsService.useFetchCounterpartyFormatsQuery('')
    const {data: customerClassifications} = customerClassificationsService.useFetchCustomerClassificationsQuery('')
    const {data: subcontractorClassifications} = subcontractorClassificationsService.useFetchSubcontractorClassificationsQuery('')
    const {data: providerClassifications} = providerClassificationsService.useFetchProviderClassificationsServiceQuery('')
    const {data: counterpartyStatus} = counterpartyStatusService.useFetchCounterpartyStatusQuery('')

    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        console.log(changes)
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
                    onEditRowKeyChange={onEditRowKeyChange}>

                    <Popup showTitle={true} width={700} height={525}/>
                    <Form>
                        <Item itemType="group" colCount={3} colSpan={2}>
                            <Item dataField="name"/>
                            <Item dataField="note"/>
                            <Item dataField="inn"/>
                            <Item dataField="counterpartyFormatId"/>
                            <Item dataField="customerClassificationId"/>
                            <Item dataField="counterpartyStatusId"/>
                            <Item dataField="providerClassifications.id"/>
                            <Item dataField="subcontractorClassifications.id"/>
                            <Item dataField="isWithOutNDS"/>
                            <Item dataField="isCustomer"/>
                        </Item>
                    </Form>
                </Editing>

                <Column fixed={true} dataField="id" caption={'Идентификатор'} allowEditing={false} dataType={"number"}/>
                <Column allowEditing={true} dataField="counterpartyFormatId"
                        caption={'Идентификатор формата контрагента'}
                        validationRules={validationRules}
                >
                    <Lookup
                        dataSource={customerClassifications}
                        valueExpr="id"
                        displayExpr={'id'}
                    />
                </Column>
                <Column dataField="name" caption={'Имя'} allowEditing={true} dataType={"string"}
                        validationRules={validationRules}/>
                <Column dataField="inn" caption={'ИНН'} allowEditing={true} dataType={"string"}
                        validationRules={validationRules}/>
                <Column dataField="isWithOutNDS" caption={'Продается без учета НДС'} allowEditing={true}
                        dataType={"boolean"} validationRules={validationRules}/>
                <Column dataField="isCustomer" caption={'Клиент'} allowEditing={true} dataType={"boolean"}
                        validationRules={validationRules}/>
                <Column dataField="customerClassificationId"
                        caption={'Классификация заказчика'}
                        validationRules={validationRules}
                >
                    <Lookup
                        dataSource={customerClassifications}
                        valueExpr="id"
                        displayExpr={'id'}
                    />
                </Column>
                <Column dataField="isSubcontractor" caption={'Субподрядчик'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isProvider" caption={'Поставщик'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="counterpartyStatusId"
                        caption={'Классификация заказчика'}
                        validationRules={validationRules}
                >
                    <Lookup
                        dataSource={counterpartyStatus}
                        valueExpr="id"
                        displayExpr={'id'}
                    />
                </Column>
                <Column dataField="note" caption={'Примечание'} allowEditing={true}
                        dataType={"string"} validationRules={validationRules}/>

                <Column dataField="counterpartyFormat" caption={'Формат контрагента'} allowEditing={false}>
                    <Column dataField="counterpartyFormat.id" caption={'Идентификатор'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyFormat.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="counterpartyFormat.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyFormat.note" caption={'Примечание'} allowEditing={false}
                            dataType={"string"}/>
                </Column>

                <Column dataField="customerClassification" caption={'Классификация субподрядчиков'}
                        allowEditing={true}>
                    <Column dataField="customerClassification.id"
                            caption={'Классификация субподрядчика'}
                    />
                    <Column dataField="customerClassification.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="customerClassification.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="customerClassification.note" caption={'Примечание'} allowEditing={false}
                            dataType={"string"}/>
                </Column>

                <Column dataField="counterpartyStatus" caption={'Статус контрагента'} allowEditing={false}>
                    <Column dataField="counterpartyStatus.id" caption={'Идентификатор'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyStatus.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="counterpartyStatus.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false}
                            dataType={"number"}/>
                </Column>
                <Column dataField="providerClassifications" caption={'Классификация поставщиков'} allowEditing={true}>
                    <Column dataField="providerClassifications.id"
                            caption={'Классификация поставщика'}
                            validationRules={validationRules}
                    >
                        <Lookup
                            dataSource={providerClassifications}
                            valueExpr="id"
                            displayExpr={'id'}
                        />
                    </Column>
                    <Column dataField="providerClassifications.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="providerClassifications.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="providerClassifications.note" caption={'Записка'} allowEditing={false}
                            dataType={"string"}/>
                </Column>

                <Column dataField="subcontractorClassifications" caption={'Классификация субподрядчиков'}
                        allowEditing={true}>
                    <Column dataField="subcontractorClassifications.id"
                            caption={'Классификация субподрядчика'}
                            validationRules={validationRules}
                    >
                        <Lookup
                            dataSource={subcontractorClassifications}
                            valueExpr="id"
                            displayExpr={'id'}
                        />
                    </Column>
                    <Column dataField="subcontractorClassifications.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="subcontractorClassifications.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="subcontractorClassifications.note" caption={'Примечание'} allowEditing={false}
                            dataType={"string"}/>
                </Column>

            </DataGrid>

        </React.Fragment>
    );
}
