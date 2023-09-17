import React, {useCallback, useEffect, useReducer} from 'react';
import {Column, Editing, Form, Lookup, Popup,} from 'devextreme-react/data-grid';
import 'whatwg-fetch';
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {counterpartyFormatsService} from "../../../lib/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../../lib/services/сustomerClassificationsService";
import {counterpartyStatusService} from "../../../lib/services/counterpartyStatusService";
import {providerClassificationsService} from "../../../lib/services/providerClassificationsService";
import {subcontractorClassificationsService} from "../../../lib/services/subcontractorClassificationsService";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {ProcessClassifications, ProcessClassificationsObj} from '../../../generic/Function/ProcessClassifications';
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {dataFormItems} from "./columns/FormsItem";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";


export const Counterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const [state, dispatch] = useReducer(reducer, TableVariable);
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
        reSubcontractorClassifications()
    }, [URL, reCounterpartyFormats, reCounterpartyStatus, reCustomerClassifications, reProviderClassifications, reSubcontractorClassifications]);


    const onSaving = useCallback((e: any) => {
        ProcessClassifications(e, 'providerClassifications[0]', 'providerClassifications');
        ProcessClassifications(e, 'subcontractorClassifications[0]', 'subcontractorClassifications');

        ProcessClassificationsObj(e.changes[0].data, "counterpartyFormat");
        ProcessClassificationsObj(e.changes[0].data, "customerClassification");
        ProcessClassificationsObj(e.changes[0].data, "counterpartyStatus");
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

        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={state.data}
            onSaving={onSaving}
            dataOnInitNewRow={{
                isWithOutNDS: false,
                isCustomer: false,
                isSubcontractor: false,
                isProvider: false,
            }}
        >
            <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
                changes={state.changes}
                onChangesChange={onChangesChange}
                editRowKey={state.editRowKey}
                onEditRowKeyChange={onEditRowKeyChange}>
                <Popup title="Создание контрагента" showTitle={true}/>
                <Form>
                    {
                        dataFormItems.map((item, index) => (
                            <Item key={`counterparties-${item.itemCaption}-${index}`} caption={item.itemCaption}
                                  itemType="group" colCount={3} colSpan={2}>
                                {item.data.map((data) => (
                                    <Item key={`counterparties-${data.dataField}-${index}`}
                                          dataField={data.dataField}/>
                                ))}
                            </Item>
                        ))
                    }
                </Form>
            </Editing>
            <Column alignment={"center"} dataField="subcontractorClassifications[0].name" allowEditing={true}
                    visible={false}
                    caption={'Классификация субподрядчика'} dataType={"number"}
                    validationRules={validationRules}
            >
                <Lookup
                    dataSource={subcontractorClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"center"} dataField="providerClassifications[0].name" allowEditing={true}
                    visible={false}
                    caption={'Классификации поставщика'} dataType={'number'} validationRules={validationRules}>
                <Lookup
                    dataSource={providerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"center"} dataField="counterpartyFormat.id" allowEditing={true}
                    caption={'Формат контрагента'} dataType={"number"}
                    visible={false}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterpartyFormats}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"center"} dataField="customerClassification.id" allowEditing={true}
                    caption={'ID номер клиента'} dataType={"number"}
                    visible={false}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={customerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"center"} dataField="counterpartyStatus.id" allowEditing={true}
                    caption={'ID статуса контрагента'} dataType={"number"}
                    visible={false}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterpartyStatus}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column fixed={true} alignment={"center"} dataField="id" defaultSortOrder={"asc"} caption={'ID контрагента'} allowEditing={false}
                    dataType={"number"}/>
            <Column alignment={"center"} dataField="counterpartyFormat" allowEditing={true}
                    caption={'Формат контрагента'}>
                <Column alignment={"center"} dataField="counterpartyFormat.id" allowEditing={true}
                        caption={'ID'} dataType={"number"}>
                    <Lookup
                        dataSource={counterpartyFormats}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column alignment={"center"} dataField="counterpartyFormat.name" allowEditing={true}
                        caption={'Наименование'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyFormat.sortIndex" allowEditing={true}
                        caption={'Сортировочный индекс'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyFormat.isSmallFormatInn" allowEditing={true}
                        caption={'isSmallFormatInn'} dataType={"boolean"}/>
            </Column>
            <Column alignment={"center"} dataField="name" allowEditing={true}
                    caption={'Наименование контрагента'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="inn" allowEditing={true}
                    caption={'ИНН'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="isWithOutNDS" allowEditing={true}
                    caption={'Без НД'} dataType={"boolean"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="isCustomer" allowEditing={true}
                    caption={'Заказчик'} dataType={"boolean"}/>
            <Column alignment={"center"} dataField="customerClassification" allowEditing={true}
                    caption={'Классификация заказчика'}>
                <Column alignment={"center"} dataField="customerClassification.id" allowEditing={false}
                        caption={'ID'} dataType={"number"}/>
                <Column alignment={"center"} dataField="customerClassification.name" allowEditing={true}
                        caption={'Наименование'} dataType={"string"}/>
                <Column alignment={"center"} dataField="customerClassification.sortIndex" allowEditing={true}
                        caption={'Сортировочный индекс'} dataType={"number"}/>
                <Column alignment={"center"} dataField="customerClassification.note" allowEditing={true}
                        caption={'Примечание'} dataType={"string"}/>
            </Column>
            <Column alignment={"center"} dataField="isSubcontractor" allowEditing={true}
                    caption={'Субподрядчик'} dataType={"boolean"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="subcontractorClassifications[0]" allowEditing={true}
                    caption={'Классификация субподрядчика'}>
                <Column alignment={"center"} dataField="subcontractorClassifications[0].id" allowEditing={true}
                        caption={'ID'} dataType={"number"}/>
                <Column alignment={"center"} dataField="subcontractorClassifications[0].name" allowEditing={true}
                        caption={'Наименование'} dataType={"string"}/>
                <Column alignment={"center"} dataField="subcontractorClassifications[0].sortIndex" allowEditing={true}
                        caption={'Сортировочный индекс'} dataType={"number"}/>
                <Column alignment={"center"} dataField="subcontractorClassifications[0].note" allowEditing={true}
                        caption={'Примечание'} dataType={"string"}/>
            </Column>
            <Column alignment={"center"} dataField="isProvider" allowEditing={true}
                    caption={'Поставщик'} dataType={"boolean"}/>
            <Column allowEditing={true}
                    caption={'Классификация поставщика'}>
                <Column allowEditing={true}
                        alignment={"center"} dataField={'providerClassifications[0].id'}
                        dataType={"number"}
                        caption={"ID"}
                />
                <Column alignment={"center"} dataField="providerClassifications[0].name" allowEditing={false}
                        caption={'Наименование'} dataType={"string"}/>
                <Column alignment={"center"} dataField="providerClassifications[0].sortIndex" allowEditing={false}
                        caption={'Сортировочный индекс'} dataType={"number"}/>
                <Column alignment={"center"} dataField="providerClassifications[0].note" allowEditing={false}
                        caption={'Примечание'} dataType={"string"}/>
            </Column>

            <Column alignment={"center"} dataField="counterpartyStatus" allowEditing={true}
                    caption={'Статус контрагента'}>
                <Column alignment={"center"} dataField="counterpartyStatus.id" allowEditing={false}
                        caption={'ID'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyStatus.name" allowEditing={true}
                        caption={'Наименование'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyStatus.sortIndex" allowEditing={true}
                        caption={'Сортировочный индекс'} dataType={"number"}/>
            </Column>

            <Column alignment={"center"} dataField='counterpartyContactPersons[0]' allowEditing={true}
                    caption={'Контактная информация по контрагенту'}>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].id" allowEditing={true}
                        caption={'ID'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].lastName" allowEditing={true}
                        caption={'Фамилия'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].firstName" allowEditing={true}
                        caption={'Имя'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].patronymicName" allowEditing={true}
                        caption={'Отчество'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].phone" allowEditing={true}
                        caption={'Телефон'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].mobilePhone" allowEditing={true}
                        caption={'Мобильный телефон'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].email" allowEditing={true}
                        caption={'Почта'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].note" allowEditing={true}
                        caption={'Примечание'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyContactPersons[0].isMain" allowEditing={true}
                        caption={'Основной'} dataType={"boolean"}/>
            </Column>
            <Column alignment={"center"} dataField="note" allowEditing={true}
                    caption={'Примечание по контрагенту'} dataType={"string"}/>
        </CustomDataGrid>
    )
}
