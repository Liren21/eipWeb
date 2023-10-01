import React from 'react';
import './ColumnElement.scss'

interface IColumnElement {
    data: any
    keyBlock: string
}

const ColumnElement = ({data, keyBlock}: IColumnElement) => {
    return (
        <div className='column-element'>
            {
                data.value.map((itemValue, index) =>
                    <div key={`${keyBlock}-${index}`}
                         className='column-element__item'>
                        {itemValue.name}
                    </div>
                )
            }
        </div>
    );
};

export default ColumnElement;
