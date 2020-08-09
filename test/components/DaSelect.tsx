import React, {useEffect, useRef, useState} from "react";
import select2 from "select2";
import $ from "jquery";

type Props = {
    data?: valueArray;
    options?: options;
    value?: idSet;
    parentStyle?: React.CSSProperties;
    disabled? :boolean;
}
type idSet = {
    id: string | number | readonly string[] | undefined;
}
type valueArray = Array<valueSet>
type HtmlEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
interface valueSet {
    id?: idSet;
    text?: string;
}
interface options {
    width?: number;
    minimumResultsForSearch?: number;
    theme?: string | null | "default";
    placeholder?: string;
}

const DaSelect: React.FC<Props> = ({
    options, value, data, parentStyle, disabled
}:Props) => {
    const elRef = useRef(null),
        [
            val,
            setVal
        ] = useState(""),
        handleChange: React.EventHandler<HtmlEvent> = (e:HtmlEvent) => {
            console.log(value);
            const eleVal = e.target.value;
            setVal(eleVal);
        };
    useEffect(() => {
        const elem = elRef.current;
        $(elem).
            select2({...options,
                data}).
            on("change", handleChange);
    }, [
        elRef,
        select2
    ]);

    return <div className="da-select" style={parentStyle}>
        <select
            value={val}
            ref={elRef}
            onChange={handleChange}
            disabled={disabled}
        />
    </div>;
};

export default DaSelect;
