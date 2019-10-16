import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../redux/store'

import { appWithTranslation } from '../i18n'
import Router, { useRouter, withRouter } from 'next/router'

import Document, { Head, Main, NextScript } from 'next/document'
//
import redirect from '../util/redirect'

import { Cookies, CookiesProvider } from 'react-cookie';
const cookies = new Cookies();

const token = cookies.set('token', false);

class AppWrap extends App {
    static async getInitialProps ({ Component, ctx }) {
      let pageProps = {}
  
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
        
      }  
      // console.log(pageProps)
      // console.warn("받은 props.", pageProps) 
      
      if(!pageProps.isLogin) redirect(ctx, '/login');
      
      return { pageProps }
    }
    render () { 
      const { Component, pageProps, store } = this.props;
      return (
        <CookiesProvider>
          <Provider store={store}>
            <Component {...pageProps} />      
          </Provider>
        </CookiesProvider>
      )
    }
}

export default withRedux(createStore)(withReduxSaga(appWithTranslation(withRouter(AppWrap))))