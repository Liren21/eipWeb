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


    useEffect(() => {
        loadOrders(dispatch, URL);
    }, [URL]);

    const onSaving = useCallback((e) => {

        ProcessClassificationsObj(e.changes[0].data, "counterpartyCustomer");
        ProcessClassificationsObj(e.changes[0].data, "contractCategory");
        ProcessClassificationsObj(e.changes[0].data, "counterpartyProvider");
        ProcessClassificationsObj(e.changes[0].data, "counterpartySubcontractor");
        ProcessClassificationsObj(e.changes[0].data, "projectEmployee");
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const onChangesChange = useCallback((changes) => {
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);

    console.log(counterparties)
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
                    <Popup title="Создание договора" showTitle={true} width={700} height={525}/>
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
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
                            <Item dataField="rasId"/>
                            <Item dataField="projectEmployee.id"/>
                            <Item dataField="executorDOId"/>
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

                <Column fixed={true} dataField="id" caption={'ИД'} allowEditing={false} dataType={"number"}/>
                <Column dataField="contractCategory.id" caption={'ИД категории контракта'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={contractCategories}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>
                <Column dataField="contractCategory" caption={'Категория контрактов'}>
                    <Column dataField="contractCategory.id" caption={'ИД'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="contractCategory.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="contractCategory.group" caption={'Группа'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="contractCategory.note" caption={'Заметка'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="contractCategory.sortIndex" caption={'Сортировочный индекс'}
                            allowEditing={false} dataType={"number"}/>
                </Column>
                <Column dataField="address" caption={'Адресс'} dataType={"string"}/>
                <Column dataField="title" caption={'Название'} dataType={"string"}/>

                <Column dataField="counterpartyCustomer.id" caption={'Контрагент-заказчик'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="counterpartySubcontractor.id" caption={'Контрагент-субподрядчик'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="counterpartyProvider.id" caption={'Контрагент-поставщик'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={counterparties}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                {/*<Column dataField="counterpartyProvider.id" caption={'ИД клиента поставщика'} visible={false}*/}
                {/*        allowEditing={true}*/}
                {/*        dataType={"number"}>*/}
                {/*    <Lookup*/}
                {/*        dataSource={counterparties}*/}
                {/*        valueExpr="providerClassifications[0].id"*/}
                {/*        displayExpr={'providerClassifications[0].name'}*/}
                {/*    />*/}
                {/*</Column>*/}

                <Column dataField="statusDOId" caption={'Статус ДО'} visible={false}
                        allowEditing={true}
                        dataType={"number"}>
                    <Lookup
                        dataSource={statusDOs}
                        valueExpr="id"
                        displayExpr={'name'}
                    />
                </Column>

                <Column dataField="counterpartyCustomer" caption={'Контрагент-заказчик'}>
                    <Column dataField="counterpartyCustomer.id" caption={'ИД'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyCustomer.counterpartyFormatId" caption={'ИД формата контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyCustomer.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyCustomer.inn" caption={'ИНН'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyCustomer.isWithOutNDS" caption={'Продается без учета НДС'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyCustomer.isCustomer" caption={'Заказчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyCustomer.customerClassificationId" caption={'ИД номер клиента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyCustomer.isSubcontractor" caption={'Субподрядчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyCustomer.isProvider" caption={'Поставщик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyCustomer.counterpartyStatusId" caption={'ИД статуса контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyCustomer.note" caption={'Заметка'}
                            dataType={"string"}/>
                </Column>


                <Column dataField="counterpartySubcontractor" caption={'Контрагент субподрядчик'}>
                    <Column dataField="counterpartySubcontractor.id" caption={'ИД'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.counterpartyFormatId"
                            caption={'ИД формата контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="counterpartySubcontractor.inn" caption={'ИНН'}
                            dataType={"string"}/>
                    <Column dataField="counterpartySubcontractor.isWithOutNDS" caption={'Продается без учета НДС'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.isCustomer" caption={'Заказчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.customerClassificationId" caption={'ИД номер клиента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.isSubcontractor" caption={'Субподрядчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.isProvider" caption={'Поставщик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartySubcontractor.counterpartyStatusId"
                            caption={'ИД статуса контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartySubcontractor.note" caption={'Заметка'}
                            dataType={"string"}/>
                </Column>

                <Column dataField="counterpartyProvider" caption={'Контрагент субподрядчик'}>
                    <Column dataField="counterpartyProvider.id" caption={'ИД'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.counterpartyFormatId" caption={'ИД формата контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyProvider.inn" caption={'ИНН'}
                            dataType={"string"}/>
                    <Column dataField="counterpartyProvider.isWithOutNDS" caption={'Продается без учета НДС'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.isCustomer" caption={'Заказчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.customerClassificationId" caption={'ИД номер клиента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.isSubcontractor" caption={'Субподрядчик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.isProvider" caption={'Поставщик'}
                            dataType={"boolean"}/>
                    <Column dataField="counterpartyProvider.counterpartyStatusId" caption={'ИД статуса контрагента'}
                            dataType={"number"}/>
                    <Column dataField="counterpartyProvider.note" caption={'Заметка'}
                            dataType={"string"}/>
                </Column>


                <Column dataField="contractNumberCustomer" caption={'Контрактный номер клиента'}
                        dataType={"string"}/>
                <Column dataField="contractNumberSubcontractor" caption={'Контрактный номер субподрядчика'}
                        dataType={"string"}/>
                <Column dataField="contractNumberProvider" caption={'Контрактный номер поставщика'}
                        dataType={"string"}/>
                <Column dataField="additionalAgreementCustomer" caption={'Дополнительное соглашение с заказчиком'}
                        dataType={"string"}/>
                <Column dataField="additionalAgreementSubcontractor"
                        caption={'Дополнительные соглашения с субподрядчиком'}
                        dataType={"string"}/>
                <Column dataField="additionalAgreementProvider" caption={'Поставщик дополнительных соглашений'}
                        dataType={"string"}/>
                <Column dataField="noSap"
                        dataType={"string"}/>
                <Column dataField="subscriber" caption={'Пользователь'}
                        dataType={"string"}/>


                <Column dataField="ras" caption={'РЭС'}
                        dataType={"number"}>
                    <Column dataField="ras.id" caption={'ИД'}
                            dataType={"number"}/>
                    <Column dataField="ras.sortIndex" caption={'Сортировочный индекс'}
                            dataType={"number"}/>
                    <Column dataField="ras.name" caption={'Имя'}
                            dataType={"string"}/>
                    <Column dataField="ras.note" caption={'Заметка'}
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
                    <Column dataField="projectEmployee.id" caption={'ИД '}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="projectEmployee.departmentId" caption={'ИД отдела'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.positionId" caption={'ИД позиции'}
                            dataType={"number"}/>
                    <Column dataField="projectEmployee.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>

                <Column dataField="executorDO" caption={'Исполнитель ДО'}>
                    <Column dataField="executorDO.id" caption={'ИД'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="executorDO.departmentId" caption={'ИД отдела'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.positionId" caption={'ИД позиции'}
                            dataType={"number"}/>
                    <Column dataField="executorDO.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>

                <Column dataField="statusDO" caption={'Статус ДО'}>
                    <Column dataField="statusDO.id" caption={'ИД'}
                            dataType={"number"}/>
                    <Column dataField="statusDO.sortIndex" caption={'Сортировочный индекс'}
                            dataType={"number"}/>
                    <Column dataField="statusDO.name" caption={'Имя'}
                            dataType={"string"}/>
                </Column>

                <Column dataField="contractSigningOption" caption={'Вариант подписания контракта'}
                        dataType={"string"}/>
                <Column dataField="noteDO" caption={'Заметка ДО'}
                        dataType={"string"}/>
                <Column dataField="numberTechTask" caption={'Номер техничесткой задачи'}
                        dataType={"string"}/>
                <Column dataField="createdDate" caption={'Дата создания'}
                        dataType={"datetime"}/>
                <Column dataField="conclusionContractDate" caption={'Дата заключения контракта'}
                        dataType={"datetime"}/>
                <Column dataField="returnSignContractDate" caption={'Дата подписания контракта на возврат'}
                        dataType={"datetime"}/>

                <Column dataField="createdEmployee" caption={'Созданный сотрудник'}>
                    <Column dataField="createdEmployee.id" caption={'ИД'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="createdEmployee.departmentId" caption={'ИД отдела'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.positionId" caption={'ИД позиции'}
                            dataType={"number"}/>
                    <Column dataField="createdEmployee.isViewHiddenCosts" caption={'Просмотр скрытых затрат'}
                            dataType={"boolean"}/>
                </Column>
                <Column dataField="startDate" caption={'Начальная дата'}
                        dataType={"datetime"}/>
                <Column dataField="endDate" caption={'Конечная дата'}
                        dataType={"datetime"}/>
                <Column dataField="cancellationDate" caption={'Дата отмены'}
                        dataType={"datetime"}/>
                <Column dataField="terminationDate" caption={'Дата завершения'}
                        dataType={"datetime"}/>
                <Column dataField="summaPIR" caption={'Подводящий итог'}
                        dataType={"number"}/>
                <Column dataField="summaSMR" caption={'Итог'}
                        dataType={"number"}/>
                <Column dataField="summaEquipment" caption={'Итоговое оборудование'}
                        dataType={"number"}/>
                <Column dataField="summaOther" caption={'Итог другой'}
                        dataType={"number"}/>

                <Column dataField="updateStatusDOEmployee" caption={'Созданный сотрудник'}>
                    <Column dataField="updateStatusDOEmployee.id" caption={'ИД'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.lastName" caption={'Фамилия'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.firstName" caption={'Имя'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.patronymicName" caption={'Отчество'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.isActive" caption={'Активен'}
                            dataType={"boolean"}/>
                    <Column dataField="updateStatusDOEmployee.departmentId" caption={'ИД отдела'}
                            dataType={"number"}/>
                    <Column dataField="updateStatusDOEmployee.positionId" caption={'ИД позиции'}
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
