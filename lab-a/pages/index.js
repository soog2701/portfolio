import React, { useCallback, useEffect } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"
// import { startClock, tickClock } from '../redux/module/actions'

import { i18n, withTranslation } from '../i18n'
//  Link, 
import Router from 'next/router'

// css
import "../static/css/app.scss"



const Main = ({ t }) => (    
    <div>
        <p>Hello Next.js</p>
        <span>{t('h1')}</span>
        <a href="#"> {t('change-locale')}</a>
    </div>
)
const Index = (props) => {
    const { t } = props;
    const dispatch = useDispatch();
    // const { store, isServer } = props.ctx;
    // const t = store.dispatch(tickClock(props.ctx.isServer));
    // const ts = useCallback(
    //     () => {
    //         dispatch(tickClock()); 
    //         console.log(store.getState());
    //     },
    //     [dispatch]
    // );
    // ts();
    const store = useStore();
    const { login } = store.getState();
    
    useEffect(()=>{
        // console.log('login===',!login.login)
        // if(!login.login) Router.push(`/login`); 
    })
      
    return <Main t={t} />;
}

Index.getInitialProps = async (res) => ({
    namespacesRequired: ['common'],
})

Index.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Index);