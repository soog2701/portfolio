import instance from "../../../utils/http";
import qs from "qs";

export const loginApi = (payload:any) => {
    const {username, password} = payload;
    return instance.post("https://oauth.dabeeo.com/oauth/token", qs.stringify({username,
        password,
        "grant_type": "password"}), {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
            username: "dabeeo_ci",
            password: "dabeeo_pwd"
        }
    }).
        then((response) => {
            console.log("response", response);
            return {
                token: response.data.access_token,
                refresh: response.data.refresh_token,
                res: response
            };
        }).
        then((json) => {
            console.log("json", json);
            return json;
        });
    // .catch((error) => { throw error })
};
