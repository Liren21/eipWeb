import React, {useCallback, useEffect, useReducer} from 'react';
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,

    Scrolling,
    Search
} from 'devextreme-react/data-grid';
import {LoadPanel} from 'devextreme-react/load-panel';
import 'whatwg-fetch';
import './PagePattern.scss'
import reducer from '../../lib/func/reducer';
import {
    saveChange, loadOrders, setChanges, setEditRowKey,
} from '../../lib/func/actions';
import {Counterparty} from "../../lib/store/models/true/Counterparty";


const initialState = {
    data: [],
    changes: [],
    editRowKey: null,
    isLoading: false,
};

interface IProps {
    URL: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({URL}: IProps) => {

    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        loadOrders(dispatch, URL);
    }, []);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, []);

    const onChangesChange = useCallback((changes) => {
        setChanges(dispatch, changes);
    }, []);

    const onEditRowKeyChange = useCallback((editRowKey) => {
        setEditRowKey(dispatch, editRowKey);
    }, []);


    const hasCompanyTypeKey = (array, key: keyof Counterparty): boolean => {
        return array.some(companyType => key in companyType);
    }

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
            >
                <Scrolling
                    columnRenderingMode={"virtual"}
                    mode={'virtual'}
                />
                {/*<Selection mode="multiple" deferred={true} />*/}
                <FilterRow visible={true}/> {/*Добавляет поиск или же фильм в колонку*/}

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
                />
                <Column width={70} fixed={true} dataField="id" caption={'id'} allowEditing={false} dataType={"number"}/>
                <Column dataField="counterpartyFormatId" allowEditing={false}
                        caption={'id формата контрагента'} dataType={"number"} />
                <Column dataField="name" caption={'Имя'} allowEditing={true} dataType={"string"}/>
                <Column dataField="inn" caption={'ИНН'} allowEditing={false} dataType={"string"}/>
                <Column dataField="sortIndex" caption={'Сортировочный индекс'} allowEditing={false} dataType={"number"}/>
                <Column dataField="isSmallFormatInn" caption={'isSmallFormatInn'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isWithOutNDS" caption={'isWithOutNDS'} allowEditing={false} dataType={"boolean"}/>
                <Column dataField="isCustomer" caption={'является клиентом'} allowEditing={false} dataType={"boolean"}/>
                <Column dataField="customerClassificationId" caption={'идентификационный номер клиента'} allowEditing={false}
                        dataType={"number"}/>
                <Column dataField="isSubcontractor" caption={'является субподрядчиком'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="isProvider" caption={'является поставщиком'} allowEditing={false}
                        dataType={"boolean"}/>
                <Column dataField="counterpartyStatusId" caption={'id статуса контрагента'} allowEditing={false}
                        dataType={"number"}/>
                <Column dataField="note" caption={'note'} allowEditing={false}
                        dataType={"string"}/>
                <Column dataField="counterpartyFormat" caption={'Формат контрагента'} allowEditing={false}>
                    <Column dataField="counterpartyFormat.id" caption={'id'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyFormat.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="counterpartyFormat.sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyFormat.note" caption={'Записка'} allowEditing={false}
                            dataType={"string"}/>
                </Column>
                <Column dataField="counterpartyStatus" caption={'Статус контрагента'} allowEditing={false}>
                    <Column dataField="counterpartyStatus.id" caption={'id'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="counterpartyStatus.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="counterpartyStatus.sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                            dataType={"number"}/>
                </Column>
                <Column dataField="providerClassifications" caption={'Классификации поставщиков'} allowEditing={false}>
                    <Column dataField="providerClassifications.id" caption={'id'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="providerClassifications.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="providerClassifications.sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="providerClassifications.note" caption={'Записка'} allowEditing={false}
                            dataType={"string"}/>
                </Column>
                <Column dataField="subcontractorClassifications" caption={'Классификации субподрядчиков'} allowEditing={false}>
                    <Column dataField="subcontractorClassifications.id" caption={'id'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="subcontractorClassifications.name" caption={'Имя'} allowEditing={false}
                            dataType={"string"}/>
                    <Column dataField="subcontractorClassifications.sortIndex" caption={'Сортировочный индекс'} allowEditing={false}
                            dataType={"number"}/>
                    <Column dataField="subcontractorClassifications.note" caption={'Записка'} allowEditing={false}
                            dataType={"string"}/>
                </Column>


            </DataGrid>

        </React.Fragment>
    );
}
