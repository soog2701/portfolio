import React, { Component, useEffect } from 'react'
import $ from 'jquery'
import Select from 'react-select'
import styles from "./../../static/css/component.scss"

const layoutStyle = {
    display: 'inline-block',
    width: '200px'
}

const customStyles = {
    control: (provided, state) => {
        return {
            ...provided,
            borderColor: '#d7dcde',
            borderRadius: '3px',
            height: '36px',
            minHeight: '36px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'none',
                boxShadow: 'none'
            }            
        }
    },
    menu: (provided, state) => {
        return{
            ...provided,
            marginTop: '0',
            borderColor: 'none',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'none',
                boxShadow: 'none'
            } 
        }
    },
    indicatorSeparator: (provided, state) => {
        return {
            backgroundColor: 'transparent'
        }
    }
}
export default function Selectbox (props) {
    // useEffect(() => {
    //     console.log($('da-select select'))
    //     $('da-select select').select2();
    // }, [])
    
    return (       
        <div className={styles['dabeeo-selectWrap']} style={layoutStyle} >
            <Select options={props.options} id={props.id} styles={customStyles} onChange={props.onChange} value={props.value} />
        </div>
    )
}
