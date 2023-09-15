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
import TableName from "../../UI/TableName/TableName";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";


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
        <React.Fragment>
            <TableName/>
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
                // rowAlternationEnabled={true}
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                onSaving={onSaving}
                columnWidth={180}
                height={'87vh'}
                hoverStateEnabled={true}
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

                <Column fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID договора'}
                        allowEditing={false} dataType={"number"}/>
                <Column dataField="address" caption={'Адрес договора'} dataType={"string"}
                        validationRules={validationRules}/>
                <Column dataField="title"  caption={'Титул полный'} dataType={"string"}
                        validationRules={validationRules}/>
                <Column dataField="contractCategory.id" caption={'Категория договора'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={contractCategories}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="counterpartyCustomer.id" caption={'Контрагент-заказчик'} visible={false}
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

                <Column dataField="counterpartySubcontractor.id" caption={'Контрагент-субподрядчик'} visible={false}
                        allowEditing={true}
                        dataType={"number"}
                        validationRules={validationRules}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="counterpartyProvider.id" caption={'Контрагент-поставщик'} visible={false}
                        allowEditing={true}
                        dataType={"number"}
                        validationRules={validationRules}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="statusDOId" caption={'Статус ДО'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={statusDOs}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="ras.id" caption={'РЭС'} visible={false}
                        allowEditing={true}
                >
                    <Lookup
                        dataSource={rases}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="executorDO.id" caption={'Исполнитель | ДО'} visible={false}
                        allowEditing={true}
                >
                    <Lookup
                        dataSource={rases}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column dataField="projectEmployee.id" caption={'ФИО руководителя проекта'}
                        dataType={"number"}>
                    <Lookup
                        dataSource={counterpartyContact}
                        valueExpr="id"
                        displayExpr={'lastName'}
                    />
                </Column>


                <Column dataField="counterpartySubcontractor" caption={'Контрагент субподрядчик'}>

                    <Column dataField="counterpartySubcontractor.counterpartyFormatId"
                            caption={'ID формата контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.counterpartyStatusId"
                            caption={'ID статуса контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.customerClassificationId" caption={'ID номер клиента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.id" caption={'ID'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.inn" caption={'ИНН'}
                            dataType={"string"}/>
                    <Column dataField="counterpartySubcontractor.isCustomer" caption={'Заказчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.isProvider" caption={'Поставщик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.isSubcontractor" caption={'Субподрядчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.isWithOutNDS" caption={'Продается без учета НДС'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="counterpartySubcontractor.note" caption={'Примечание'}
                            dataType={"string"}/>
                </Column>

                <Column dataField="counterpartyProvider" caption={'Контрагент субподрядчик'}>
                    <Column dataField="counterpartyProvider.counterpartyFormatId" caption={'ID формата контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.counterpartyStatusId" caption={'ID статуса контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.customerClassificationId" caption={'ID номер клиента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.id" caption={'ID'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.inn" caption={'ИНН'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyProvider.isCustomer" caption={'Заказчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.isProvider" caption={'Поставщик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.isSubcontractor" caption={'Субподрядчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.isWithOutNDS" caption={'Продается без учета НДС'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyProvider.note" caption={'Примечание'}
                            dataType={"string"}/>
                </Column>


                <Column dataField="contractNumberCustomer" caption={'Номер договора с заказчиком'}
                        dataType={"string"} validationRules={validationRules}/>
                <Column dataField="contractNumberSubcontractor" caption={'Номер договора с субподрядчиком'}
                        dataType={"string"} validationRules={validationRules}/>
                <Column dataField="contractNumberProvider" caption={'Номер договора с поставщиком'}
                        dataType={"string"} validationRules={validationRules}/>
                <Column dataField="additionalAgreementCustomer"
                        caption={'Номер Д/С с заказчиком'}
                        dataType={"string"} validationRules={validationRules}/>
                <Column dataField="additionalAgreementSubcontractor"
                        caption={'Номер Д/С с субподрядчиком'}
                        dataType={"string"} validationRules={validationRules}/>
                <Column dataField="additionalAgreementProvider"
                        caption={'Номер Д/С с поставщиком'}
                        dataType={"string"}/>
                <Column dataField="noSap"
                        dataType={"string"} caption={"No SAP"} validationRules={validationRules}/>
                <Column dataField="subscriber" caption={'Абонент'}
                        dataType={"string"} validationRules={validationRules}/>


                <Column dataField="ras" caption={'РЭС'}
                        dataType={"number"}>
                    <Column dataField="ras.id" caption={'ID'}
                            dataType={"number"}/>
                    <Column dataField="ras.sortIndex" caption={'Сортировочный индекс'}
                            dataType={"number"}/>
                    <Column dataField="ras.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="ras.note" caption={'Примечание'}
                            dataType={"string"}/>
                </Column>
                <Column dataField="projectEmployee.id" caption={'ФИО руководителя проекта'}
                        dataType={"number"}>
                    <Lookup
                        dataSource={counterpartyContact}
                        valueExpr="id"
                        displayExpr={'lastName'}
                    />
                </Column>

                <Column dataField="projectEmployee" caption={'Сотрудник проекта'}>
                    <Column dataField="projectEmployee.id" caption={'ID '}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="projectEmployee.departmentId" caption={'ID отдела'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.positionId" caption={'ID позиции'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>

                <Column dataField="executorDO" caption={'Исполнитель | ДО'}>
                    <Column dataField="executorDO.id" caption={'ID'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="executorDO.departmentId" caption={'ID отдела'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.positionId" caption={'ID позиции'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>

                <Column dataField="statusDO" caption={'Статус ДО'}>
                    <Column dataField="statusDO.id" caption={'ID'}
                            dataType={"number"}/>
                    <Column dataField="statusDO.sortIndex" caption={'Сортировочный индекс'}
                            dataType={"number"}/>
                    <Column dataField="statusDO.name" caption={'Имя'}
                            dataType={"string"}/>
                </Column>

                <Column dataField="contractSigningOption" caption={'Вариант подписания договора'}
                        dataType={"string"}/>
                <Column dataField="noteDO" caption={'Примечание от ДО'}
                        dataType={"string"}/>
                <Column dataField="numberTechTask" caption={'Номер ТЗ'}
                        dataType={"string"}/>
                <Column dataField="createdDate" caption={'Дт создания'}
                        dataType={"datetime"}/>
                <Column dataField="conclusionContractDate" caption={'Дт заключения договора'}
                        dataType={"datetime"} validationRules={validationRules}/>
                <Column dataField="returnSignContractDate" caption={'Дт возврата подписанного договора'}
                        dataType={"datetime"}/>

                <Column dataField="createdEmployee" caption={'Созданный сотрудник'}>
                    <Column dataField="createdEmployee.departmentId" caption={'ID отдела'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.id" caption={'ID'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="createdEmployee.positionId" caption={'ID позиции'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>
                <Column dataField="startDate" caption={'Дт начала работ по договору'}
                        dataType={"datetime"}/>
                <Column dataField="endDate" caption={'Дт окончания работ по договору'}
                        dataType={"datetime"}/>
                <Column dataField="cancellationDate" caption={'Дт аннуляции договора'}
                        dataType={"datetime"}/>
                <Column dataField="terminationDate" caption={'Дт расторжения договора'}
                        dataType={"datetime"}/>
                <Column dataField="summaPIR" caption={'Сумма | ПИР'}
                        dataType={"number"}/>
                <Column dataField="summaSMR" caption={'Сумма | СМР'}
                        dataType={"number"}/>
                <Column dataField="summaEquipment" caption={'Сумма | Оборудование'}
                        dataType={"number"}/>
                <Column dataField="summaOther" caption={'Сумма | Прочее'}
                        dataType={"number"}/>

                <Column dataField="updateStatusDOEmployee" caption={'Созданный сотрудник'}>
                    <Column dataField="updateStatusDOEmployee.id" caption={'ID'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="updateStatusDOEmployee.departmentId" caption={'ID отдела'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.positionId" caption={'ID позиции'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>


                <Column dataField="updateStatusDODate" caption={'Обновление даты статуса ДО'}
                        dataType={"datetime"}/>
            </DataGrid>
        </React.Fragment>
    );
}
