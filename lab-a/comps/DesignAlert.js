import styles from "./../static/css/component.scss"
import {Btntype1} from '../comps/util/DesignBtnType1'

import { useStore, useDispatch, useSelector } from "react-redux"  //useSelector, useDispatch, 
import { exceptionHide } from '../redux/module/exception'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

// dim dialog 
  
export default function DesignAlert(props) {
    const dispatch = useDispatch();
    const { isShow, message } = useSelector(state => state.exception, {});
    const close = (e) => {        
        dispatch(exceptionHide());
    };
    return ( 
        isShow ? 
        (<div className={styles['yp-dialog']} >        
            <div className={styles['yp-dialog--alert-icon']}>

            </div>
            <div className={styles['yp-dialog--alert-msg']}>
                {props.message}
            </div>
            <div className={styles['yp-dialog--alert-btn']}>
                <Btntype1 onClick={close} buttonStyle={{width: '100%'}}>{props.btnText}</Btntype1>
            </div>            
        </div>)
        : null        
    )
}