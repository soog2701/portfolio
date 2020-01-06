import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, useStore } from "react-redux"

import { i18n, withTranslation } from '../i18n'

import { actionTypes, logoutRequest } from '../redux/module/login';
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();

// const token = cookies.get('token');

import io from 'socket.io-client'

import Main from '../comps/main'

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