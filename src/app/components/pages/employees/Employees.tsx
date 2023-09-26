import React, {useCallback, useEffect, useReducer, useState} from 'react';
import urls from "../../../lib/urls";
import {CustomDataGrid} from "../../UI/CustomDataGrid/CustomDataGrid";
import {Column, Editing, Form, Popup} from "devextreme-react/data-grid";
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import reducer from "../../../../core/lib/api/reducer";
import {loadOrders, saveChange} from "../../../../core/lib/api/actions";
import {TableVariable} from "../../../generic/Variable/TableVariable";
import {OnChangesChange} from "../../../generic/Function/OnChangesChange";
import {OnEditRowKeyChange} from "../../../generic/Function/OnEditRowKeyChange";


export const Employees = () => {
    const URL: string = urls.EMPLOYEES
    const [state, dispatch] = useReducer(reducer, TableVariable);
    const [titleMethod, setTitleMethod] = useState('')


    useEffect(() => {
        loadOrders(dispatch, URL);

    }, [URL]);

    const onSaving = useCallback((e) => {
        e.cancel = true;
        e.promise = saveChange(dispatch, e.changes[0], URL);
    }, [URL]);

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
                <Popup title={`${titleMethod} сотрудника`} showTitle={true}/>
                <Form>
                    <Item dataField={'lastName'}/>
                    <Item dataField={'firstName'}/>
                    <Item dataField={'patronymicName'}/>
                    <Item dataField={'departmentId'}/>
                    <Item dataField={'positionId'}/>
                </Form>
            </Editing>
            <Column
                alignment="center"
                caption="Ф.И.О"
                dataField={'fullName'}
            />
            <Column alignment={"left"} fixed={true} dataField="id" defaultSortOrder={"asc"} caption={'ID'}
                    allowEditing={false} dataType={"number"}/>
            <Column alignment={"left"} dataField="lastName" visible={false} caption={'Фамилия'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="firstName" visible={false} caption={'Имя'} dataType={"string"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="patronymicName" visible={false} caption={'Отчество'}
                    dataType={"string"}/>
            <Column alignment={"left"} dataField="departmentId" caption={'ID отдела'} dataType={"number"}
                    validationRules={validationRules}/>
            <Column alignment={"left"} dataField="positionId" caption={'ID позиции'} dataType={"string"}
                    validationRules={validationRules}/>

        </CustomDataGrid>
    );
}
