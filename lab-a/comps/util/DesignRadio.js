import styles from "./../../static/css/component.scss"

export default function DesignInput(props) {
    return (
        <label className={styles['yp-radioWrap']}>
            <input type="radio" name={props.radio} checked={props.checked || false} /><span></span>
            {props.text}
        </label>
    )
}