import React from "react";
import styles from "../public/style/components/DaIcon.module.scss";

type Prop = {
    type: string;
    click?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    mouseenter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    mouseleave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DaIcon = (prop:Prop):JSX.Element => {
    const classnames = [
        styles.assets,
        styles["assets-" + prop.type]
    ].join(" ");

    return (
        <span
            className={classnames}
            onClick={prop.click}
            onMouseEnter={prop.mouseenter}
            onMouseLeave={prop.mouseleave}
        >
        </span>
    );
};

export default DaIcon;
