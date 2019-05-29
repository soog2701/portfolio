const express = require('express')
var cors = require('cors');
const app = express()
//bodyParser 임포트
var bodyParser = require('body-parser')

const axios = require('axios');

// CORS 설정
const corsOpt = function(req, callbank) {
  callbank(null, {origin: true});
};
// 모든 도메인의 통신을 허용합니다.

app.options('*', cors(corsOpt));
// 모든 options 메서드로의 사전 전달 접근을 허용합니다.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// 웹브라우저에 get 방식으로 /blockchain 주소를 입력했을 때 실행
app.get('/blockchain', (req, res) => {
  res.send('blockchain Start')
})
// 웹브라우저에 post 방식으로 /transaction 주소를 입력했을 때 실행
app.post('/transaction', (req, res) => {
  // res.send('transaction Start')
  console.log(req.body);
  res.send(`거래 총액은 ${req.body.amount} 코인`);
})
// 웹브라우저에 get 방식으로 /mine 주소를 입력했을 때 실행
app.get('/mine', (req, res) => {
  res.send('mine Start')
})

function getNewsData() {
  return axios
  .get('https://openapi.naver.com/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim',       
    { headers: {
      //'Content-Type': 'plain/text',
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': 'AzWO1JE9eGL8a4Gj7ma_', 
      'X-Naver-Client-Secret': '0aw5RZfSFX',      
      },
    }
  );
  // .then(res => {
  //   console.log(res)
  // }).catch((error) => {
  //   console.log('error ' + error);
  // });
}
app.get('/news', cors(corsOpt), (req, res) => {
  getNewsData().then(thatDerivedDataWeNeed => {
    // console.log(req.is('text/*'));
    // console.log(req.is('json'));
    // console.log(JSON.stringify(thatDerivedDataWeNeed.data))
    // console.log('RB: ' + req);
    // console.log('RB: ' + req.rawBody);
    // console.log('B: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(thatDerivedDataWeNeed.data));
  })
})

app.listen(3080, () => {
  console.log('This port 3080')
})

