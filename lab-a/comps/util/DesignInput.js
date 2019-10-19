
import React, { useState } from 'react'
import styles from "./../../static/css/component.scss"

export default function DesignInput(props) {
    const [inputvalue, setInputvalue] = useState('');
    const inputChange = (event) =>{
        setInputvalue(event.target.value);
        if(props.getData) props.getData({[props.name] : event.target.value});
    }
    return (        
        <div className={styles['yp-inputWrap'] +' '+ (props.className? props.className : '')} style={props.style}>
            <input type={props.type||'text'} placeholder={props.placeholder} value={inputvalue} name={props.name} onChange={inputChange} />
            {props.children}
        </div>
    )
}