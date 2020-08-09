import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next-translate/Link";
import DaButton from "../components/DaButton";

import Default from "../components/layout/default";

const Main = (): JSX.Element => {
    const {t} = useTranslation();
    return (
        <Default>
            <div id="main">
                {t("common:login")}
                <Link href="/" lang="ko"><a><DaButton text="ko" type="black"></DaButton></a></Link>

                <Link href="/" lang="en"><a><DaButton text="en" type="white"></DaButton></a></Link>
            </div>
        </Default>
    );
};

export default Main;


