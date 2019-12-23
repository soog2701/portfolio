import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useStore, useDispatch, useSelector } from "react-redux"  //useSelector, useDispatch, 

import PropTypes from 'prop-types'

import $ from 'jquery'

import Selectbox from '../comps/util/selectbox'
import DesignInput from '../comps/util/DesignInput'
import DesignCheckbox from '../comps/util/DesignCheckbox'
import {Btntype1} from '../comps/util/DesignBtnType1'

import { i18n, withTranslation } from '../i18n'
// css
import styles from "../static/css/app.scss"
import componentstyles from "../static/css/component.scss"

import { loginRequest } from '../redux/module/login';

import cookies from 'next-cookies'
import { Cookies } from 'react-cookie';
// const cookies = new Cookies();

// const token = cookies.get('token');

const Style = {
    marginBottom: '10px'
}

const Login = (props) => {
    const { t } = props;
    const options = [
        { value: 'ko', label: t('korean') },
        { value: 'en', label: t('english') },
        { value: 'ja', label: t('japenese') }
    ]
    const wrapRef = useRef();
    let nowLang = options.find(i => (i.value == i18n.language));
    const [show, setShow] = useState(false);
    
    const [selectedOptions, setSelectedOptions] = useState( nowLang );
    
    
    let userid, userpassword;
    let handleCreate = (data) => {
        const { username, password } = data;
        if( username ) userid = username;
        if( password ) userpassword = password;
    }

    const dispatch = useDispatch();
    let goLogin = (e) => {        
        dispatch(loginRequest({username:userid, password:userpassword}));         
    }
    let chageLang = (event) => {
        setSelectedOptions(event);
        i18n.changeLanguage(event.value);
    }
    useEffect(() => {
        // $('html, body, #__next').addClass('height100'); 
        setShow(true);
    }, []);
    
	return (
        show ? (
        // <div ref={wrapRef} className={styles['platform--loginWrap']} >
            <div className={styles['platform--loginWrap-box']} style={{position: 'absolute', top:'20%', left:'50%', marginLeft: '-250px',}}>
                <div className={styles['platform--loginWrap-lang']}>
                    <Selectbox id="select-test" value={selectedOptions} options={options} onChange={chageLang} />
                </div>
                
                <div className={styles['platform--loginWrap-content']}>
                    <div className={styles['platform--loginWrap-logo']}>
                        {/* <img src="" alt="logo" > */}
                        <p >{t('welcome')}</p>
                    </div>
                    <div>                    
                        <DesignInput placeholder={t('login.id')} name="username" className={componentstyles.width100} style={Style} getData={handleCreate} ></DesignInput>
                        <DesignInput type="password" placeholder={t('login.password')} name="password" className={componentstyles.width100} style={Style} getData={handleCreate} ></DesignInput>                    
                        <div className={styles.left}>
                            <DesignCheckbox id="check_remember" name="remember" text={t('login.save')} />
                        </div>
                        {/* <button className={styles['platform--loginWrap-loginbtn']}>{t('login.btn')}</button> */}
                        <Btntype1 className={styles['platform--loginWrap-loginbtn']} buttonStyle={{'width': '100%'}} onClick={goLogin} >{t('login.btn')}</Btntype1>
                        <div className={styles['platform--loginWrap-logininfo']}>
                            <p>{t('login.info')}</p>
                            <p>{t('login.infoEmail')}</p>
                        </div>
                    </div>
                </div>
            </div>            
        // </div>
        ) : ''
	)
}

Login.getInitialProps = async ({res}) => {    
    return {
        isLogin: true,
        namespacesRequired: ['common'],
        nohead: true
    }
}

Login.propTypes = {
    t: PropTypes.func.isRequired
}

export default withTranslation('common')(Login);