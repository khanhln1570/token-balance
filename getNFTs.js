const axios = require("axios");

// Wallet address
const address = "0x73be32f230e0c0159ac1349b19f070d117dc8c57";
const excludeFilters = ["SPAM", "AIRDROPS"];
// Alchemy URL
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const url = `${baseURL}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;

const config = {
  method: "get",
  url: url,
};

// Make the request and print the formatted response:
axios(config)
  .then((response) => {
    let contractAddressList = []
    const data = response["data"]["ownedNfts"];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // console.log((index+1) + ". " + element.title + ": " + element.metadata.image);
      // console.log(`${index + 1}. Address: ${element.contract.address}`);
      if (!contractAddressList.includes(element.contract.address)) {
        contractAddressList.push(element.contract.address);
      }
      continue;
    }
    // console.log(contractAddressList);
  })
  .catch((error) => console.log("error", error));


exports.getNFTss = async (owner) => {
  const excludeFilters = ["SPAM", "AIRDROPS"];
// Alchemy URL
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const url = `${baseURL}/getNFTs/?owner=${owner}&excludeFilters=${excludeFilters}`;

const config = {
  method: "get",
  url: url,
};

// Make the request and print the formatted response:
await axios(config)
  .then((response) => {
    let contractAddressList = []
    const data = response["data"]["ownedNfts"];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // console.log((index+1) + ". " + element.title + ": " + element.metadata.image);
      // console.log(`${index + 1}. Address: ${element.contract.address}`);
      if (!contractAddressList.includes(element.contract.address)) {
        contractAddressList.push(element.contract.address);
      }
      continue;
    }
    console.log(contractAddressList)
    return contractAddressList;
  })
  .catch((error) => console.log("error", error));
}

