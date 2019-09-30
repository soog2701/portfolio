import React, { useCallback, useState } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Selectbox from './../comps/selectbox'
import DesignInput from './../comps/DesignInput'
import DesignCheckbox from './../comps/DesignCheckbox'

import { i18n, withTranslation } from '../i18n'
// css
import "../static/css/app.scss"

const Login = (props) => {
    const { t } = props;
    const options = [
        { value: 'ko', label: t('korean') },
        { value: 'en', label: t('english') },
        { value: 'ja', label: t('japenese') }
    ]
	return (
		<div className="platform--login-wrap menu-select-wrap">
            <div className="menu-select--lang-wrap">                
                <Selectbox options={options} />
            </div>
            
            <div className="platform--login-wrap--content">
                <div className="platform--login-logo">
                    {/* <img src="" alt="logo" > */}
                    <p >{t('welcome')}</p>
                </div>
                <div>                    
                    <DesignInput placeholder={t('login.id')} name="username" ></DesignInput>
                    <DesignInput type="password" placeholder={t('login.pasword')} name="password" ></DesignInput>                    
                    <div className="left">
                        <DesignCheckbox id="check_remember" name="remember" text={t('login.save')} />
                    </div>
                    <button className="button btn-main platform--login-btn">{t('login.btn')}</button>
                    <div className="platform--login-info">
                        <p>{t('login.info')}</p>
                        <p>{t('login.infoEmail')}</p>
                    </div>
                </div>
            </div>
        </div>
	)
}

Login.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Login.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Login);