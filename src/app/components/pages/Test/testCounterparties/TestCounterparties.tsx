import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Lookup, Popup} from 'devextreme-react/data-grid';

import CounterpartyContactPersons from "./subtable/CounterpartyContactPersons/CounterpartyContactPersons";
import './TestCounterparties.scss'
import reducer from '../../../../../core/lib/api/reducer';
import {TableVariable} from '../../../../generic/Variable/TableVariable';
import urls from "../../../../lib/urls";
import {counterpartyFormatsService} from "../../../../lib/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../../../lib/services/сustomerClassificationsService";
import {counterpartyStatusService} from "../../../../lib/services/counterpartyStatusService";
import {providerClassificationsService} from "../../../../lib/services/providerClassificationsService";
import {subcontractorClassificationsService} from "../../../../lib/services/subcontractorClassificationsService";
import {loadOrders, saveChange, setChanges} from "../../../../../core/lib/api/actions";
import {ProcessClassifications, ProcessClassificationsObj} from '../../../../generic/Function/ProcessClassifications';
import {CustomDataGrid} from "../../../UI/CustomDataGrid/CustomDataGrid";
import {OnEditRowKeyChange} from "../../../../generic/Function/OnEditRowKeyChange";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../../generic/ValidationRules/ValidationRules";
import ColumnElement from "../../../UI/ColumnElement/ColumnElement";
import {CheckBox} from "devextreme-react";


export const TestCounterparties = () => {
    const URL: string = urls.COUNTERPARTIES
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')
    const [subTableId, setSubTableId] = useState<number>(0)
    const [stateValid, setStateValid] = useState<any>({
        isCustomer: false,
        isSubcontractor: false,
        isProvider: false,
    })


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

        ProcessClassifications(e, 'providerClassifications');
        ProcessClassifications(e, 'subcontractorClassifications');

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

    const OnChangesChange = (dispatch, changes, setTitleMethod) => {
        setTitleMethod("Создать")
        if (changes.length !== 0) {
            setStateValid(changes[0].data)
        }
        setChanges(dispatch, changes);
    }


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
                onEditRowKeyChange={useCallback((e) => {
                    OnEditRowKeyChange(dispatch, e, setTitleMethod)
                    setSubTableId(e)
                }, [])}
            >
                <Popup title={`${titleMethod} контрагента`} showTitle={true}/>
                <Form colCount={2}>
                    <Item dataField={'counterpartyFormat.id'}/>
                    <Item dataField={'name'}/>
                    <Item dataField={'inn'}/>
                    <Item dataField={'customerClassification.id'}
                          validationRules={stateValid.isCustomer && validationRules}/>
                    <Item dataField={'counterpartyStatus.id'}/>
                    <Item dataField={'providerClassifications'} editorType={'dxTagBox'}
                          validationRules={stateValid.isProvider && validationRules}/>
                    <Item dataField={'subcontractorClassifications'} editorType={'dxTagBox'}
                          validationRules={stateValid.isSubcontractor && validationRules}/>
                    <Item dataField={'isSubcontractor'}/>
                    <Item dataField={'isProvider'} />
                    <Item dataField={'isWithOutNDS'}/>
                    <Item dataField={'isCustomer'}/>
                    <Item dataField={'note'} editorType={'dxTextArea'} colSpan={2}/>
                    {
                        state.data.find((d) => d.id === subTableId) &&
                        <Item itemType={"group"} caption={'Контактная информация по контрагенту'} colSpan={2}>
                            {state.data.map((itemData) => itemData.id === subTableId &&
                                <CounterpartyContactPersons dataCell={itemData}/>)}
                        </Item>
                    }

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
            >
                <Lookup
                    dataSource={customerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="counterpartyStatus.id"
                    caption={'Статус контрагента'} dataType={"string"}
            >
                <Lookup
                    dataSource={counterpartyStatus}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"}
                    dataField="providerClassifications"
                    caption={'Классификация поставщика'}
                    dataType={"number"}
                    cellRender={
                        (data) => <ColumnElement data={data}
                                                 keyBlock={'counterparties-providerClassifications'}/>
                    }
            >
                <Lookup
                    dataSource={providerClassifications}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"}
                    dataField="subcontractorClassifications"
                    caption={'Классификация субподрядчика'}
                    dataType={"string"}
                    cellRender={
                        (data) => <ColumnElement data={data}
                                                 keyBlock={'counterparties-subcontractorClassifications'}/>
                    }
            >
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
            <Column alignment={"center"} dataField="isCustomer"
                    caption={'Заказчик'} dataType={"boolean"}/>
            <Column alignment={"center"} dataField="isSubcontractor"
                    caption={'Субподрядчик'} dataType={"boolean"}/>
            <Column alignment={"center"} dataField="isProvider"
                    caption={'Поставщик'} dataType={"boolean"}/>

            <Column alignment={"left"} dataField="note"
                    caption={'Примечание по контрагенту'} dataType={"string"}/>
        </CustomDataGrid>
    )
}
