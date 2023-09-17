import React from 'react';
import {navigation} from "../../App/app-navigation";
import {useNavigation} from "../../../../core/lib/contexts/navigation";

export const TableName = () => {
    const {navigationData: {currentPath}} = useNavigation();

    return (
            <div className='generic__title'>
                    {
                        navigation.map((data) => data.items.map((item) => (
                            currentPath.includes(item.path) && item.text
                        )))
                    }
            </div>
    );
};

