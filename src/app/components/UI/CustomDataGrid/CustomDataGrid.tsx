import React, { ReactNode, useEffect, useState } from 'react';
import DataGrid, {  HeaderFilter, Scrolling, SearchPanel } from 'devextreme-react/data-grid';
import { onInitNewRow } from "../../../generic/Function/OnInitNewRow";
import { TableName } from "../TableName/TableName";
import { LoadPanel } from "devextreme-react/load-panel";
import './CustomDataGrid.scss';
import 'devextreme-react/text-area';
import 'devextreme-react/color-box';
import 'devextreme-react/text-box';
interface ICustomDataGrid {
    dataSource: any;
    onSaving: any;
    keyExpr?: string;
    dataOnInitNewRow?: any;
    children: ReactNode;
    visible: boolean;
    editingChanges?: any;
    editingOnChangesChange?: (value: any) => void;
    editingEditRowKey?: any;
    editingOnEditRowKeyChange?: (value: any) => void;
}

export const CustomDataGrid = ({
                                   dataSource,
                                   onSaving,
                                   children,
                                   keyExpr,
                                   dataOnInitNewRow,
                                   visible,
                                   editingChanges,
                                   editingOnChangesChange,
                                   editingEditRowKey,
                                   editingOnEditRowKeyChange,
                               }: ICustomDataGrid) => {
    const [columnOrder, setColumnOrder] = useState<number[]>([]);

    // Загрузка сохраненных настроек при монтировании компонента
    useEffect(() => {
        const savedColumnOrder = JSON.parse(localStorage.getItem('columnOrder')) || [];
        setColumnOrder(savedColumnOrder);
    }, []);

    // Обработчик события изменения порядка колонок
    const onColumnReorder = (e: { component: any; event: any }) => {
        // Получаем новый порядок колонок из компонента DataGrid
        const newColumnOrder = e.component.state().columnOrder;

        // Обновляем состояние с новым порядком колонок
        setColumnOrder(newColumnOrder);

        // Сохраняем порядок колонок в локальное хранилище
        localStorage.setItem('columnOrder', JSON.stringify(newColumnOrder));
    };

    return (
        <>
            <TableName />
            <LoadPanel
                position={{ of: '#gridContainer' }}
                visible={visible}
            />
            <DataGrid
                id="gridContainer"
                keyExpr={keyExpr}
                dataSource={dataSource}
                showBorders={true}
                repaintChangesOnly
                allowColumnReordering={true}
                // onColumnReorder={onColumnReorder}
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                onSaving={onSaving}
                columnMinWidth={100}
                onInitNewRow={(e) => onInitNewRow(e, dataOnInitNewRow)}
                hoverStateEnabled={true}
                className='custom-data-grid'
                // defaultColumnOrder={columnOrder}
            >
                <Scrolling columnRenderingMode={"standard"} mode={'infinite'} />
                <SearchPanel visible={true} />
                <HeaderFilter visible={true} />
                {children}
            </DataGrid>
        </>
    );
};
