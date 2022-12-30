const axios = require("axios");

// Wallet address
const address = "0x73be32f230e0c0159ac1349b19f070d117dc8c57";
const excludeFilters = ["SPAM"];
// Alchemy URL
const baseURLEthereum = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const baseURLPolygon = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
const urlEthereum = `${baseURLEthereum}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;
const urlPolygon = `${baseURLPolygon}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;

const configEthereum = {
  method: "get",
  url: urlEthereum,
};

const configPolygon = {
  method: "get",
  url: urlPolygon,
};

// Make the request and print the formatted response:
axios(configEthereum)
  .then((response) => {
    const data = response["data"]["ownedNfts"];

    console.log(data.map(contract  => contract.media.map(media => media.gateway)));
  })
  .catch((error) => console.log("error", error));

axios(configPolygon)
  .then((response) => {
    const data = response["data"]["ownedNfts"];
    console.log(data.map(contract  => contract.media.map(media => media.gateway)));
  })
  .catch((error) => console.log("error", error));
