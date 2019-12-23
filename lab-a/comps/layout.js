import React, { Fragment, useState  } from 'react'
import { useSelector, useDispatch, useStore } from "react-redux"
import Login from '../pages/login'
//
import DesignAlert from '../comps/DesignAlert'
import LayoutHead from './LayoutHead'
import LayoutFooter from './LayoutFooter'

export default function Layout(props) {
    const { isShow, message } = useSelector(state => state.exception, {});
    let [loginShow, setLoginShow] = useState(false);
    const goLogin = () => {
        setLoginShow(!loginShow);
        console.log('loginShow')
    }
    return (
        props.nohead ? 
        (<Fragment >
            {props.children}
            {/* dialog */}
            <DesignAlert show={isShow} btnText={'close'} message={message} />
        </Fragment>) :
        (<Fragment >
            <LayoutHead goLogin={goLogin}></LayoutHead>
            {props.children}
            {/* dialog */}
            <DesignAlert show={isShow} btnText={'close'} message={message} />
            {loginShow ? <Login /> : null }
            <LayoutFooter></LayoutFooter>
        </Fragment>)
    )
}