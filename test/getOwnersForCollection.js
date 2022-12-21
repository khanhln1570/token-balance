const axios = require("axios");

// Wallet contractAddress
const contractAddress = "0x15ea13b66b3badb355fcfa6317c3b96567825037";

// Alchemy URL
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const url = `${baseURL}/getOwnersForCollection?contractAddress=${contractAddress}`;
const config = {
  method: "get",
  url: url,
};
let dataResult = [];
// Make the request and print the formatted response:
axios(config)
  .then(async (response) => {
    const data = response["data"]["ownerAddresses"];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let balance = await eth_getBalance(element);
      dataResult.push(balance);
      console.log(`Address: ${element} - Balance: ${balance}`);
    }
  })
  .catch((error) => console.log("error", error));

async function eth_getBalance(address) {
  const string2nd = "latest";
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_getBalance",
    headers: {
      "Content-Type": "application/json",
    },
    params: [`${address}`, `${string2nd}`],
    id: 1,
  });

  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let convertedBalance;
  await axios(config)
    .then((response) => {
      const balance = response["data"]["result"];

      convertedBalance = parseInt(balance, 16) / Math.pow(10, 18);
      //   console.log(convertedBalance);
    })
    .catch((error) => console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrr", error));
  return convertedBalance;
}
