import DataGrid, { HeaderFilter, Scrolling,  SearchPanel} from 'devextreme-react/data-grid';
import React, {ReactNode} from 'react';
import {onInitNewRow} from "../../../generic/Function/OnInitNewRow";
import {TableName} from "../TableName/TableName";
import {LoadPanel} from "devextreme-react/load-panel";
import './CustomDataGrid.scss'

interface ICustomDataGrid {
    dataSource: any
    onSaving: any
    keyExpr?: string
    dataOnInitNewRow?: any
    children: ReactNode
    visible: boolean
    editingChanges?: any
    editingOnChangesChange?: (value: any) => void
    editingEditRowKey?: any
    editingOnEditRowKeyChange?: (value: any) => void
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
                                   editingOnEditRowKeyChange
                               }: ICustomDataGrid) => {
    return (
        <>
            <TableName/>
            <LoadPanel
                position={{of: '#gridContainer'}}
                visible={visible}
            />
            <DataGrid
                id="gridContainer"
                keyExpr={keyExpr}
                dataSource={dataSource}
                showBorders={true}
                repaintChangesOnly
                // allowColumnReordering={true}
                // rowAlternationEnabled={true}
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                onSaving={onSaving}
                columnMinWidth={100}
                onInitNewRow={(e) => onInitNewRow(e, dataOnInitNewRow)}
                hoverStateEnabled={true}
                className='custom-data-grid'
            >
                <Scrolling
                    columnRenderingMode={"standard"}
                    mode={'infinite'}
                />
                {/*<FilterRow visible={true}/>*/}
                <SearchPanel visible={true}/>
                <HeaderFilter visible={true}/>
                {/*<Editing*/}
                {/*    mode="popup"*/}
                {/*    allowAdding={true}*/}
                {/*    allowDeleting={true}*/}
                {/*    allowUpdating={true}*/}
                {/*    changes={editingChanges}*/}
                {/*    onChangesChange={editingOnChangesChange}*/}
                {/*    editRowKey={editingEditRowKey}*/}
                {/*    onEditRowKeyChange={editingOnEditRowKeyChange}>*/}
                {/*   */}
                {/*</Editing>*/}
                {children}
            </DataGrid>
        </>
    );
};
