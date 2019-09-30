const layoutStyle = {
    display: 'inline-block',
}

export default function DesignCheckbox(props) {
    return (
        <>
            <input type="checkbox" id={props.id} name={props.name}  className="checkbox check-map-list checkbox-label" />
            <label htmlFor={props.id} className="checkbox"><span></span>{props.text}</label>
        </>
    )
}