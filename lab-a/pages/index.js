import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"

import { i18n, withTranslation } from '../i18n'

// css
import "../static/css/app.scss"

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const token = cookies.get('token');

const Main = ({ t }) => (
    <div className="platform">        
        <p>Hello Next.js</p>
        <span>{t('h1')}</span>
        <a href="#"> {t('change-locale')}</a>
    </div>
)
let isLogin = false;

const Index = (props) => {
    const { t } = props;
    
    return <Main t={t} />;
}

Index.getInitialProps = async (res) => {     
    return {
        isLogin: (token ? true : false),
        namespacesRequired: ['common'],
    }
}

Index.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Index);