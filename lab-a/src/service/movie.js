import axios from 'axios';
let movie = () => {
    // key : 32a31429bf15527c8897aaa8bf5ab992
    let src = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml?key=32a31429bf15527c8897aaa8bf5ab992&targetDt=20190101'
    axios.get(src).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
};


export default movie