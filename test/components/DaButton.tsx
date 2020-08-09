import * as React from "react";
import styles from "../public/style/components/DaButton.module.scss";

type Props = {
  text: string;
  type: string;
  width?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
type uiArray = Array<string>;

const DaButton = (prop: Props): JSX.Element => {
    const {text, type, width} = prop,
        setTypetoClass = ():uiArray => {
            const result:uiArray = [],
                newArr = type.split(" ");

            newArr.forEach((clname, n) => {
                if (n === 0) {
                    result.push(styles["daButton-" + clname]);
                } else {
                    result.push(styles[clname]);
                }
            });
            return result;
        },
        btnClass = [
            styles.daButton,
            ...setTypetoClass()
        ].join(" "),
        btnstyle = {
            width: width + "px"
        };
    return <button className={btnClass} onClick={prop.onClick} style={btnstyle} >
        {text}
    </button>;
};
export default DaButton;
