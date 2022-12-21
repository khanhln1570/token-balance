const axios = require('axios')

const address = "0x73be32f230e0c0159ac1349b19f070d117dc8c57";
const string2nd = "latest";
const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
const data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "headers": {
      "Content-Type": "application/json"
    },
    "params": [
      `${address}`,
      `${string2nd}`,
    ],
    "id": 1
  });

  const config = {
    method: 'post',
    url: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

axios(config)
  .then(response =>{
    const balance = response['data']['result']
    console.log(response['data']);
    console.log('--Convert "result" to the decimal balance--')
    const convertedBalance = parseInt(balance, 16) / Math.pow(10, 18);
    convertedBalance.toFixed(2);
    console.log(convertedBalance)
  })
  .catch(error => console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrr', error));