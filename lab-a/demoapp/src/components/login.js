import React, { Component, useState, useCallback} from "react";
import {injectIntl, FormattedMessage} from 'react-intl';
import { useSelector, useDispatch, useStore } from "react-redux";
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    const dispatch = useDispatch();
    const store = useStore();
    const logingo = useCallback(
        () => {
            dispatch({ type: 'login/LOGINSUCCESS' }); 
            console.log(store.getState());
            props.history.push("/");
        },
        [dispatch]
    );
    // 
    console.log(props);
    return(
        <div>
            <p>login</p>
            
            <button onClick={logingo}>
                <FormattedMessage 
                    id="login"
                />
            </button>
            
        </div>
    )
};



export default injectIntl(Login);