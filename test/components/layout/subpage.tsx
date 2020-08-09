import React, {ReactNode} from "react";
import styles from "../../public/style/components/subpage.module.scss";

type props ={
    title: string;
    children?: ReactNode;
    rightshow?: ReactNode;
}

const Subpage = (prop:props):JSX.Element => {
    const {title, children, rightshow} = prop;
    return (
        <div id="container">
            <div className={styles["platform-page--top"]}>
                <h3 className={styles["platform-page--top"] + " " + styles.title} >{title}</h3>
                <div className={styles["platform-page--top"] + " " + styles["title-btn"]}>
                    {rightshow && rightshow}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Subpage;
