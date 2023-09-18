import React from 'react';
import {navigation} from "../../App/app-navigation";
import {useNavigation} from "../../../../core/lib/contexts/navigation";
import './TableName.scss'

export const TableName = () => {
    const {navigationData: {currentPath}} = useNavigation();

    return (
        <div className='table-name__title'>
            {
                navigation.map((data) => data.items.map((item) => (
                    currentPath.includes(item.path) && item.text
                )))
            }
        </div>
    );
};

