const axios = require('axios')

// Wallet address
const address = '0x73be32f230e0c0159ac1349b19f070d117dc8c57'

// Alchemy URL
const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;

const data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "erc20",
  ],
  "id": 42
});

const config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

// Make the request and print the formatted response:
axios(config)
  .then(response => {
  
    // Get balances
    const balances = response['data']['result'] 
    // Remove tokens with zero balance
    const nonZeroBalances = 
    balances['tokenBalances'].filter(token => {
       return token['tokenBalance'] !== '0'
    })

    console.log(`Token balances of ${address} \n`)
    
    // Counter for SNo of final output
    let i = 1
    
    // Loop through all tokens with non-zero balance
    for (token of nonZeroBalances) {
    
       // Get balance of token 
       let balance = token['tokenBalance']
       
       const metadataParams = JSON.stringify({
           "jsonrpc": "2.0",
           "method": "alchemy_getTokenMetadata",
           "params": [
               `${token['contractAddress']}`
           ],
           "id": 42
       });
       
       const metadataConfig = {
          method: 'post',
          url: baseURL,
          headers: {
            'Content-Type': 'application/json'
          },
          data : metadataParams
       };  
       
       // Get metadata of token
       axios(metadataConfig)
          .then(metadata => {
             // Compute token balance in human-readable format
             balance = balance/Math.pow(10, metadata['data']['result']['decimals']);
             balance = balance.toFixed(2);
             
             // Print name, balance, and symbol of token
             console.log(`${i++}. ${metadata['data']['result']['name']}: ${balance} ${metadata['data']['result']['symbol']}`)
          })
          .catch(error => console.log('error', error))
    }
  })
  .catch(error => console.log('error', error));