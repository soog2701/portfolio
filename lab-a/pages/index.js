import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"

import { i18n, withTranslation } from '../i18n'

// css
import styles from "../static/css/app.scss";

import { actionTypes, logoutRequest } from '../redux/module/login';
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();

// const token = cookies.get('token');

import io from 'socket.io-client'

function useSocket(url, payload) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketIo = io(url, payload)

        setSocket(socketIo)

        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup

      // should only run once and not on every re-render,
      // so pass an empty array
    }, [])

    return socket
}

const Main = ({ t , click }) => (
    <div className={styles['main']}>
        {/* <a href="#" onClick={click} >logout</a> <a href="#"> {t('change-locale')}</a> */}
        <div className={styles['main-top']}>
            <div className={styles['main-top--left']}>
                <ul>
                    <li>전세계</li>
                    <li>
                        추천콘텐츠
                    </li>
                </ul>
            </div>
            <div className={styles['main-top--left']}>
                현재 <span>{'432,440'}</span>개의 여행일정과 <span>{'480,650'}</span>개의 여행명소 정보가 있습니다.
            </div>
        </div>
        <div className={styles['main-middle']}>
            <div className={styles['main-middle--left']}>
                <div className={styles['main-middle--slide']}></div>
            </div>
            <div className={styles['main-middle--right']}>
                <div className={styles['main-middle--air']}>

                </div>
            </div>
        </div>
        <div className={styles['main-bottom']}>

        </div>
    </div>
)
let isLogin = false;

const Index = (props) => {
    const { t } = props;

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutRequest());       
    }
    const socket = useSocket('218.49.97.52:8080', { forceNew: true })
    // useEffect(() => {
    //     console.log('whwwhwhwh')
    //     function handleEvent(payload) {
    //         console.log(payload) 
    //       // HelloWorld
    //     }
    //     // if (socket) {
    //     //     socket.on('now', handleEvent)
    //     // }
    // }, [socket])

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