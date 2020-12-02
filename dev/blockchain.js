function Blockchain(){
    this.chain = []
    this.pendingTransactions = []

    this.createNewBlock(100, '0', '0')
}


Blockchain.prototype.createNewBlock = (nonce, previousBlockHash, hash) => {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    }

    this.pendingTransactions = []
    this.chain.push(newBlock)
    return newBlock
}

Blockchain.prototype.getLastBlock = () => {
    return this.chain[this.chain.length - 1]
}

Blockchain.prototype.createNewTransaction = (amount, sender, recipient) => {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    }

    this.pendingTransactions.push(newTransaction)

    return this.getLastBlock()['index'] + 1
}

Blockchain.prototype.hashBlock = (previousBlockHash, currentBlockData, nonce) => {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString)
    return hash
}

Blockchain.prototype.proofOfWork = (previousBlockHash, currentBlockData) => {
    // => repeatedly hash block until it finds correct hash
    // => uses current block data for the hash, but also the previousBlockHash
    // => continuously changes nonce value until it finds the correct hash
    // => returns to us the nonce value that creates the correct hash
    let nonce = 0
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)

    while(hash.substring(0, 4) !== '0000') {
        nonce ++
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
    }
    return nonce
}

module.exports = Blockchain