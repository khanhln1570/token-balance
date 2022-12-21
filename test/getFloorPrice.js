const axios = require("axios");

// Wallet address
const contractAddress = [
  "0x02beed1404c69e62b76af6dbdae41bd98bca2eab",
  "0x15ea13b66b3badb355fcfa6317c3b96567825037",
  "0x21453960e45e073f0447fa9f7eeb0aeb2bf5c84e",
  "0x3a987f099e7f1d0ca6403570a9d5a69b819f86ee",
  "0x3c0cb52a81bde105a319cda7473ae8ccd620e238",
  "0x495f947276749ce646f68ac8c248420045cb7b5e",
  "0x4f912cc688142386fc208462976ff7ee8169dffd",
  "0x656d34a8309363302e46de99853f4cef30b85a1d",
  "0x712b9720b37bd206ed938a5fff4ca48cb89643ba",
  "0x8786176b55fa5cd1dffd19a3909ced76efffb6b8",
  "0xa32e24eed8923de0f579c8a024d8db6cf85d2ae5",
  "0xaea4fa9451f527d5f36e65f833d88dbb56a0c264",
  "0xbba21be4e2b63bcfb58b263b02408df4a52ec722",
];

// Alchemy URL
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;

for (let index = 0; index < contractAddress.length; index++) {
  const element = contractAddress[index];
  const url = `${baseURL}/getFloorPrice?contractAddress=${element}`;
  const config = {
    method: "get",
    header: "accept: application/json",
    url: url,
  };
  // Make the request and print the formatted response:
  axios(config)
    .then((response) => {
      const dataOpenSea = response["data"]["openSea"];
      const dataLookRare = response["data"]["openSea"];
      console.log(`Address: ${element}`);
      console.log(`- Floor price in Opensea: ${dataOpenSea.floorPrice} ${dataOpenSea.priceCurrency}`);
      console.log(`- Floor price in Opensea: ${dataLookRare.floorPrice} ${dataLookRare.priceCurrency}`);

    })
    .catch((error) => console.log("error", error));
}
