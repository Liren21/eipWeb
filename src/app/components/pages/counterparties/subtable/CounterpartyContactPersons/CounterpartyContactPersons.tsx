import React from 'react';
import {Column} from "devextreme-react/data-grid";
import {CustomDataGrid} from "../../../../UI/CustomDataGrid/CustomDataGrid";

interface IDataCell {
    dataCell:any
}
const CounterpartyContactPersons = ({dataCell}:IDataCell) => {
    return (
        <CustomDataGrid
            dataSource={dataCell.counterpartyContactPersons}
            dataOnInitNewRow={{isMain: false}}
        >
            <Column alignment={"left"} defaultSortOrder={"asc"} dataField="id"
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
        </CustomDataGrid>
    );
};

export default CounterpartyContactPersons;
