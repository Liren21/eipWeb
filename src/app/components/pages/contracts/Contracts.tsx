import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {Column, Editing, FilterRow, Form, HeaderFilter, Popup, Scrolling, Search} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import reducer from '../../../../core/lib/api/reducer';
import {saveChange, loadOrders, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {TableVariable} from "../../../generic/Variable/TableVariable";


export const Contracts = () => {
    const URL: string = urls.CONTRACTS
    const [state, dispatch] = useReducer(reducer, TableVariable);

    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {
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
                    <Popup title="" showTitle={true} width={700} height={525}/>
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
                            <Item dataField="counterpartyId"/>
                        </Item>
                    </Form>
                </Editing>
                <Column fixed={true} dataField="id" caption={'ИД'} allowEditing={false} dataType={"number"}/>
                <Column dataField="contractCategoryId" caption="ИД Категории Контракта" dataType="number" />
                <Column dataField="address" caption="Адрес" dataType="string" />
                <Column dataField="title" caption="Название" dataType="string" />
                <Column dataField="counterpartyCustomerId" caption="ИД Заказчика" dataType="number" />
                <Column dataField="counterpartySubcontractorId" caption="ИД Субподрядчика" dataType="number" />
                <Column dataField="counterpartyProviderId" caption="ИД Поставщика" dataType="number" />
                <Column dataField="contractNumberCustomer" caption="Номер Контракта Заказчика" dataType="string" />
                <Column dataField="contractNumberSubcontractor" caption="Номер Контракта Субподрядчика" dataType="string" />
                <Column dataField="contractNumberProvider" caption="Номер Контракта Поставщика" dataType="string" />
                <Column dataField="additionalAgreementCustomer" caption="Дополнительное Соглашение Заказчика" dataType="string" />
                <Column dataField="additionalAgreementSubcontractor" caption="Дополнительное Соглашение Субподрядчика" dataType="string" />
                <Column dataField="additionalAgreementProvider" caption="Дополнительное Соглашение Поставщика" dataType="string" />
                <Column dataField="noSap" caption="Номер SAP" dataType="string" />
                <Column dataField="subscriber" caption="Подписчик" dataType="string" />
                <Column dataField="rasId" caption="ИД РАС" dataType="number" />
                <Column dataField="projectEmployeeId" caption="ИД Сотрудника Проекта" dataType="number" />
                <Column dataField="executorDOId" caption="ИД Исполнителя ДО" dataType="number" />
                <Column dataField="statusDOId" caption="ИД Статуса ДО" dataType="number" />
                <Column dataField="contractSigningOption" caption="Опция Подписания Контракта" dataType="string" />
                <Column dataField="noteDO" caption="Примечание ДО" dataType="string" />
                <Column dataField="numberTechTask" caption="Номер Технического Задания" dataType="string" />
                <Column dataField="createdDate" caption="Дата Создания" dataType="datetime" />
                <Column dataField="conclusionContractDate" caption="Дата Заключения Контракта" dataType="datetime" />
                <Column dataField="returnSignContractDate" caption="Дата Возврата Подписанного Контракта" dataType="datetime" />
                <Column dataField="createdEmployeeId" caption="ИД Создавшего Сотрудника" dataType="number" />
                <Column dataField="startDate" caption="Дата Начала" dataType="datetime" />
                <Column dataField="endDate" caption="Дата Окончания" dataType="datetime" />
                <Column dataField="cancellationDate" caption="Дата Отмены" dataType="datetime" />
                <Column dataField="terminationDate" caption="Дата Прекращения" dataType="datetime" />
                <Column dataField="summa" caption="Сумма" dataType="number" />
                <Column dataField="summaPIR" caption="Сумма PIR" dataType="number" />
                <Column dataField="summaSMR" caption="Сумма SMR" dataType="number" />
                <Column dataField="summaEquipment" caption="Сумма Оборудования" dataType="number" />
                <Column dataField="summaOther" caption="Другие Суммы" dataType="number" />
                <Column dataField="updateStatusDOEmployeeId" caption="ИД Сотрудника Обновления Статуса ДО" dataType="number" />
                <Column dataField="updateStatusDODate" caption="Дата Обновления Статуса ДО" dataType="datetime" />
            </DataGrid>
        </React.Fragment>
    );
}
