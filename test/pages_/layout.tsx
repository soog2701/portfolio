import React, {useEffect, useCallback, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next-translate/Link";
import {NextPage} from "next";
import {useDispatch, useSelector, shallowEqual} from "react-redux";

import DaButton from "../components/DaButton";
import Default from "../components/layout/default";
import Subpage from "../components/layout/subpage";
import {RootState} from "../store/root-reducer";
import {createSelector} from "reselect";

import {EXCEPTION} from "../store/types";

/* import {alert} from "../store/module/exception/index"; */

const RightBtn: NextPage = () :JSX.Element => <DaButton text="test" type="black"></DaButton>,
    Main = (): JSX.Element => {
        const {t} = useTranslation(),
            [
                count,
                setCount
            ] = useState(0),
            dispatch = useDispatch(),
            showAlerts = useCallback(() => {
                dispatch({type: EXCEPTION.REQUEST,
                    payload: {class: ""}});
            }, []),
            testClick = () => {
                setCount(count + 1);
            },
            {ui} = useSelector((state: RootState) => state.alerts, shallowEqual);
        useEffect(() => {
            console.log("child!!!!!", ui);
        }, [ui]);
        return (
            <Default>
                <Subpage title="layout" rightshow={<RightBtn />}>
                    {t("common:login")}
                    <p style={{"fontSize": "20px"}}>{count}</p>
                    <p style={{"fontSize": "20px"}}>{ui.length}</p>
                    <Link href="/" lang="ko"><a><DaButton text="ko" type="black"></DaButton></a></Link>

                    <Link href="/" lang="en"><a><DaButton text="en" type="white"></DaButton></a></Link>
                    <DaButton text="alertLength" type="white type2" onClick={showAlerts}></DaButton>
                    <DaButton text="counter" type="white small" onClick={testClick}></DaButton>
                </Subpage>
            </Default>
        );
    };
export default Main;


