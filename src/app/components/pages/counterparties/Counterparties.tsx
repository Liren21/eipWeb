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
import reducer from '../../lib/func/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../lib/func/actions';
import urls from "../../lib/urls";
import {Item} from "devextreme-react/form";
import {counterpartyFormatsService} from "../../lib/store/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../lib/store/services/сustomerClassificationsService";
import {counterpartyStatusService} from "../../lib/store/services/counterpartyStatusService";
import {providerClassificationsService} from "../../lib/store/services/providerClassificationsService";
import {subcontractorClassificationsService} from "../../lib/store/services/subcontractorClassificationsService";


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
    const {
        data: counterpartyFormats,
        refetch: reCounterpartyFormats
    } = counterpartyFormatsService.useFetchCounterpartyFormatsQuery('')
    const {
        data: customerClassifications,
        refetch: reCustomerClassifications
    } = customerClassificationsService.useFetchCustomerClassificationsQuery('')
    const {
        data: counterpartyStatus,
        refetch: reCounterpartyStatus
    } = counterpartyStatusService.useFetchCounterpartyStatusQuery('')
    const {
        data: providerClassifications,
        refetch: reProviderClassifications
    } = providerClassificationsService.useFetchProviderClassificationsServiceQuery('')
    const {
        data: subcontractorClassifications,
        refetch: reSubcontractorClassifications
    } = subcontractorClassificationsService.useFetchSubcontractorClassificationsQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterpartyFormats()
        reCustomerClassifications()
        reCounterpartyStatus()
        reProviderClassifications()
    }, [URL]);

    const onSaving = useCallback((e: any) => {

        if (e.changes[0].data && e.changes[0].data.providerClassifications) {//todo вывести в одну функцию
            const providerClassifications = e.changes[0].data.providerClassifications
            delete e.changes[0].data.providerClassifications
            e.changes[0].data['providerClassifications'] = [{id: providerClassifications}]
        }

        if (e.changes[0].data && e.changes[0].data.subcontractorClassifications) {//todo вывести в одну функцию
            const subcontractorClassifications = e.changes[0].data.subcontractorClassifications
            delete e.changes[0].data.subcontractorClassifications
            e.changes[0].data['subcontractorClassifications'] = [{id: subcontractorClassifications}]
        }

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
                    <Popup title="Employee Info" showTitle={true} width={700} height={525}/>
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
                            <Item dataField="counterpartyFormatId"/>
                            <Item dataField="name"/>
                            <Item dataField="inn"/>
                            <Item dataField="isWithOutNDS"/>
                            <Item dataField="isCustomer"/>
                            <Item dataField="customerClassificationId"/>
                            <Item dataField="isSubcontractor"/>
                            <Item dataField="isProvider"/>
                            <Item dataField="counterpartyStatusId"/>
                            <Item dataField="providerClassifications"/>
                            <Item dataField="subcontractorClassifications"/>
                            <Item dataField="note"/>
                        </Item>
                    </Form>
                </Editing>
                <Column fixed={true} dataField="id" caption={'Идентификатор'} allowEditing={false} dataType={"number"}/>
                <Column dataField="counterpartyFormatId" allowEditing={true}
                        caption={'Идентификатор формы контрагента'} dataType={"number"}>
                    <Lookup
                        dataSource={counterpartyFormats}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column dataField="name" allowEditing={true}
                        caption={'Имя'} dataType={"string"}/>
                <Column dataField="inn" allowEditing={true}
                        caption={'ИНН'} dataType={"string"}/>
                <Column dataField="isWithOutNDS" allowEditing={true}
                        caption={'Указана без учета НДС'} dataType={"boolean"}/>
                <Column dataField="isCustomer" allowEditing={true}
                        caption={'Заказчик'} dataType={"boolean"}/>
                <Column dataField="customerClassificationId" allowEditing={true}
                        caption={'Идентификационный номер клиента'} dataType={"number"}>
                    <Lookup
                        dataSource={customerClassifications}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column dataField="isSubcontractor" allowEditing={true}
                        caption={'Субподрядчик'} dataType={"boolean"}/>
                <Column dataField="isProvider" allowEditing={true}
                        caption={'Поставщик'} dataType={"boolean"}/>
                <Column dataField="counterpartyStatusId" allowEditing={true}
                        caption={'Идентификатор статуса контрагента'} dataType={"number"}>
                    <Lookup
                        dataSource={counterpartyStatus}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column dataField="note" allowEditing={true}
                        caption={'Заметка'} dataType={"string"}/>
                <Column dataField="counterpartyFormat" allowEditing={true}
                        caption={'Формат контрагента'}>
                    <Column dataField="counterpartyFormat.id" allowEditing={true}
                            caption={'id'} dataType={"number"}/>
                    <Column dataField="counterpartyFormat.name" allowEditing={true}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="counterpartyFormat.sortIndex" allowEditing={true}
                            caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="counterpartyFormat.isSmallFormatInn" allowEditing={true}
                            caption={'isSmallFormatInn'} dataType={"boolean"}/>
                </Column>

                <Column dataField="customerClassification" allowEditing={true}
                        caption={'Классификация клиентов'}>
                    <Column dataField="customerClassification.id" allowEditing={true}
                            caption={'id'} dataType={"number"}/>
                    <Column dataField="customerClassification.name" allowEditing={true}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="customerClassification.sortIndex" allowEditing={true}
                            caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="customerClassification.note" allowEditing={true}
                            caption={'Заметка'} dataType={"string"}/>
                </Column>

                <Column dataField="counterpartyStatus" allowEditing={true}
                        caption={'Статус контрагента'}>
                    <Column dataField="counterpartyStatus.id" allowEditing={true}
                            caption={'id'} dataType={"number"}/>
                    <Column dataField="counterpartyStatus.name" allowEditing={true}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="counterpartyStatus.sortIndex" allowEditing={true}
                            caption={'Сортировочный индекс'} dataType={"number"}/>
                </Column>

                <Column allowEditing={true}
                        caption={'Классификации поставщиков'}>
                    <Column allowEditing={true}
                            dataField={'providerClassifications[0].id'}
                            dataType={"number"}/>
                    <Column dataField="providerClassifications[0].name" allowEditing={false}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="providerClassifications[0].sortIndex" allowEditing={false}
                            caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="providerClassifications[0].note" allowEditing={false}
                            caption={'Заметка'} dataType={"string"}/>
                </Column>


                <Column dataField="providerClassifications" allowEditing={true}
                        visible={false}
                        caption={'Классификации поставщиков'} dataType={'object'}>
                    <Lookup
                        dataSource={providerClassifications}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column allowEditing={true}
                        caption={'Классификация субподрядчиков'}>
                    <Column dataField="subcontractorClassifications[0].id" allowEditing={true}
                            caption={'id'} dataType={"number"}/>
                    <Column dataField="subcontractorClassifications[0].name" allowEditing={true}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="subcontractorClassifications[0].sortIndex" allowEditing={true}
                            caption={'Сортировочный индекс'} dataType={"number"}/>
                    <Column dataField="subcontractorClassifications[0].note" allowEditing={true}
                            caption={'Заметка'} dataType={"string"}/>
                </Column>

                <Column dataField="subcontractorClassifications" allowEditing={true}
                        visible={false}
                        caption={'Классификация субподрядчиков'} dataType={'object'}>
                    <Lookup
                        dataSource={subcontractorClassifications}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

            </DataGrid>
        </React.Fragment>
    );
}
