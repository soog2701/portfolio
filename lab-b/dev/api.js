const express = require('express')
const app = express()
//bodyParser 임포트
var bodyParser = require('body-parser')

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

app.listen(3000, () => {
  console.log('This port 3000')
})

