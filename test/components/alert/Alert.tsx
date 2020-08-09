import React, {useEffect} from "react";
import {dataObj} from "../../store/module/exception";
import DaButton from "../DaButton";

type Props = {
    data?: dataObj;
    ui?: number;
}
const Alert = (prop: Props):JSX.Element => {
    const {ui} = prop,
        close = (e: React.MouseEvent<HTMLButtonElement>) => {
            console.log(e);
        };
    useEffect(() => {
        console.log(ui);
    }, [ui]);
    return <div className="platform-alert" >
        <div className="pl-alert">
            <div className="asset-notice"></div>
            <div className="pl-alert-msg">
                {ui}
                {/* <div >{(data as dataObj).message}</div> */}
            </div>
            <DaButton text="확인" type="black" width={170} onClick={close}></DaButton>
        </div>
    </div>;
};

export default Alert;
