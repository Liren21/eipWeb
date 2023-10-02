import React, {useEffect, useState} from 'react';

interface IElement {
    data: any
}

const Element = ({data}: IElement) => {
    const [style, setStyle] = useState<any>({})
    const [val, setVal] = useState<string>('')
    const [color, setColor] = useState<string>('')


    useEffect(() => {
        if (data.data.style !== undefined) {
            if (data.data.style.indexOf('#')) {
                setStyle(JSON.parse(data.data.style))
            }
        }
        if (typeof data.value === "string" && !data.value.indexOf('{')) {
            setColor(JSON.parse(data.value).color)
            setVal('')
        } else {
            setVal(data.value)
        }
    }, [])

    return (
        <div
            style={{
                fontWeight: style.fontFatness ? "bold" : "normal",
                fontStyle: style.cursive ? "italic" : 'normal',
                color: style.colorFont && style.colorFont,
                backgroundColor: color,
                padding: '.5rem ',
                borderRadius: '1rem'
            }}>
            {val}
        </div>
    );
};

export default Element;
