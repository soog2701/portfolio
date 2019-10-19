import instance from '../util/http'
import qs from 'qs'
// import axios from 'axios'

export const loginApi = (payload) => {      
    const {username, password } = payload;
    return instance.post('https://oauth.dabeeo.com/oauth/token', qs.stringify({ username, password, 'grant_type': 'password' } ), {        
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: 'dabeeo_ci',
            password: 'dabeeo_pwd'
        }
    })
    .then(response => {
        console.log('response',response);
        return { 
            token : response.data['access_token'],
            refresh : response.data['refresh_token'],
            res: response
        }
    })
    .then(json => {      
        console.log('json',json);
        return json
    })
    // .catch((error) => { throw error })
}