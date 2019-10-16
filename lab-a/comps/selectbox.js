import React, { Component, useEffect } from 'react'
import $ from 'jquery'

import Select from 'react-select'

const layoutStyle = {
    display: 'inline-block',
    width: '200px'
}

export default function Selectbox (props) {
    // useEffect(() => {
    //     console.log($('da-select select'))
    //     $('da-select select').select2();
    // }, [])
    
    return (       
        <div className="da-select menu-select--lang" style={layoutStyle} >
            <Select options={props. options} />
        </div>
    )
}
