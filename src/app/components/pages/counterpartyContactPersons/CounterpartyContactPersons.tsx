import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {Column, Editing, Form, Lookup, Popup,} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {EmailRule, Item} from "devextreme-react/form";
import {counterpartiesService} from "../../../lib/services/counterpartiesService";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {TableVariable} from '../../../generic/Variable/TableVariable';
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";


export const CounterpartyContactPersons = () => {
    const URL = useMemo(() => urls.COUNTERPARTY_CONTACT_PERSONS, []);
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')
    const {data: counterparties, refetch: reCounterparties} = counterpartiesService.useFetchCounterpartiesQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterparties()
    }, [URL, reCounterparties]);

    const onSaving = useCallback((e) => {
        ProcessClassificationsObj(e.changes[0].data, "counterparty");
        // e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const dataWithFullName = state.data.map((item) => ({
        ...item,
        fullName: `${item.lastName} ${item.firstName} ${item.patronymicName}`,
    }));

    const phoneEditorOptions = { mask: '+7 (X00) 000-0000', maskRules: { X: /[02-9]/ } };

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
                defaultEditRowKey={false}
                // changes={state.changes}
                // onChangesChange={useCallback((e) => OnChangesChange(dispatch, e, setTitleMethod), [])}
                editRowKey={state.editRowKey}
                // onEditRowKeyChange={useCallback((e) => OnEditRowKeyChange(dispatch, e, setTitleMethod), [])}
            >
                <Popup title={`${titleMethod} контактную информацию`} showTitle={true}/>
                <Form>
                    <Item dataField="lastName"/>
                    <Item dataField="firstName"/>
                    <Item dataField="patronymicName"/>
                    <Item dataField="phone" editorOptions={phoneEditorOptions}/>
                    <Item dataField="mobilePhone" editorOptions={phoneEditorOptions}/>
                    <Item dataField="email">
                        <EmailRule message={'Неправильный форма. (Пример: rule@yandex.com)'}/>
                    </Item>
                    <Item dataField="isMain"/>
                    <Item dataField="counterparty.id"/>
                    <Item dataField="note" editorType={'dxTextArea'} colSpan={2}/>
                </Form>
            </Editing>
            <Column fixed={true} alignment={"left"} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column
                alignment="left"
                caption="Ф.И.О"
                dataField={'fullName'}
            />
            <Column alignment={"left"} dataField="lastName" visible={false} allowEditing={true}
                    caption={'Фамилия'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="firstName" visible={false} allowEditing={true}
                    caption={'Имя'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="patronymicName" visible={false} allowEditing={true}
                    caption={'Отчество'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="phone" allowEditing={true}
                    caption={'Рабочий телефон'} dataType={"string"}/>
            <Column alignment={"left"} dataField="mobilePhone" allowEditing={true}
                    caption={'Мобильный телефон'} dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="email" allowEditing={true}
                    caption={'Электронный адрес'} dataType={"string"}/>
            <Column alignment={"left"} dataField="note" allowEditing={true}
                    caption={'Примечание'} dataType={"string"}/>
            <Column alignment={"center"} dataField="isMain" allowEditing={true}
                    caption={'Основной контакт'} dataType={"boolean"}/>

            <Column alignment={"left"} dataField="counterparty" allowEditing={true}
                    caption={'Контрагент'}>
                <Column alignment={"left"} dataField="counterparty.id" allowEditing={true}
                        caption={'Наименование контрагента'} dataType={"number"} validationRules={validationRules}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column alignment={"left"} dataField="counterparty.counterpartyFormatId" allowEditing={false}
                        caption={'ID формата контрагента'} dataType={"string"}/>
                <Column alignment={"left"} dataField="counterparty.name" allowEditing={false}
                        caption={'Имя'} dataType={"string"}/>
                <Column alignment={"left"} dataField="counterparty.inn" allowEditing={false}
                        caption={'ИНН'} dataType={"string"}/>
                <Column alignment={"center"} dataField="counterparty.isWithOutNDS" allowEditing={false}
                        caption={'Продается без учета НДС'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.isCustomer" allowEditing={false}
                        caption={'Заказчик'} dataType={"boolean"}/>
                <Column alignment={"left"} dataField="counterparty.customerClassificationId" allowEditing={false}
                        caption={'ID номер клиента'} dataType={"number"}/>
                <Column alignment={"center"} dataField="counterparty.isSubcontractor" allowEditing={false}
                        caption={'Субподрядчик'} dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterparty.isProvider" allowEditing={false}
                        caption={'Поставщик'} dataType={"boolean"}/>
                <Column alignment={"left"} dataField="counterparty.counterpartyStatusId" allowEditing={false}
                        caption={'ID статуса контрагента'} dataType={"number"}/>
                <Column alignment={"left"} dataField="counterparty.note" allowEditing={false}
                        caption={'Примечание'} dataType={"number"}/>
            </Column>
        </CustomDataGrid>
    )
}
