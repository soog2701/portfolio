import React from "react";
import useTranslation from "next-translate/useTranslation";
import DaButton from "../components/DaButton";

const Login = (): JSX.Element => {
    const {t} = useTranslation();
    return <div>
        <DaButton text={t("common:login")} type="white small"></DaButton>
    </div>;
};
export default Login;
