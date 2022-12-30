const axios = require("axios");

// Wallet address
const address = "0xbba21be4e2b63bcfb58b263b02408df4a52ec722";
const tokenId = 703;
// Alchemy URL
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const url = `${baseURL}/getNFTMetadata/?contractAddress=${address}&tokenId=${tokenId}`;

const config = {
  method: "get",
  url: url,
};

// Make the request and print the formatted response:
axios(config)
  .then((response) => {
    const data = response["data"];
   console.log(data)
  })
  .catch((error) => console.log("error", error));
