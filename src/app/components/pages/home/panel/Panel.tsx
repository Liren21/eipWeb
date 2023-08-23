import React from 'react';
import {
    Export,
    Item,
    Paging,
    Scrolling,
    Selection,
    Sorting,
    Summary,
    Toolbar,
    TotalItem
} from "devextreme-react/data-grid";
import {Button} from "devextreme-react/button";
interface IProps {
    refetch:any
}
const exportFormats = ['xlsx'];
export const Panel = ({refetch}:IProps) => {
    return (
    <>
        <Summary>
            <TotalItem column="name" summaryType="count"/>
        </Summary>

        <Toolbar>
            <Item name="addRowButton"/>
            <Item name="exportButton"/>
            <Item name="searchPanel"/>
            <Item location="before" name="columnChooserButton"/>
            <Item location="before">
                <Button icon="refresh" onClick={()=>refetch()}/>
            </Item>
        </Toolbar>
        <Export enabled={true} allowExportSelectedData={true} formats={exportFormats}/>
        <Scrolling rowRenderingMode="standard"/>
        <Paging enabled={false}/>
        {/* <Paging defaultPageSize={100} /> */}
        <Selection mode="multiple"/>
        <Sorting mode="single"/>
    </>
    );
};

