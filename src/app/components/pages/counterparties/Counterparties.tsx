import React, {useCallback, useEffect, useReducer, useState} from 'react';
import DataGrid, {Column, Editing, Form, Lookup, Popup,} from 'devextreme-react/data-grid';
import 'whatwg-fetch';
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {counterpartyFormatsService} from "../../../lib/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../../lib/services/сustomerClassificationsService";
import {counterpartyStatusService} from "../../../lib/services/counterpartyStatusService";
import {providerClassificationsService} from "../../../lib/services/providerClassificationsService";
import {subcontractorClassificationsService} from "../../../lib/services/subcontractorClassificationsService";
import {ProcessClassifications, ProcessClassificationsObj} from '../../../generic/Function/ProcessClassifications';
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";
import {onInitNewRow} from "../../../generic/Function/OnInitNewRow";


export const Counterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')

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

    const dataWithFullName = state.data.map((item) => {

        if (item.counterpartyContactPersons.length === 0) {
            item.counterpartyContactPersons = [{isMain: false}]
        } else {
            item.counterpartyContactPersons.map((data) => {
                data['fullName'] = [data.lastName, data.firstName, data.patronymicName].join(' ')
            })
        }

        return item
    });
    return (

        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={dataWithFullName}
            onSaving={onSaving}
            dataOnInitNewRow={{
                isWithOutNDS: false,
                isCustomer: false,
                isSubcontractor: false,
                isProvider: false,
                isMain: false,
            }}

        >
            <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
                changes={state.changes}
                onChangesChange={useCallback((e) => OnChangesChange(dispatch, e, setTitleMethod), [])}
                editRowKey={state.editRowKey}
                onEditRowKeyChange={useCallback((e) => OnEditRowKeyChange(dispatch, e, setTitleMethod), [])}
            >
                <Popup title={`${titleMethod} контрагента`} showTitle={true}/>
                <Form colCount={2}>
                    <Item dataField={'counterpartyFormat.id'}/>
                    <Item dataField={'name'}/>
                    <Item dataField={'inn'}/>
                    <Item dataField={'customerClassification.id'}/>
                    <Item dataField={'counterpartyStatus.id'}/>
                    <Item dataField={'providerClassifications[0].id'}/>
                    <Item dataField={'subcontractorClassifications[0].id'}/>
                    <Item dataField={'isSubcontractor'}/>
                    <Item dataField={'isProvider'}/>
                    <Item dataField={'isWithOutNDS'}/>
                    <Item dataField={'isCustomer'}/>
                    <Item dataField={'note'} editorType={'dxTextArea'} colSpan={2}/>
                </Form>
            </Editing>

            <Column alignment={"left"} dataField="counterpartyFormat.id"
                    caption={'Формат контрагента'} dataType={"string"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterpartyFormats}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="customerClassification.id"
                    caption={'Классификация заказчика'} dataType={"string"}
                    validationRules={validationRules} visible={false}>
                <Lookup
                    dataSource={customerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="counterpartyStatus.id"
                    caption={'Статус контрагента'} dataType={"string"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterpartyStatus}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="providerClassifications[0].id"
                    caption={'Классификация поставщика'} dataType={"string"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={providerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="subcontractorClassifications[0].id"
                    caption={'Классификация субподрядчика'} dataType={"string"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={subcontractorClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column fixed={true} alignment={"left"} dataField="id" defaultSortOrder={"asc"} caption={'ID контрагента'}
                    allowEditing={false}
                    dataType={"number"}/>
            <Column alignment={"left"} dataField="name"
                    caption={'Наименование контрагента'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="inn"
                    caption={'ИНН'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="isWithOutNDS"
                    caption={'Без НДC'} dataType={"boolean"}/>
            <Column alignment={"left"} dataField="isCustomer"
                    caption={'Заказчик'} dataType={"boolean"}/>
            <Column alignment={"center"} dataField="isSubcontractor"
                    caption={'Субподрядчик'} dataType={"boolean"}/>
            <Column alignment={"center"} dataField="isProvider"
                    caption={'Поставщик'} dataType={"boolean"}/>

            <Column alignment={"left"} dataField='counterpartyContactPersons'
                    caption={'Контактная информация по контрагенту'}
                    cellRender={(dataCell) => (
                        dataCell.value[0].id &&
                        <DataGrid
                            dataSource={dataCell.value}
                            width="100rem"
                            onInitNewRow={(e) => onInitNewRow(e, {isMain: false})}
                        >
                            <Column alignment={"left"} dataField="id"
                                    caption={'ID'} dataType={"number"}/>
                            <Column alignment={"left"} dataField="fullName"
                                    caption={'Ф.И.О'} dataType={"string"}/>
                            <Column alignment={"left"} dataField="phone"
                                    caption={'Рабочий телефон'} dataType={"string"}/>
                            <Column alignment={"left"} dataField="mobilePhone"
                                    caption={'Мобильный телефон'} dataType={"string"}/>
                            <Column alignment={"left"} dataField="email"
                                    caption={'Почта'} dataType={"string"}/>
                            <Column alignment={"left"} dataField="note"
                                    caption={'Примечание'} dataType={"string"}/>
                            <Column alignment={"left"} dataField="isMain"
                                    caption={'Основной'} allowEditing={false} dataType={"boolean"}/>
                        </DataGrid>
                    )}
            >
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].id"*/}
                {/*        caption={'ID'} dataType={"number"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].fullName"*/}
                {/*        caption={'Ф.И.О'} dataType={"string"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].phone"*/}
                {/*        caption={'Рабочий телефон'} dataType={"string"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].mobilePhone"*/}
                {/*        caption={'Мобильный телефон'} dataType={"string"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].email"*/}
                {/*        caption={'Почта'} dataType={"string"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].note"*/}
                {/*        caption={'Примечание'} dataType={"string"}/>*/}
                {/*<Column alignment={"left"} dataField="counterpartyContactPersons[0].isMain"*/}
                {/*        caption={'Основной'} allowEditing={false} dataType={"boolean"}/>*/}
            </Column>
            <Column alignment={"left"} dataField="note"
                    caption={'Примечание по контрагенту'} dataType={"string"}/>
        </CustomDataGrid>
    )
}
