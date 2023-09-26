import React, {useState} from 'react';
import Button from 'devextreme-react/button';
import DataGrid, {
    Column, Editing, Paging, Lookup,
} from 'devextreme-react/data-grid';

import {employees, states} from './data';

const Test = () => {
    const [events, setEvents] = useState([]);

    const logEvent = (eventName) => {
        setEvents((prevEvents) => [eventName, ...prevEvents]);
    };

    const clearEvents = () => {
        setEvents([]);
    };

    return (
        <React.Fragment>
            <DataGrid
                id="gridContainer"
                repaintChangesOnly
                columnAutoWidth={true}
                allowColumnResizing={true}
                showColumnLines={true}
                columnMinWidth={50}
                dataSource={employees}
                keyExpr="ID"
                allowColumnReordering={true}
                showBorders={true}
                onEditingStart={() => logEvent('EditingStart')}
                onInitNewRow={() => logEvent('InitNewRow')}
                onRowInserting={() => logEvent('RowInserting')}
                onRowInserted={() => logEvent('RowInserted')}
                onRowUpdating={() => logEvent('RowUpdating')}
                onRowUpdated={() => logEvent('RowUpdated')}
                onRowRemoving={() => logEvent('RowRemoving')}
                onRowRemoved={() => logEvent('RowRemoved')}
                onSaving={() => logEvent('Saving')}
                onSaved={() => logEvent('Saved')}
                onEditCanceling={() => logEvent('EditCanceling')}
                onEditCanceled={() => logEvent('EditCanceled')}>

                <Paging enabled={true}/>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}/>

                <Column alignment={"left"} dataField="Prefix" caption="Title"/>
                <Column alignment={"left"} dataField="FirstName"/>
                <Column cssClass='column' dataField="LastName"/>
                <Column dataField="Position" width={130}/>
                <Column
                    dataField="StateID"
                    caption="State"
                    width={125}
                >
                    <Lookup dataSource={states} displayExpr="Name" valueExpr="ID"/>
                </Column>
                <Column
                    dataField="BirthDate"
                    width={125}
                    dataType="date"/>
            </DataGrid>
        </React.Fragment>
    );
}

export default Test;
