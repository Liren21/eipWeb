import React from 'react';
import {navigation} from "../../App/app-navigation";

const TableName = () => {
    return (
            <div className='generic__title'>

                    {
                        navigation.map((data) => data.items.map((item) => (
                            window.location.hash.includes(item.path) && item.text
                        )))
                    }

            </div>
    );
};

export default TableName;
