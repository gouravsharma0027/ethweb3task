const Web3 = require("web3")
const Tx = require('ethereumjs-tx').Transaction

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ed190debac424c88813e46926834f16d"))

web3.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c", function(err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(web3.utils.fromWei(result, "ether") + " ETH")
  }

  const acc1='0xe4462a62687EC8F75f4F60BcCe3e808BF78EC99F';
const acc2='0x19f95a84aa1c48a2c6a7b2d5de164331c86d030c';

  const pkey1=Buffer.from('06a5d20adaba23e9ffb8a6b1749c3bd86ff35806fa9323cd25a7a628d05068f3','hex');
 

  web3.eth.getTransactionCount(acc1, (err, txCount) => {

    const txObject = {
         nonce: web3.utils.toHex(txCount),
         to: acc2,
         value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
         gasLimit: web3.utils.toHex(21000),
         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx(txObject, { chain: 'ropsten' })
tx.sign(pkey1)
const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  if(err){
    console.log(err)
  }else{
    console.log('txHash: ', txHash)
  }
 })
})    
})

 