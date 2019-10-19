import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../redux/store'

import { appWithTranslation } from '../i18n'
import Router, { useRouter, withRouter } from 'next/router'

import { set } from '../util/http'

import Layout from '../comps/layout'

import redirect from '../util/redirect'

import cookies from 'next-cookies'

import { Cookies, CookiesProvider } from 'react-cookie';
// const cookies = new Cookies();

// const token = new Cookies();

// const { token } = cookies('token');

class AppWrap extends App {
    static async getInitialProps ({ Component, ctx }) {
      let pageProps = {}
      
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
        
      }  
      // console.log(pageProps)
      // console.warn("받은 props.", pageProps) 
      const { token } = cookies(ctx);
      
      // if(ctx.pathname === '/login') {
      //   if (token !== 'false') {
      //     redirect(ctx, '/');
      //   }
      // } else {
      //   if (token === 'false') {
      //     redirect(ctx, '/login');
      //   }
      // }
      
      return { pageProps }
    }  

    constructor(props) {
      super(props)
      // set interceptor
      set.setupInterceptors(this.props.store);      
    }  
    
    render () { 
      // console.log(token);
      const { Component, pageProps, store } = this.props;
      return (
        <CookiesProvider>
          <Provider store={store}>
            <Container>
              <Layout nohead={pageProps.nohead} >
                <Component {...pageProps} />
              </Layout> 
            </Container>
          </Provider>
        </CookiesProvider>
      )
    }
}

export default withRedux(createStore)(withReduxSaga(appWithTranslation(withRouter(AppWrap))))