import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column, Editing, Form, Lookup, Popup} from 'devextreme-react/data-grid';
import reducer from '../../../../core/lib/api/reducer';
import {loadOrders, saveChange} from '../../../../core/lib/api/actions';
import urls from "../../../lib/urls";
import {Item} from "devextreme-react/form";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {ProcessClassificationsObj} from "../../../generic/Function/ProcessClassifications";
import {counterpartiesService} from "../../../lib/services/counterpartiesService";
import {contractCategoriesService} from "../../../lib/services/contractCategoriesService";
import {statusDOsService} from "../../../lib/services/statusDOsService";
import {rasesService} from "../../../lib/services/rasesService";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {employeeService} from "../../../lib/services/employeeService";
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";


export const Contracts = () => {
    const URL: string = urls.CONTRACTS
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')
    const [chachEemployee, setChachEemployee] = useState([])


    const {data: counterparties, refetch: reCounterparties} = counterpartiesService.useFetchCounterpartiesQuery('')
    const {data: statusDOs, refetch: reStatusDOs} = statusDOsService.useFetchStatusDOsQuery('')
    const {
        data: contractCategories,
        refetch: reContractCategories
    } = contractCategoriesService.useFetchContractSignStatesQuery('')

    const {
        data: rases,
        refetch: reRases
    } = rasesService.useFetchRasesQuery('')
    const {
        data: employee,
        refetch: reEmployee,
        isLoading
    } = employeeService.useFetchEmployeeQuery(0)


    useEffect(() => {
        loadOrders(dispatch, URL);
        reCounterparties()
        reStatusDOs()
        reContractCategories()
        reRases()
        reEmployee()

    }, [URL]);


    useEffect(() => {
        !isLoading && setChachEemployee(employee.map((item) => ({
            ...item,
            fullName: `${item.lastName} ${item.firstName} ${item.patronymicName}`,
        })))
    }, [isLoading])

    const onSaving = useCallback((e) => {
        ProcessClassificationsObj(e.changes[0].data, "counterpartyCustomer");
        ProcessClassificationsObj(e.changes[0].data, "contractCategory");
        ProcessClassificationsObj(e.changes[0].data, "counterpartyProvider");
        ProcessClassificationsObj(e.changes[0].data, "counterpartySubcontractor");
        ProcessClassificationsObj(e.changes[0].data, "projectEmployee");
        ProcessClassificationsObj(e.changes[0].data, "ras");
        ProcessClassificationsObj(e.changes[0].data, "executorDO");
        ProcessClassificationsObj(e.changes[0].data, "statusDO");
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

    const dataWithFullName = state.data.map((item) => ({
        ...item,
        fullName: `${item.projectEmployee.lastName} ${item.projectEmployee.firstName} ${item.projectEmployee.patronymicName}`,
    }));


    return (
        <CustomDataGrid
            visible={state.isLoading}
            keyExpr="id"
            dataSource={dataWithFullName}
            onSaving={onSaving}
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
                <Popup title={`${titleMethod} договор`} showTitle={true}/>
                <Form colCount={3}>
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
                    <Item dataField="statusDO.id"/>
                    <Item dataField="contractSigningOption"/>
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
                    <Item dataField="noteDO" editorType={'dxTextArea'} colSpan={3}/>
                </Form>
            </Editing>
            <Column alignment={"left"} dataField="contractCategory.id" caption={'Категория договора'} visible={false}
                    allowEditing={true}
                    dataType={"number"}>
                <Lookup
                    dataSource={contractCategories}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID договора'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"left"} dataField="contractCategory" caption={'Категория договора'}>

                <Column alignment={"left"} dataField="contractCategory.name"
                        caption={'Наименование категории договора'}
                        dataType={"string"}/>

                <Column alignment={"left"} dataField="contractCategory.note"
                        caption={'Примечание'}
                        dataType={"string"}/>
            </Column>
            <Column alignment={"left"} dataField="address" caption={'Адрес договора'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="title" caption={'Титул полный'} dataType={"string"}
                    validationRules={validationRules}/>

            <Column alignment={"left"} dataField="counterpartyCustomer.id" caption={'Контрагент-заказчик'}

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
            <Column alignment={"left"} dataField="counterpartySubcontractor.id" caption={'Контрагент-субподрядчик'}
                    dataType={"number"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterparties}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="counterpartyProvider.id" caption={'Контрагент-поставщик'}
                    dataType={"number"}
                    validationRules={validationRules}>
                <Lookup
                    dataSource={counterparties}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>


            {/*<Column alignment={"left"} dataField="counterpartySubcontractor" caption={'Контрагент субподрядчик'}>*/}

            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.counterpartyFormatId"*/}
            {/*            caption={'ID формата контрагента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.counterpartyStatusId"*/}
            {/*            caption={'ID статуса контрагента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.customerClassificationId"*/}
            {/*            caption={'ID номер клиента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.id" caption={'ID'}*/}
            {/*            dataType={"number"}*/}
            {/*            validationRules={validationRules}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.inn" caption={'ИНН'}*/}
            {/*            dataType={"string"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.isCustomer" caption={'Заказчик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.isProvider" caption={'Поставщик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.isSubcontractor"*/}
            {/*            caption={'Субподрядчик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.isWithOutNDS"*/}
            {/*            caption={'Продается без учета НДС'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.name" caption={'Имя'}*/}
            {/*            dataType={"string"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartySubcontractor.note" caption={'Примечание'}*/}
            {/*            dataType={"string"}/>*/}
            {/*</Column>*/}

            {/*<Column alignment={"left"} dataField="counterpartyProvider" caption={'Контрагент поставщик'}>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.counterpartyFormatId"*/}
            {/*            caption={'ID формата контрагента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.counterpartyStatusId"*/}
            {/*            caption={'ID статуса контрагента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.customerClassificationId"*/}
            {/*            caption={'ID номер клиента'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.id" caption={'ID'}*/}
            {/*            dataType={"number"}*/}
            {/*            validationRules={validationRules}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.inn" caption={'ИНН'}*/}
            {/*            dataType={"string"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.isCustomer" caption={'Заказчик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.isProvider" caption={'Поставщик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.isSubcontractor" caption={'Субподрядчик'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.isWithOutNDS"*/}
            {/*            caption={'Продается без учета НДС'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.name" caption={'Имя'}*/}
            {/*            dataType={"string"}/>*/}
            {/*    <Column alignment={"left"} dataField="counterpartyProvider.note" caption={'Примечание'}*/}
            {/*            dataType={"string"}/>*/}
            {/*</Column>*/}


            <Column alignment={"left"} dataField="contractNumberCustomer" caption={'Номер договора с заказчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="contractNumberSubcontractor"
                    caption={'Номер договора с субподрядчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="contractNumberProvider" caption={'Номер договора с поставщиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="additionalAgreementCustomer"
                    caption={'Номер Д/С с заказчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="additionalAgreementSubcontractor"
                    caption={'Номер Д/С с субподрядчиком'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="additionalAgreementProvider"
                    caption={'Номер Д/С с поставщиком'}
                    dataType={"string"}/>
            <Column alignment={"left"} dataField="noSap"
                    dataType={"string"} caption={"No SAP"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="subscriber" caption={'Абонент'}
                    dataType={"string"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="ras.id" caption={'РЭС'}
                    dataType={"number"} visible={true}>
                <Lookup
                    dataSource={rases}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="projectEmployee.id" caption={'Ф.И.О. руководителя проекта'}
                    dataType={"number"}>
                <Lookup
                    dataSource={chachEemployee}
                    valueExpr="id"
                    displayExpr={'fullName'}
                />
            </Column>
            <Column alignment={"left"} dataField="executorDO.id" caption={'Исполнитель | ДО'}
                    dataType={"number"}>
                <Lookup
                    dataSource={rases}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>
            <Column alignment={"left"} dataField="statusDO.id" caption={'Статус ДО'}
                    allowEditing={true}
                    dataType={"number"}>
                <Lookup
                    dataSource={statusDOs}
                    valueExpr="id"
                    displayExpr={'name'}
                />
            </Column>

            {/*<Column alignment={"left"} dataField="ras" caption={'РЭС'}*/}
            {/*        dataType={"number"}>*/}
            {/*    <Column alignment={"left"} dataField="ras.id" caption={'ID'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="ras.sortIndex" caption={'Сортировка'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="ras.name" caption={'Имя'}*/}
            {/*            dataType={"string"}/>*/}
            {/*    <Column alignment={"left"} dataField="ras.note" caption={'Примечание'}*/}
            {/*            dataType={"string"}/>*/}
            {/*</Column>*/}


            {/*<Column alignment={"left"} dataField="projectEmployee" caption={'Сотрудник проекта'}>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.id" caption={'ID '}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.lastName" caption={'Фамилия'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.firstName" caption={'Имя'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.patronymicName" caption={'Отчество'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="projectEmployee.isActive" caption={'Активен'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.departmentId" caption={'ID отдела'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="projectEmployee.positionId" caption={'ID позиции'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="projectEmployee.isViewHiddenCosts"*/}
            {/*            caption={'Просмотр скрытых затрат'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*</Column>*/}

            {/*<Column alignment={"left"} dataField="executorDO" caption={'Исполнитель | ДО'}>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.id" caption={'ID'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.lastName" caption={'Фамилия'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.firstName" caption={'Имя'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.patronymicName" caption={'Отчество'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.isActive" caption={'Активен'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.departmentId" caption={'ID отдела'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.positionId" caption={'ID позиции'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="executorDO.isViewHiddenCosts"*/}
            {/*            caption={'Просмотр скрытых затрат'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*</Column>*/}

            {/*<Column alignment={"left"} dataField="statusDO" caption={'Статус ДО'}>*/}
            {/*    <Column alignment={"left"} dataField="statusDO.id" caption={'ID'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="statusDO.sortIndex" caption={'Сортировка'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="statusDO.name" caption={'Имя'}*/}
            {/*            dataType={"string"}/>*/}
            {/*</Column>*/}

            <Column alignment={"left"} dataField="contractSigningOption" caption={'Вариант подписания договора'}
                    dataType={"string"}/>
            <Column alignment={"left"} dataField="noteDO" caption={'Примечание от ДО'}
                    dataType={"string"}/>
            <Column alignment={"left"} dataField="numberTechTask" caption={'Номер ТЗ'}
                    dataType={"string"}/>
            <Column alignment={"left"} dataField="createdDate" caption={'Дт внесения строчки'}
                    dataType={"date"}/>
            <Column alignment={"left"} dataField="conclusionContractDate" caption={'Дт заключения договора'}
                    dataType={"date"} validationRules={validationRules}/>
            <Column alignment={"left"} dataField="returnSignContractDate"
                    caption={'Дт возврата подписанного договора'}
                    dataType={"date"}/>

            {/*<Column alignment={"left"} dataField="createdEmployee" caption={'Созданный сотрудник'}>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.departmentId" caption={'ID отдела'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.lastName" caption={'Фамилия'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.firstName" caption={'Имя'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.patronymicName" caption={'Отчество'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.id" caption={'ID'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="createdEmployee.isActive" caption={'Активен'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="createdEmployee.positionId" caption={'ID позиции'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="createdEmployee.isViewHiddenCosts"*/}
            {/*            caption={'Просмотр скрытых затрат'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*</Column>*/}
            <Column alignment={"left"} dataField="startDate" caption={'Дт начала работ по договору'}
                    dataType={"date"}/>
            <Column alignment={"left"} dataField="endDate" caption={'Дт окончания работ по договору'}
                    dataType={"date"}/>
            <Column alignment={"left"} dataField="cancellationDate" caption={'Дт аннуляции договора'}
                    dataType={"date"}/>
            <Column alignment={"left"} dataField="terminationDate" caption={'Дт расторжения договора'}
                    dataType={"date"}/>
            <Column alignment={"left"} dataField="summaPIR" caption={'СУММА | ПИР'}
                    dataType={"number"}/>
            <Column alignment={"left"} dataField="summaSMR" caption={'СУММА | СМР'}
                    dataType={"number"}/>
            <Column alignment={"left"} dataField="summaEquipment" caption={'СУММА | ОБОРУДОВАНИЕ'}
                    dataType={"number"}/>
            <Column alignment={"left"} dataField="summaOther" caption={'СУММА | ПРОЧЕЕ'}
                    dataType={"number"}/>
            <Column alignment={"left"} dataField="summa" caption={'СУММА | По договору'}
                    dataType={"number"}/>

            {/*<Column alignment={"left"} dataField="updateStatusDOEmployee" caption={'Созданный сотрудник'}>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.id" caption={'ID'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.lastName" caption={'Фамилия'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.firstName" caption={'Имя'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.patronymicName" caption={'Отчество'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="updateStatusDOEmployee.isActive" caption={'Активен'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.departmentId" caption={'ID отдела'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"left"} dataField="updateStatusDOEmployee.positionId" caption={'ID позиции'}*/}
            {/*            dataType={"number"}/>*/}
            {/*    <Column alignment={"center"} dataField="updateStatusDOEmployee.isViewHiddenCosts"*/}
            {/*            caption={'Просмотр скрытых затрат'}*/}
            {/*            dataType={"boolean"}/>*/}
            {/*</Column>*/}


            <Column alignment={"left"} dataField="updateStatusDODate"
                    caption={'Последнее редактирование "Когда" | Статус ДО'}
                    dataType={"date"}/>
        </CustomDataGrid>
    )
}
