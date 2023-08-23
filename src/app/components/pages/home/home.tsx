import {Item as ItemPopup} from 'devextreme-react/form';
import {
    DataGrid,
    // Fixing columns
    ColumnFixing,
    // Hiding columns
    ColumnChooser,
    // Dragging columns
    Sorting,
    // Search with filtering by each column
    FilterRow,
    // Search across all columns and rows
    SearchPanel,
    // Separate filter for each column
    HeaderFilter,
    // The ability to save filters in a separate panel and clear them
    FilterPanel,
    // Working with changing and adding data
    Editing,
    // Pop-up for editing and adding a line
    Popup,
    // Row Selection
    Selection,
    // Output of total values
    Summary,
    // Which column to output and what value to output
    TotalItem,
    // Working with columns
    Column,
    // Editing the Toolbar
    Toolbar,
    // Toolbar item
    Item,
    // Export Settings
    Export,
    // Setting up scrolling
    Scrolling,
    // Setting up Pagination
    Paging,
    Form,
    Lookup,
    Button,
} from 'devextreme-react/data-grid';

import './home.scss';

import {ExportFile} from "../../lib/func/ExportFile";
import {contractsService} from "../../lib/store/services/contractsService";
import {employeeService} from "../../lib/store/services/employeeService";
import {contractSignStatesService} from "../../lib/store/services/contractSignStatesService";
import {partnersService} from "../../lib/store/services/partnersService";
import {contractTypesService} from "../../lib/store/services/contractTypesService";
import {counterpartyFormatsService} from "../../lib/store/services/counterpartyFormatsService";
import {customerClassificationsService} from "../../lib/store/services/сustomerClassificationsService";
import React, {useState} from "react";
import Guid from "devextreme/core/guid";

const exportFormats = ['xlsx'];


export default function Home() {

    const {data: contractTypes} = contractTypesService.useFetchContractTypeQuery('')
    const {data: contracts,refetch:reContracts} = contractsService.useFetchContractsQuery('')
    const {data: employee} = employeeService.useFetchEmployeeQuery('')
    const {data: signStates} = contractSignStatesService.useFetchContractSignStatesQuery('')
    const {data: consumers} = partnersService.useFetchPartnersQuery('')
    const {data: counterpartyFormats} = counterpartyFormatsService.useFetchCounterpartyFormatsQuery('')
    const {data: customerClassifications} = customerClassificationsService.useFetchCustomerClassificationsQuery('')
    const [changes, setChanges] = useState([]);
    const [editRowKey, setEditRowKey] = React.useState(null);

    const onAddButtonClick = React.useCallback((e) => {
        const key = new Guid().toString();
        setChanges([{
            key,
            type: 'insert',
            insertAfterKey: e.row.key,
        }]);
        setEditRowKey(key);
    }, []);
    // const rentsStore = new CustomStore({
    //     key: 'id',
    //     loadMode: 'raw',
    //     load: () => contracts,
    //     insert: async (value) => {
    //         refreshDataGrid();
    //         return await axios.post(
    //             urls.CONTRACTS,
    //             {
    //                 createdByEmployeeId: value.createdByEmployeeId,
    //                 signStateId: value.signStateId,
    //                 involvedByEmployeeId: value.involvedByEmployeeId,
    //                 consumerId: value.consumerId,
    //                 typeId: value.typeId,
    //                 number: `${value.number}`,
    //                 agreementNumber: `${value.agreementNumber}`,
    //                 address: `${value.address}`,
    //                 note: 'string',
    //                 linkToContractFolder: 'string',
    //                 linkToSignedContractFile: 'string',
    //             }
    //         );
    //     },
    // });


    return (
        <>
            <DataGrid
                dataSource={contracts}
                // keyExpr="id"
                allowColumnReordering={true}
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                // remoteOperations={true}
                height={'90vh'}
                onExporting={ExportFile}>
                <ColumnFixing enabled={true}/>
                <ColumnChooser enabled={true}/>

                {/* Column ------------------------------------------------------------------- start */}

                <Column
                    dataField="id"
                    dataType="number"
                    caption="#"
                    width={80}
                    allowEditing={true}
                    defaultSortIndex={0}
                    defaultSortOrder="desc"
                />
                <Column dataField="created" dataType="datetime" caption="Дата" width={'auto'}/>

                {/* createdByEmployee start */}


                <Column
                    dataField="createdByEmployeeId"
                    dataType="number"
                    caption="#"
                    width={50}
                    allowEditing={true}
                    visible={false}>
                    <Lookup
                        dataSource={employee}
                        valueExpr="id"
                        displayExpr={(data: any) => {
                            if (!data) return '';

                            return [data.lastName, data.firstName, data.patronymicName].join(' ');
                        }}
                    />
                </Column>
                <Column dataField="createdByEmployee" caption="Создано сотрудником" width={'auto'}>
                    <Column dataField="createdByEmployee.lastName" caption="Фамилия" width={'auto'}/>
                    <Column dataField="createdByEmployee.firstName" caption="Имя" width={'auto'}/>
                    <Column dataField="createdByEmployee.patronymicName" caption="Отчество" width={'auto'}/>
                    <Column
                        dataField="createdByEmployee.departmentId"
                        caption="#"
                        width={'auto'}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column
                        dataField="createdByEmployee.positionId"
                        caption="Позиция"
                        width={'auto'}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="createdByEmployee.department" caption="Отдел" width={'auto'}>
                        <Column
                            dataField="createdByEmployee.department.id"
                            caption="#"
                            width={'auto'}
                            allowEditing={true}
                            visible={false}
                        />
                        <Column
                            dataField="createdByEmployee.department.name"
                            caption="Название отдела"
                            width={'auto'}
                        />
                        <Column
                            dataField="createdByEmployee.department.sortIndex"
                            caption="№"
                            width={'auto'}
                            allowEditing={true}
                            visible={false}
                        />
                    </Column>
                </Column>

                {/* createdByEmployee end */}

                {/* signState start */}

                <Column dataField="signStateId" caption="#" width={50} allowEditing={true} visible={false}>
                    <Lookup
                        dataSource={signStates}
                        valueExpr="id"
                        displayExpr={(data: any) => {
                            if (!data) return '';

                            return [data.name].join(' ');
                        }}
                    />
                </Column>
                <Column dataField="signState" caption="Статус" width={'auto'}>
                    <Column
                        dataField="signState.id"
                        caption="#"
                        width={50}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="signState.name" caption="Обозначение" width={'auto'}/>
                </Column>

                {/* signState end */}

                {/* involvedByEmployee start */}

                <Column
                    dataField="involvedByEmployeeId"
                    caption="#"
                    width={50}
                    allowEditing={true}
                    visible={false}>
                    <Lookup
                        dataSource={employee}
                        valueExpr="id"
                        displayExpr={(data: any) => {
                            if (!data) return '';

                            return [data.lastName, data.firstName, data.patronymicName].join(' ');
                        }}
                    />
                </Column>
                <Column dataField="involvedByEmployee" caption="Исполнитель" width={'auto'}>
                    <Column
                        dataField="involvedByEmployee.id"
                        caption="#"
                        width={50}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="involvedByEmployee.lastName" caption="Фамилия" width={'auto'}/>
                    <Column dataField="involvedByEmployee.firstName" caption="Имя" width={'auto'}/>
                    <Column dataField="involvedByEmployee.patronymicName" caption="Отчество" width={'auto'}/>
                    <Column
                        dataField="involvedByEmployee.departmentId"
                        caption="#"
                        width={50}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="involvedByEmployee.department" caption="Отдел" width={'auto'}>
                        <Column
                            dataField="involvedByEmployee.department.id"
                            caption="#"
                            width={50}
                            allowEditing={true}
                            visible={false}
                        />
                        <Column
                            dataField="involvedByEmployee.department.parentId"
                            caption="#"
                            width={50}
                            allowEditing={true}
                            visible={false}
                        />
                        <Column
                            dataField="involvedByEmployee.department.name"
                            caption="Название отдела"
                            width={'auto'}
                        />
                        <Column
                            dataField="involvedByEmployee.department.shortName"
                            caption="Сокращение"
                            width={'auto'}
                        />
                        <Column
                            dataField="involvedByEmployee.department.sortIndex"
                            caption="#"
                            width={50}
                            allowEditing={true}
                            visible={false}
                        />
                    </Column>
                </Column>

                {/* involvedByEmployee end */}

                {/* consumer start */}

                <Column dataField="consumerId" caption="#" width={50} allowEditing={true} visible={false}>
                    <Lookup
                        dataSource={consumers}
                        valueExpr="id"
                        displayExpr={(data: any) => {
                            if (!data) return '';
                            return [data.name, '-', data.consumerClassification].join(' ');
                        }}
                    />
                </Column>
                <Column dataField="consumer" caption="Клиент" width={'auto'}>
                    <Column
                        dataField="consumer.id"
                        caption="#"
                        width={50}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="consumer.name" caption="Название" width={'auto'}/>
                    <Column dataField="consumer.consumerClassification" caption="Класс" width={'auto'}/>
                    <Column
                        dataField="consumer.isConsumer"
                        dataType="boolean"
                        caption="Является потребителем"
                        width={100}
                    />
                </Column>

                {/* consumer end */}

                {/* type start */}

                <Column dataField="typeId" caption="#" width={50} allowEditing={true} visible={false}>
                    <Lookup
                        dataSource={contractTypes}
                        valueExpr="id"
                        displayExpr={(data: any) => {
                            if (!data) return '';

                            return [data.name, '-', data.groupLetter, '(', data.isBasic ? 'yes' : 'no', ')'].join(' ');
                        }}
                    />
                </Column>
                <Column dataField="type" caption="Тип" width={'auto'}>
                    <Column dataField="type.id" caption="#" width={50} allowEditing={true} visible={false}/>
                    <Column dataField="type.name" caption="Название" width={'auto'}/>
                    <Column
                        dataField="type.sortIndex"
                        caption="#"
                        width={50}
                        allowEditing={true}
                        visible={false}
                    />
                    <Column dataField="type.groupLetter" caption="Группа" width={50}/>
                    <Column dataField="type.isBasic" dataType="boolean" caption="Основной" width={100}/>
                </Column>

                {/* type end */}

                <Column dataField="number" dataType="string" caption="№ договора" width={'auto'}/>
                <Column
                    dataField="agreementNumber"
                    dataType="string"
                    caption="№ соглашения"
                    width={'auto'}
                />
                <Column dataField="address" dataType="string" caption="Адресс" width={'auto'}/>
                <Column dataField="isValid" dataType="boolean" caption="Действующий" width={'auto'}/>

                {/* Column ------------------------------------------------------------------- end */}

                <FilterRow visible={true}/>
                <SearchPanel visible={true} width={400}/>
                <HeaderFilter visible={true}/>
                <FilterPanel visible={true}/>

                {/* popup ----------------------- startt */}

                {/*<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true}>*/}
                {/*    <Popup showTitle={true} title="Добавить договор" fullScreen={false}/>*/}
                {/*    <Form>*/}
                {/*        <ItemPopup itemType="group" caption="Основные данные" colCount={1} colSpan={2}>*/}
                {/*            <ItemPopup itemType="group" colCount={4} colSpan={2}>*/}
                {/*                <ItemPopup dataField="id" visible={false}/>*/}
                {/*                <ItemPopup dataField="created"/>*/}
                {/*                <ItemPopup dataField="number"/>*/}
                {/*                <ItemPopup dataField="agreementNumber"/>*/}
                {/*                <ItemPopup dataField="isValid"/>*/}
                {/*            </ItemPopup>*/}
                {/*            <ItemPopup itemType="group" colCount={1} colSpan={2}>*/}
                {/*                <ItemPopup dataField="address"/>*/}
                {/*            </ItemPopup>*/}
                {/*        </ItemPopup>*/}

                {/*        <ItemPopup itemType="group" caption="Создатель записи" colCount={2} colSpan={2}>*/}
                {/*            <ItemPopup dataField="createdByEmployeeId"/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.department.name"/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.id" visible={false}/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.departmentId" visible={false}/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.department.id" visible={false}/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.department.sortIndex" visible={false}/>*/}
                {/*        </ItemPopup>*/}

                {/*        <ItemPopup itemType="group" caption="Статус" colCount={1} colSpan={2}>*/}
                {/*            <ItemPopup dataField="signStateId"/>*/}
                {/*            <ItemPopup dataField="signState.id" visible={false}/>*/}
                {/*        </ItemPopup>*/}

                {/*        <ItemPopup itemType="group" caption="Исполнитель" colCount={3} colSpan={2}>*/}
                {/*            <ItemPopup dataField="involvedByEmployeeId"/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.department.name"/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.department.shortName"/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.id" visible={false}/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.positionId" visible={false}/>*/}
                {/*            <ItemPopup dataField="createdByEmployee.departmentId" visible={false}/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.department.id" visible={false}/>*/}
                {/*            <ItemPopup dataField="involvedByEmployee.department.sortIndex" visible={false}/>*/}
                {/*        </ItemPopup>*/}

                {/*        <ItemPopup itemType="group" caption="Заказчик" colCount={1} colSpan={2}>*/}
                {/*            <ItemPopup dataField="consumerId"/>*/}
                {/*        </ItemPopup>*/}

                {/*        <ItemPopup itemType="group" caption="Тип договора" colCount={1} colSpan={2}>*/}
                {/*            <ItemPopup dataField="typeId"/>*/}
                {/*        </ItemPopup>*/}
                {/*    </Form>*/}
                {/*</Editing>*/}
                <Column fixed={true} type='buttons'>
                    <Button
                        icon={'edit'}

                        // onClick={onAddButtonClick}
                        visible={true}
                    />
                    <Button
                        icon={'delete'}

                        onClick={onAddButtonClick}
                        visible={true}
                    />
                </Column>

                {/* popup ----------------------- end */}

                <Summary>
                    <TotalItem column="name" summaryType="count"/>
                </Summary>
                <Toolbar>
                    <Item name="addRowButton"/>
                    <Item name="exportButton"/>
                    <Item name="searchPanel"/>
                    <Item location="before" name="columnChooserButton"/>
                    <Item location="before">
                        <Button icon="refresh" onClick={()=>reContracts()}/>
                    </Item>
                </Toolbar>
                <Export enabled={true} allowExportSelectedData={true} formats={exportFormats}/>
                <Scrolling rowRenderingMode="standard"/>
                <Paging enabled={false}/>
                 {/*<Paging defaultPageSize={100} />*/}
                <Selection mode="multiple"/>
                <Sorting mode="single"/>
            </DataGrid>
        </>
    );
}
