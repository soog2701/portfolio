import React, {Component} from "react";
import useTranslation from "next-translate/useTranslation";
import styles from "../../public/style/components/header.module.scss";
import DaSelect from "../DaSelect";
import DaIcon from "../DaIcon";
import {Menu, menuType} from "../../utils/enums";

const Menulist = () :JSX.Element => {
        const {t} = useTranslation(),
            list:menuType = Menu(t);

        return (
            <ul>
                {list.map((item, index) => <li key={index.toString()}>
                    <span className={styles["top-menu"]}>{item.title}</span>
                    <div className={styles["border-line"]}></div>
                    {
                        item.sub
                            ? <ul className={styles.bubble}>
                                {
                                    item.sub.map((sub, subIndex) => <li className={styles["bubble-li"]} key={index.toString() + "-" + subIndex.toString()}>
                                        <a href="#">{sub}</a>
                                    </li>)
                                }
                            </ul>
                            : null
                    }
                </li>)}
            </ul>
        );
    },
    Breadcrumb = () :JSX.Element => {
        const list = [];
        return (
            <div className={styles.breadcrumb}>
                <div>
                    <ul>
                        <li>
                            <DaIcon type="home" />
                        </li>
                        <li>
                            list
                        </li>
                    </ul>
                </div>
            </div>
        );
    },
    NoticeAlert = ():JSX.Element => <div className={styles["menu-select--alert-box"]}>
        <span className={styles["menu-select--alert-box--title"]}>다비오 알림</span>
        <ul className={styles["menu-select--alert-box--list"]}>
            <li className="new">
                <p>등록하신 문의에 답변이 등록되었습니다.</p>
                <div>
                    <span>1:1문의</span>
                    <span>2018.07.21</span>
                </div>
            </li>
            <li className="new">
                <p>계약이 2019-10-11부로 만료됩니다.</p>
                <div>
                    <span>1:1문의</span>
                    <span>2018.07.21</span>
                </div>
            </li>
            <li>
                <p>권한이 변경되었습니다.</p>
                <div>
                    <span>1:1문의</span>
                    <span>2018.07.21</span>
                </div>
            </li>
            <li>
                <p>사용할 수 있는 권한을 초과하였습니다.</p>
                <div>
                    <span>1:1문의</span>
                    <span>2018.07.21</span>
                </div>
            </li>
            <li>
                <p>등록하신 문의에 답변이 등록되었습니다.</p>
                <div>
                    <span>1:1문의</span>
                    <span>2018.07.21</span>
                </div>
            </li>
        </ul>
    </div>,
    Header: React.FC = () => {
        const menu = [],
            selectOption = {
                width: 112,
                minimumResultsForSearch: -1,
                theme: "menu-select--lang"
            },
            selectData = [
                {id: 1,
                    text: "test1"},
                {id: 2,
                    text: "test2"}
            ];
        return <div id="header" >
            <div className={styles["menu-wrap"]} >
                <div className={styles.menu}>
                    <div id="menu-logo" className={styles["menu-logo"]} ></div>
                    <div id="menu-logo-en" className={styles["menu-logo-en"]} style={{display: "none"}}></div>
                    <Menulist />
                    <div className={styles["menu-info"]}>
                        <ul className="menu-select-wrap">
                            <li className="menu-select--lang-wrap" id="menu_language">
                                <div className="menu-select--lang">
                                    {/* <DaSelect options={selectOption} data={selectData} /> */}
                                </div>
                                {/* :options="languages" v-model="langs" @change="langSelect" :width="112" :minimumResultsForSearch="-1" theme="menu-select--lang" */}
                            </li>
                            <li className={styles["menu-select--alert-wrap"]} style={{display: "none"}}>
                                <NoticeAlert /> {/* 기능 미구현 */}
                            </li>
                            <li>
                                <span className={styles["menu-select--myinfo"] + " gnb-userInfo"}>내정보 조회</span>
                            </li>
                            <li>
                                <span className={styles["menu-select--logout"]}>로그이웃</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Breadcrumb />
        </div>;
    };
export default Header;
