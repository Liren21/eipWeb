import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Column} from 'devextreme-react/data-grid';
import {Item} from "devextreme-react/form";
import {validationRules} from "../../../generic/ValidationRules/ValidationRules";
import {Test2} from "./Test2";
import urls from "../../../lib/urls";


export const Test = () => {
    const URL: string = urls.CONTRACT_CATEGORIES


    return (
        <Test2 URL={URL}
               ItemColumns={
                   <>
                       <Item dataField="style" editorType="dxColorBox"/>
                       <Item dataField={'sortIndex'}/>
                       <Item dataField={'name'}/>
                       <Item dataField={'group'}/>
                       <Item dataField="note" editorType={'dxTextArea'} colSpan={2}/>
                   </>
               }
               dataColumns={
                   <>
                       <Column alignment={"center"} fixed={true} dataField="id" defaultSortOrder={"asc"}
                               caption={'ID'}
                               allowEditing={false} dataType={"number"}/>
                       <Column alignment={"center"} dataField="sortIndex" caption={'Сортировка'} dataType={"number"}
                               validationRules={validationRules}/>
                       <Column alignment={"center"} dataField="name" caption={'Наименование'} dataType={"string"}
                               validationRules={validationRules}/>
                       <Column alignment={"center"} dataField="group" caption={'Группа'} dataType={"string"}
                               validationRules={validationRules}/>
                       <Column alignment={"center"} dataField="note" caption={'Примечание'} dataType={"string"}
                       />
                       <Column alignment={"center"} dataField="style" caption={'Цветовое обозначение'}
                               dataType={"string"}
                               cellRender={(cellData) => (
                                   <div style={{backgroundColor: cellData.value, padding: '9px', borderRadius: '1rem'}}>

                                   </div>
                               )}/>
                   </>
               }
        />
    )
}
