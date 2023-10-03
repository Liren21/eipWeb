import React, {useEffect, useState} from 'react';

interface IElement {
    data: any
}

const Element = ({data}: IElement) => {
    const [style, setStyle] = useState<any>({})
    const [val, setVal] = useState<string>('')
    const [color, setColor] = useState<string>('')


    useEffect(() => {
        setStyle(data.data.style)
        if (data.value !== undefined) {
            if (!data.value.toString().indexOf('#')) {
                setColor(data.value)
            }else {
                setVal(data.value)
            }
        }
    }, [data])

    return (
        <div
            style={{
                fontWeight: style.fontFatness ? "bold" : "normal",
                fontStyle: style.cursive ? "italic" : 'normal',
                color: style.colorFont && style.colorFont,
                backgroundColor: color,
                padding: '.5rem ',
                borderRadius: '1rem'
            }}
        >
            {val}
        </div>
    );
};

export default Element;
