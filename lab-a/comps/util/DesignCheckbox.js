import styles from "./../../static/css/component.scss"

const layoutStyle = {
    display: 'inline-block',
}

export default function DesignCheckbox(props) {
    return (
        <>
            <input type="checkbox" id={props.id} name={props.name}  className={styles['yp-checbox']} />
            <label htmlFor={props.id} className="checkbox"><span></span>{props.text}</label>
        </>
    )
}