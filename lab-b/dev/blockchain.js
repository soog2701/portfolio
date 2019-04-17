const sha256 = require('sha256'); //sha256 모듈
class Blockchain{
  constructor(){
    this.chain = [];
    this.pendingTransaction = [];
    //제네시스 블락 - 임의의 인자값 넣어준다.
    this.createNewBlock(100,'0','0')
  }  
  // create block 
  createNewBlock (nonce,previousBlockHash,hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransaction,
      nonce:nonce,
      hash:hash,
      previousBlockHash:previousBlockHash
    };
    //다음 거래를 위한 거래내역 배열 비워주고 새로운 블록을 chin 배열에 추가
    this.pendingTransaction = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  //마지막 블록 얻기 - chain 배열에는 블록데이터가 들어간다. 맨마지막 블록을 가져와라.
  getLastBlock () {
    return this.chain[this.chain.length - 1];
  }

  //새로운 트랜젝션(거래)가 발생했을 때 작동되는 함수
  //인자값으로, 총액수, 보내는사람, 받는사람이 들어간다.
  createNewTransaction (amount,sender,recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient
      }
      
      //맨위 트랜잭션 배열에 값을 넣어준다.
      this.pendingTransaction.push(newTransaction);
      
      //마지막 블록의 index 에서 + 1
      return this.getLastBlock()['index'] + 1
  }

  //해쉬 값 리턴 함수
  hashBlock (previousBlockHash,currentBlockData,nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash
  }

  //pow 작업 함수 - 이전블록의 해쉬, 현재 블록 데이터와 nonce 값을 사용한다.
  // 해쉬 : 컴퓨터에서 블럭의 길이를 맞추기 위해서 메모리에 작성된 의미없는 데이터
  // 블록 : 해쉬를 가지고 있는 사람이 코인을 획득할 수 있는 블록을 의미
  // 난이도: 블럭이 생성되는 시간을 일정하게 조정하기 위해 사용되는 개념
  // (전체 해쉬의 양 증가 -> 난이도 증가-> 블럭찾는데 더 많은 해쉬 필요 _> 블럭 생성시간 유지됨)
  // pow: 컴퓨터간에 정보를 교환할때 통신방법에 대한 규칙이다. 많은 해쉬를 가진 사람이 코인을 획득할 수 있는 블럭을 더 많이 발견할 수 있는 시스템이다.
  proofOfWork (previousBlockHash,currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce); 
    while(hash.substring(0,4) != '0000'){
      nonce++;
      hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
    }
    return nonce;
  }
}

module.exports = Blockchain;
// 출처: https://abc1211.tistory.com/522?category=1003529 [길위의 개발자]