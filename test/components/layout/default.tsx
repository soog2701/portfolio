import React, {ReactNode, useEffect, useState} from "react";
import Head from "next/head";

import Header from "./header";
import Footer from "./footer";

import Alert from "../alert/Alert";
import {useStore, shallowEqual, useSelector, connect} from "react-redux";
import {RootState} from "../../store/root-reducer";
import {createSelector} from "reselect";


type Props = {
    children?: ReactNode
    title?: string
}
const Default: React.FC<Props> = ({children}: Props) => {
    let test = 0,
        [
            len,
            setLen
        ] = useState(0),
        {ui} = useSelector((state: RootState) => {
            // console.log(state.alerts);
            test = state.alerts.ui.length;
            // setLen(state.alerts.ui.length);
            return state.alerts;
        });
    // setLen(ui.length);
    useEffect(() => {
        // setLen(ui.length);
        // 렌더링이 얼마나 되는지 확인용
        console.log("rendering!!!!", test);
    }, [
        ui,
        len,
        test
    ]);
    return <>
        <div id="wrap">
            {/* <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head> */}
            <Header />
            <span>{ui.length}</span>
            <span>{test}</span>
            {children}
            <Footer />
        </div>

        <Alert ui={ui.length} />
        {/* {ui.length > 0 && <Alert />} */}
    </>;
};
export default Default;
