import React from 'react';
import DataGrid, {Column} from "devextreme-react/data-grid";
import {onInitNewRow} from "../../../../../generic/Function/OnInitNewRow";

interface IDataCell {
    dataCell:any
}
const CounterpartyContactPersons = ({dataCell}:IDataCell) => {
    return (
        <DataGrid
            dataSource={dataCell.counterpartyContactPersons}

            showColumnLines={true}
            onInitNewRow={(e) => onInitNewRow(e, {isMain: false})}
        >
            <Column alignment={"left"} dataField="id"
                    caption={'ID'} dataType={"number"}/>
            <Column alignment={"left"} dataField="fullName"
                    caption={'Ф.И.О'} dataType={"string"}/>
            <Column alignment={"left"} dataField="phone"
                    caption={'Рабочий телефон'} dataType={"string"}/>
            <Column alignment={"left"} dataField="mobilePhone"
                    caption={'Мобильный телефон'} dataType={"string"}/>
            <Column alignment={"left"} dataField="email"
                    caption={'Почта'} dataType={"string"}/>
            <Column alignment={"left"} dataField="note"
                    caption={'Примечание'} dataType={"string"}/>
            <Column alignment={"center"} dataField="isMain"
                    caption={'Основной'} allowEditing={false} dataType={"boolean"}/>
        </DataGrid>
    );
};

export default CounterpartyContactPersons;
