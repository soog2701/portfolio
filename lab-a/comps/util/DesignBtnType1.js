import styles from "./../../static/css/component.scss"

const layoutStyle = {
    display: 'inline-block',
}

export const Btntype1 = (props) => {
    return (
        <button className={styles['dabeeo-btntype1']} style={props.buttonStyle} id={props.id} onClick={props.onClick} >
            {props.children}
        </button>
    )
}


export const Btntype2 = (props) => {
    return (
        <button className={styles['dabeeo-btntype2']} style={props.buttonStyle} id={props.id} onClick={props.onClick} >
            {props.children}
        </button>
    )
}