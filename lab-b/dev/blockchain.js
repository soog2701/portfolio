class Blockchain{
  constructor(){
    this.chain = [];
    this.newTransactions = [];
  }
  // create block 
  createNewBlock (nonce,previousBlockHash,hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.newTransactions,
      nonce:nonce,
      hash:hash,
      previousBlockHash:previousBlockHash
    };
    //다음 거래를 위한 거래내역 배열 비워주고 새로운 블록을 chin 배열에 추가
    this.newTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }
}

