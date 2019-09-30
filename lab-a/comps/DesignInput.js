const layoutStyle = {
    display: 'inline-block',
}

export default function DesignInput(props) {
    return (        
        <div className="validation-input-wrap" style={layoutStyle}>
            <input type={props.type||'text'} placeholder={props.placeholder} value={props.value} name={props.name} />
            {props.children}
        </div>
    )
}