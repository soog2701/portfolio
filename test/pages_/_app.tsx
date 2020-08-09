import React from "react";
import App, {Container} from "next/app";

/* import {NextPage} from "next";
import {AppProps} from "next/app";
import {wrapper} from "../store/store"; */

import "../public/style/common.scss";
import "select2/dist/css/select2.min.css";
import "../public/style/select2Custom.css";

import withRedux, {createWrapper} from "next-redux-wrapper";
import {Provider} from "react-redux";
import withReduxSaga from "next-redux-saga";
import {wrapper, initStore} from "../store/store";

/* const MyApp: NextPage<AppProps> = ({Component, pageProps}: AppProps) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp); */
interface IProps {
    Component: React.Component;
    store: any;
  }
class MyApp extends App<IProps> {
    static async getInitialProps ({
        Component,
        ctx
    }: {
        Component: any;
        ctx: any;
      }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ctx});
        }

        return {pageProps};
    }

    render () {
        const {Component, pageProps, store} = this.props;
        console.log("render", this.props);
        return (

            <Component {...pageProps} />
        );

        /* <Provider store={store}>
                <Component {...pageProps} />
            </Provider> */
    }
}
export default withRedux(initStore)(withReduxSaga(MyApp));
