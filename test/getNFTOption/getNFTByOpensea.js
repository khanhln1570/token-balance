const axios = require("axios");

const urlOpensea =
  "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/4963159002877210207784436653488573407743397086048383953834598343284453539940";
const splitUrl = urlOpensea.split("/");

// console.log(splitUrl);

// Contract address
const address = splitUrl[5];
const tokenId = splitUrl[6];

// Alchemy URL
let baseURL = "";
if (splitUrl[4] === "ethereum") {
  baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
} else if (splitUrl[4] === "matic") {
  baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
}

const url = `${baseURL}/getNFTMetadata/?contractAddress=${address}&tokenId=${tokenId}`;

const config = {
  method: "get",
  url: url,
};

// Make the request and print the formatted response:
axios(config)
  .then((response) => {
    const data = response["data"];
    console.log(data);
  })
  .catch((error) => console.log("error", error));
