import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"

import { i18n, withTranslation } from '../i18n'

// css
import "../static/css/app.scss"

import { actionTypes, logoutRequest } from '../redux/module/login';
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();

// const token = cookies.get('token');

const Main = ({ t , click }) => (
    <div className="platform">        
        <p>Hello Next.js</p>
        <span>{t('h1')}</span>
        <a href="#"> {t('change-locale')}</a>
        <p>
            <a href="#" onClick={click} >logout</a>
        </p>
        
    </div>
)
let isLogin = false;

const Index = (props) => {
    const { t } = props;

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutRequest());       
    }

    return <Main t={t} click={logout} />;
}

Index.getInitialProps = async (res) => {     
    return {
        // isLogin: (token ? true : false),
        namespacesRequired: ['common']
    }
}

Index.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Index);