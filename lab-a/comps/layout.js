import React, { Fragment } from 'react'
import { useSelector, useDispatch, useStore } from "react-redux"
//
import DesignAlert from '../comps/DesignAlert'
import LayoutHead from './LayoutHead'
import LayoutFooter from './LayoutFooter'

export default function Layout(props) {
    const { isShow, message } = useSelector(state => state.exception, {});
    return (
        props.nohead ? 
        (<Fragment >
            {props.children}
            {/* dialog */}
            <DesignAlert show={isShow} btnText={'close'} message={message} />
        </Fragment>) :
        (<Fragment >
            <LayoutHead></LayoutHead>
            {props.children}
            {/* dialog */}
            <DesignAlert show={isShow} btnText={'close'} message={message} />
            <LayoutFooter></LayoutFooter>
        </Fragment>)
    )
}