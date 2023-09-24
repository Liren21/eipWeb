import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
import {Column, Editing, Form, Lookup, Popup,} from 'devextreme-react/data-grid';
import 'whatwg-fetch';
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {counterpartiesService} from "../../../lib/services/counterpartiesService";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from '../../../generic/Variable/TableVariable';


export const CounterpartyContactPersons = () => {
    const URL = useMemo(() => urls.COUNTERPARTY_CONTACT_PERSONS, []);
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const {data: counterparties, refetch: reCounterparties} = counterpartiesService.useFetchCounterpartiesQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterparties()
    }, [URL, reCounterparties]);

    const onSaving = useCallback((e) => {

        ProcessClassificationsObj(e.changes[0].data, "counterparty");
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);

    const dataWithFullName = state.data.map((item) => ({
        ...item,
        fullName: `${item.lastName} ${item.firstName} ${item.patronymicName}`,
    }));
    return (
        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={dataWithFullName}
            onSaving={onSaving}
            dataOnInitNewRow={{
                isMain: false,
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
                onEditRowKeyChange={onEditRowKeyChange}
                defaultEditRowKey={false}>
                <Popup title="Создание контактной информации" showTitle={true}/>
                <Form>
                    <Item dataField="lastName"/>
                    <Item dataField="firstName"/>
                    <Item dataField="patronymicName"/>
                    <Item dataField="phone"/>
                    <Item dataField="mobilePhone"/>
                    <Item dataField="email"/>
                    <Item dataField="isMain"/>
                    <Item dataField="counterparty.id"/>
                    <Item dataField="note" editorType={'dxTextArea'} colSpan={2}/>
                </Form>
            </Editing>
            <Column fixed={true} alignment={"center"} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column
                alignment="center"
                caption="Ф.И.О"
                dataField={'fullName'}
            />
            <Column alignment={"center"} dataField="lastName" visible={false} allowEditing={true}
                    caption={'Фамилия'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="firstName" visible={false} allowEditing={true}
                    caption={'Имя'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="patronymicName" visible={false} allowEditing={true}
                    caption={'Отчество'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="phone" allowEditing={true}
                    caption={'Рабочий телефон'} dataType={"string"}/>
            <Column alignment={"center"} dataField="mobilePhone" allowEditing={true}
                    caption={'Мобильный телефон'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="email" allowEditing={true}
                    caption={'Электронный адрес'} dataType={"string"}/>
            <Column alignment={"center"} dataField="note" allowEditing={true}
                    caption={'Примечание'} dataType={"string"}/>
            <Column alignment={"center"} dataField="isMain" allowEditing={true}
                    caption={'Основной контакт'} dataType={"boolean"}/>

            <Column alignment={"center"} dataField="counterparty" allowEditing={true}
                    caption={'Контрагент'}>
                <Column alignment={"center"} dataField="counterparty.id" allowEditing={true}
                        caption={'Наименование контрагента'} dataType={"number"}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column alignment={"center"} dataField="counterparty.counterpartyFormatId" allowEditing={false}
                        caption={'ID формата контрагента'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterparty.name" allowEditing={false}
                        caption={'Имя'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterparty.inn" allowEditing={false}
                        caption={'ИНН'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterparty.isWithOutNDS" allowEditing={false}
                        caption={'Продается без учета НДС'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.isCustomer" allowEditing={false}
                        caption={'Заказчик'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.customerClassificationId" allowEditing={false}
                        caption={'ID номер клиента'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterparty.isSubcontractor" allowEditing={false}
                        caption={'Субподрядчик'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.isProvider" allowEditing={false}
                        caption={'Поставщик'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.counterpartyStatusId" allowEditing={false}
                        caption={'ID статуса контрагента'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterparty.note" allowEditing={false}
                        caption={'Примечание'} dataType={"number"}/>
            </Column>
        </CustomDataGrid>
    )
}
