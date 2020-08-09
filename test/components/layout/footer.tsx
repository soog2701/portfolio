import React from "react";
import styles from "../../public/style/components/footer.module.scss";

const Footer = (): JSX.Element => <footer className={styles["platform--footer"]}>
    <div className={styles["platform--footer--wrap"]}>
        <div className={styles["platform--footer--util"]}>
            <ul>
                <li><a href="/service/terms?id=36">서비스 이용약관</a></li>
                <li><a href="/service/terms?id=38">개인정보 처리방침</a></li>
            </ul>
        </div>
        <div className={styles["platform--footer--copyright"]}>
            <img className={styles["platform--footer--logo"]} src="/images/common/footer_logo-3x.png" alt="footer Logo" />
            <p>Copyright ⓒ 2019 <span style={{color: "#f05329"}}>Dabeeo</span> Inc. All Rights Reserved.</p>
        </div>
    </div>
</footer>;

export default Footer;
