import React, { ReactNode } from 'react';
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
                                   visible
                               }: ICustomDataGrid) => {

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
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                onSaving={onSaving}
                columnMinWidth={25}
                onInitNewRow={(e) => onInitNewRow(e, dataOnInitNewRow)}
                hoverStateEnabled={true}
                className='custom-data-grid'
            >
                <Scrolling columnRenderingMode={"standard"} mode={'infinite'} />
                <SearchPanel visible={true} />
                <HeaderFilter visible={true} />
                {children}
            </DataGrid>
        </>
    );
};
