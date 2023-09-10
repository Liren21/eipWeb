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
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {counterpartiesService} from "../../../lib/services/counterpartiesService";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {onInitNewRow} from "../../../generic/Function/OnInitNewRow";
import {ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";


export const CounterpartyContactPersons = () => {
    const URL: string = urls.COUNTERPARTY_CONTACT_PERSONS
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const {data: counterparties, refetch: reCounterparties} = counterpartiesService.useFetchCounterpartiesQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterparties()
    }, [URL]);

    const onSaving = useCallback((e) => {
        // if (e.changes[0].data && e.changes[0].data.counterparty !== undefined) {
        //     const classificationData = e.changes[0].data.counterparty.id;
        //     delete e.changes[0].data.counterparty.id;
        //     e.changes[0].data["counterpartyId"] = classificationData
        // }
        // ProcessClassificationsObj(e.changes, "counterparty");

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
                onInitNewRow={(e) => onInitNewRow(e, {
                    isMain: false,
                    isWithOutNDS: false,
                    isCustomer: false,
                    isSubcontractor: false,
                    isProvider: false,
                })}
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
                    defaultEditRowKey={false}>
                    <Popup title="Создание контактной информации" showTitle={true} width={700} height={525}/>
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
                            <Item dataField="lastName"/>
                            <Item dataField="firstName"/>
                            <Item dataField="patronymicName"/>
                            <Item dataField="phone"/>
                            <Item dataField="mobilePhone"/>
                            <Item dataField="email"/>
                            <Item dataField="note"/>
                            <Item dataField="isMain"/>
                            <Item dataField="counterparty.id"/>
                        </Item>
                    </Form>
                </Editing>
                <Column fixed={true} dataField="id" caption={'ИД'} allowEditing={false} dataType={"number"}/>
                <Column dataField="lastName" allowEditing={true}
                        caption={'Фамилия'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="firstName" allowEditing={true}
                        caption={'Имя'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="patronymicName" allowEditing={true}
                        caption={'Отчество'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="phone" allowEditing={true}
                        caption={'Телефон'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="mobilePhone" allowEditing={true}
                        caption={'Мобильный телефон'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="email" allowEditing={true}
                        caption={'Почта'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="note" allowEditing={true}
                        caption={'Примечание'} dataType={"string"} validationRules={validationRules}/>
                <Column dataField="isMain" allowEditing={true}
                        caption={'Основной'} dataType={"boolean"}/>

                {/*<Column dataField="counterpartyId" allowEditing={true}*/}
                {/*        caption={'ИД контрагента'} dataType={"number"} validationRules={validationRules}>*/}
                {/*    <Lookup*/}
                {/*        dataSource={counterparties}*/}
                {/*        valueExpr="id"*/}
                {/*        displayExpr={'name'}*/}
                {/*    />*/}
                {/*</Column>*/}
                <Column dataField="counterparty" allowEditing={true}
                        caption={'Контрагент'}>
                    <Column dataField="counterparty.id" allowEditing={true}
                            caption={'ИД контрагента'} dataType={"number"}>
                        <Lookup
                            dataSource={counterparties}
                            valueExpr="id"
                            displayExpr={'name'}
                        />
                    </Column>
                    <Column dataField="counterparty.counterpartyFormatId" allowEditing={false}
                            caption={'ИД формата контрагента'} dataType={"string"}/>
                    <Column dataField="counterparty.name" allowEditing={false}
                            caption={'Имя'} dataType={"string"}/>
                    <Column dataField="counterparty.inn" allowEditing={false}
                            caption={'ИНН'} dataType={"string"}/>
                    <Column dataField="counterparty.isWithOutNDS" allowEditing={false}
                            caption={'Продается без учета НДС'} dataType={"boolean"}/>
                    <Column dataField="counterparty.isCustomer" allowEditing={false}
                            caption={'Заказчик'} dataType={"boolean"}/>
                    <Column dataField="counterparty.customerClassificationId" allowEditing={false}
                            caption={'ИД номер клиента'} dataType={"number"}/>
                    <Column dataField="counterparty.isSubcontractor" allowEditing={false}
                            caption={'Субподрядчик'} dataType={"boolean"}/>
                    <Column dataField="counterparty.isProvider" allowEditing={false}
                            caption={'Поставщик'} dataType={"boolean"}/>
                    <Column dataField="counterparty.counterpartyStatusId" allowEditing={false}
                            caption={'ИД статуса контрагента'} dataType={"number"}/>
                    <Column dataField="counterparty.note" allowEditing={false}
                            caption={'Примечание'} dataType={"number"}/>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
}
