import React from 'react';
import {Item} from "devextreme-react/form";
import {navigation} from "../../App/app-navigation";
import Toolbar from "devextreme-react/toolbar";

const TableName = () => {
    return (
            <Toolbar className='generic__title'>
                <Item label={{alignment: 'left'}}>
                    {
                        navigation.map((data) => data.items.map((item) => (
                            window.location.hash.includes(item.path) && item.text
                        )))
                    }
                </Item>
            </Toolbar>
    );
};

export default TableName;
