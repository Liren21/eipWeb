import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Lookup, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange, setChanges, setEditRowKey,} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";
import {counterpartiesService} from "../../../lib/services/counterpartiesService";
import {contractCategoriesService} from "../../../lib/services/contractCategoriesService";
import {statusDOsService} from "../../../lib/services/statusDOsService";
import {counterpartyContactPersonsService} from "../../../lib/services/counterpartyContactPersonsService";
import {rasesService} from "../../../lib/services/rasesService";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";



export const Contracts = () => {
    const URL: string = urls.CONTRACTS
    const [state, dispatch] = useReducer(reducer, TableVariable);


    const {data: counterparties, refetch: reCounterparties} = counterpartiesService.useFetchCounterpartiesQuery('')
    const {data: statusDOs, refetch: reStatusDOs} = statusDOsService.useFetchStatusDOsQuery('')
    const {
        data: contractCategories,
        refetch: reContractCategories
    } = contractCategoriesService.useFetchContractSignStatesQuery('')
    const {
        data: counterpartyContact,
        refetch: reCounterpartyContact
    } = counterpartyContactPersonsService.useFetchCounterpartyContactPersonsQuery('')
    const {
        data: rases,
        refetch: reRases
    } = rasesService.useFetchRasesQuery('')


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterparties()
        reStatusDOs()
        reContractCategories()
        reCounterpartyContact()
        reRases()
    }, [URL]);

    const onSaving = useCallback((e) => {

        ProcessClassificationsObj(e.changes[0].data, "counterpartyCustomer");
        ProcessClassificationsObj(e.changes[0].data, "contractCategory");
        ProcessClassificationsObj(e.changes[0].data, "counterpartyProvider");
        ProcessClassificationsObj(e.changes[0].data, "counterpartySubcontractor");
        ProcessClassificationsObj(e.changes[0].data, "projectEmployee");
        ProcessClassificationsObj(e.changes[0].data, "ras");
        ProcessClassificationsObj(e.changes[0].data, "executorDO");
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

            >
                <Popup title="Создание договора" showTitle={true}/>
                <Form>
                    <Item itemType="group" colCount={3} colSpan={2}>
                        <Item dataField="contractCategory.id"/>
                        <Item dataField="address"/>
                        <Item dataField="title"/>
                        <Item dataField="counterpartyCustomer.id"/>
                        <Item dataField="counterpartySubcontractor.id"/>
                        <Item dataField="counterpartyProvider.id"/>
                        <Item dataField="contractNumberCustomer"/>
                        <Item dataField="contractNumberSubcontractor"/>
                        <Item dataField="contractNumberProvider"/>
                        <Item dataField="additionalAgreementCustomer"/>
                        <Item dataField="additionalAgreementSubcontractor"/>
                        <Item dataField="additionalAgreementProvider"/>
                        <Item dataField="noSap"/>
                        <Item dataField="subscriber"/>
                        <Item dataField="ras.id"/>
                        <Item dataField="projectEmployee.id"/>
                        <Item dataField="executorDO.id"/>
                        <Item dataField="statusDOId"/>
                        <Item dataField="contractSigningOption"/>
                        <Item dataField="noteDO"/>
                        <Item dataField="numberTechTask"/>
                        <Item dataField="conclusionContractDate"/>
                        <Item dataField="returnSignContractDate"/>
                        <Item dataField="startDate"/>
                        <Item dataField="endDate"/>
                        <Item dataField="cancellationDate"/>
                        <Item dataField="terminationDate"/>
                        <Item dataField="summaPIR"/>
                        <Item dataField="summaSMR"/>
                        <Item dataField="summaEquipment"/>
                        <Item dataField="summaOther"/>
                    </Item>
                </Form>
            </Editing>

            <Column alignment={"center"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID договора'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"center"} dataField="address" caption={'Адрес договора'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="title" caption={'Титул полный'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"center"} dataField="contractCategory.id" caption={'Категория договора'} visible={false}
                    allowEditing={true}
                    dataType={"number"}>
                <Lookup
                    dataSource={contractCategories}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="counterpartyCustomer.id" caption={'Контрагент-заказчик'}
                    visible={false}
                    allowEditing={true}
                    dataType={"number"}
                    validationRules={validationRules}
            >
                <Lookup
                    dataSource={counterparties}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="counterpartySubcontractor.id" caption={'Контрагент-субподрядчик'}
                    visible={false}
                    allowEditing={true}
                    dataType={"number"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterparties}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="counterpartyProvider.id" caption={'Контрагент-поставщик'}
                    visible={false}
                    allowEditing={true}
                    dataType={"number"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterparties}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="statusDOId" caption={'Статус ДО'} visible={false}
                    allowEditing={true}
                    dataType={"number"}>
                <Lookup
                    dataSource={statusDOs}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="ras.id" caption={'РЭС'} visible={false}
                    allowEditing={true}
            >
                <Lookup
                    dataSource={rases}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            <Column alignment={"center"} dataField="executorDO.id" caption={'Исполнитель | ДО'} visible={false}
                    allowEditing={true}
            >
                <Lookup
                    dataSource={rases}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"center"} dataField="projectEmployee.id" caption={'Ф.И.О. руководителя проекта'}
                    dataType={"number"}>
                <Lookup
                    dataSource={counterpartyContact}
                    valueExpr="id"
                    displayExpr={'lastName'}
                />
            </Column>


            <Column alignment={"center"} dataField="counterpartySubcontractor" caption={'Контрагент субподрядчик'}>

                <Column alignment={"center"} dataField="counterpartySubcontractor.counterpartyFormatId"
                        caption={'ID формата контрагента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.counterpartyStatusId"
                        caption={'ID статуса контрагента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.customerClassificationId"
                        caption={'ID номер клиента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.id" caption={'ID'}
                        allowEditing={false}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.inn" caption={'ИНН'}
                        dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.isCustomer" caption={'Заказчик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.isProvider" caption={'Поставщик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.isSubcontractor"
                        caption={'Субподрядчик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.isWithOutNDS"
                        caption={'Продается без учета НДС'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.name" caption={'Имя'}
                        dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartySubcontractor.note" caption={'Примечание'}
                        dataType={"string"}/>
            </Column>

            <Column alignment={"center"} dataField="counterpartyProvider" caption={'Контрагент субподрядчик'}>
                <Column alignment={"center"} dataField="counterpartyProvider.counterpartyFormatId"
                        caption={'ID формата контрагента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.counterpartyStatusId"
                        caption={'ID статуса контрагента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.customerClassificationId"
                        caption={'ID номер клиента'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.id" caption={'ID'} allowEditing={false}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.inn" caption={'ИНН'}
                        dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.isCustomer" caption={'Заказчик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.isProvider" caption={'Поставщик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.isSubcontractor" caption={'Субподрядчик'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.isWithOutNDS"
                        caption={'Продается без учета НДС'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.name" caption={'Имя'}
                        dataType={"string"}/>
                <Column alignment={"center"} dataField="counterpartyProvider.note" caption={'Примечание'}
                        dataType={"string"}/>
            </Column>


            <Column alignment={"center"} dataField="contractNumberCustomer" caption={'Номер договора с заказчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="contractNumberSubcontractor"
                    caption={'Номер договора с субподрядчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="contractNumberProvider" caption={'Номер договора с поставщиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="additionalAgreementCustomer"
                    caption={'Номер Д/С с заказчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="additionalAgreementSubcontractor"
                    caption={'Номер Д/С с субподрядчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="additionalAgreementProvider"
                    caption={'Номер Д/С с поставщиком'}
                    dataType={"string"}/>
            <Column alignment={"center"} dataField="noSap"
                    dataType={"string"} caption={"No SAP"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="subscriber" caption={'Абонент'}
                    dataType={"string"} validationRules={validationRules}/>


            <Column alignment={"center"} dataField="ras" caption={'РЭС'}
                    dataType={"number"}>
                <Column alignment={"center"} dataField="ras.id" caption={'ID'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="ras.sortIndex" caption={'Сортировка'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="ras.name" caption={'Имя'}
                        dataType={"string"}/>
                <Column alignment={"center"} dataField="ras.note" caption={'Примечание'}
                        dataType={"string"}/>
            </Column>
            <Column alignment={"center"} dataField="projectEmployee.id" caption={'ФИО руководителя проекта'}
                    dataType={"number"}>
                <Lookup
                    dataSource={counterpartyContact}
                    valueExpr="id"
                    displayExpr={'lastName'}
                />
            </Column>

            <Column alignment={"center"} dataField="projectEmployee" caption={'Сотрудник проекта'}>
                <Column alignment={"center"} dataField="projectEmployee.id" caption={'ID '}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.lastName" caption={'Фамилия'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.firstName" caption={'Имя'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.patronymicName" caption={'Отчество'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.isActive" caption={'Активен'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="projectEmployee.departmentId" caption={'ID отдела'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.positionId" caption={'ID позиции'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="projectEmployee.isViewHiddenCosts"
                        caption={'Просмотр скрытых затрат'}
                        dataType={"boolean"}/>
            </Column>

            <Column alignment={"center"} dataField="executorDO" caption={'Исполнитель | ДО'}>
                <Column alignment={"center"} dataField="executorDO.id" caption={'ID'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.lastName" caption={'Фамилия'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.firstName" caption={'Имя'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.patronymicName" caption={'Отчество'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.isActive" caption={'Активен'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="executorDO.departmentId" caption={'ID отдела'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.positionId" caption={'ID позиции'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="executorDO.isViewHiddenCosts"
                        caption={'Просмотр скрытых затрат'}
                        dataType={"boolean"}/>
            </Column>

            <Column alignment={"center"} dataField="statusDO" caption={'Статус ДО'}>
                <Column alignment={"center"} dataField="statusDO.id" caption={'ID'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="statusDO.sortIndex" caption={'Сортировка'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="statusDO.name" caption={'Имя'}
                        dataType={"string"}/>
            </Column>

            <Column alignment={"center"} dataField="contractSigningOption" caption={'Вариант подписания договора'}
                    dataType={"string"}/>
            <Column alignment={"center"} dataField="noteDO" caption={'Примечание от ДО'}
                    dataType={"string"}/>
            <Column alignment={"center"} dataField="numberTechTask" caption={'Номер ТЗ'}
                    dataType={"string"}/>
            <Column alignment={"center"} dataField="createdDate" caption={'Дт создания'}
                    dataType={"datetime"}/>
            <Column alignment={"center"} dataField="conclusionContractDate" caption={'Дт заключения договора'}
                    dataType={"datetime"} validationRules={validationRules}/>
            <Column alignment={"center"} dataField="returnSignContractDate"
                    caption={'Дт возврата подписанного договора'}
                    dataType={"datetime"}/>

            <Column alignment={"center"} dataField="createdEmployee" caption={'Созданный сотрудник'}>
                <Column alignment={"center"} dataField="createdEmployee.departmentId" caption={'ID отдела'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.lastName" caption={'Фамилия'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.firstName" caption={'Имя'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.patronymicName" caption={'Отчество'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.id" caption={'ID'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.isActive" caption={'Активен'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="createdEmployee.positionId" caption={'ID позиции'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="createdEmployee.isViewHiddenCosts"
                        caption={'Просмотр скрытых затрат'}
                        dataType={"boolean"}/>
            </Column>
            <Column alignment={"center"} dataField="startDate" caption={'Дт начала работ по договору'}
                    dataType={"datetime"}/>
            <Column alignment={"center"} dataField="endDate" caption={'Дт окончания работ по договору'}
                    dataType={"datetime"}/>
            <Column alignment={"center"} dataField="cancellationDate" caption={'Дт аннуляции договора'}
                    dataType={"datetime"}/>
            <Column alignment={"center"} dataField="terminationDate" caption={'Дт расторжения договора'}
                    dataType={"datetime"}/>
            <Column alignment={"center"} dataField="summaPIR" caption={'СУММА | ПИР'}
                    dataType={"number"}/>
            <Column alignment={"center"} dataField="summaSMR" caption={'СУММА | СМР'}
                    dataType={"number"}/>
            <Column alignment={"center"} dataField="summaEquipment" caption={'СУММА | ОБОРУДОВАНИЕ'}
                    dataType={"number"}/>
            <Column alignment={"center"} dataField="summaOther" caption={'СУММА | ПРОЧЕЕ'}
                    dataType={"number"}/>
            <Column alignment={"center"} dataField="summaOther" caption={'СУММА | По договору'}
                    dataType={"number"}/>

            <Column alignment={"center"} dataField="updateStatusDOEmployee" caption={'Созданный сотрудник'}>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.id" caption={'ID'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.lastName" caption={'Фамилия'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.firstName" caption={'Имя'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.patronymicName" caption={'Отчество'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.isActive" caption={'Активен'}
                        dataType={"boolean"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.departmentId" caption={'ID отдела'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.positionId" caption={'ID позиции'}
                        dataType={"number"}/>
                <Column alignment={"center"} dataField="updateStatusDOEmployee.isViewHiddenCosts"
                        caption={'Просмотр скрытых затрат'}
                        dataType={"boolean"}/>
            </Column>


            <Column alignment={"center"} dataField="updateStatusDODate" caption={'Обновление даты статуса ДО'}
                    dataType={"datetime"}/>
        </CustomDataGrid>
    )
}
