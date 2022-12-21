const axios = require("axios");
const getNFTFunction = require("./getNFTs");

const address = "0x73bE32F230E0C0159ac1349B19f070D117Dc8c57";
const contractAddress = [
    '0x02beed1404c69e62b76af6dbdae41bd98bca2eab',
    '0x15ea13b66b3badb355fcfa6317c3b96567825037',
    '0x21453960e45e073f0447fa9f7eeb0aeb2bf5c84e',
    '0x3a987f099e7f1d0ca6403570a9d5a69b819f86ee',
    '0x3c0cb52a81bde105a319cda7473ae8ccd620e238',
    '0x495f947276749ce646f68ac8c248420045cb7b5e',
    '0x4f912cc688142386fc208462976ff7ee8169dffd',
    '0x656d34a8309363302e46de99853f4cef30b85a1d',
    '0x712b9720b37bd206ed938a5fff4ca48cb89643ba',
    '0x8786176b55fa5cd1dffd19a3909ced76efffb6b8',
    '0xa32e24eed8923de0f579c8a024d8db6cf85d2ae5',
    '0xaea4fa9451f527d5f36e65f833d88dbb56a0c264',
    '0xbba21be4e2b63bcfb58b263b02408df4a52ec722'
  ]


const string2nd = "latest";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
const data = JSON.stringify({
  jsonrpc: "2.0",
  method: "alchemy_getAssetTransfers",
  headers: {
    "Content-Type": "application/json",
  },
  params: [
    {
      order: "desc",
      fromAddress: `${address}`,
      toBlock: `${string2nd}`,
      category: ["erc721", "erc1155"],
      withMetadata: true,
      maxCount: "0x3e8",
      contractAddresses: contractAddress,
    },
  ],
  id: 1,
});
const data2 = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    headers: {
      "Content-Type": "application/json",
    },
    params: [
      {
        order: "desc",
        toAddress: `${address}`,
        toBlock: `${string2nd}`,
        category: ["erc721", "erc1155"],
        withMetadata: true,
        maxCount: "0x3e8",
        contractAddresses: contractAddress,
      },
    ],
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
const config2 = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };
  
axios(config)
  .then(async (response) => {
    const result = response["data"]["result"];
    const transfers = result["transfers"];
    console.log("---History of transfers from address: "+address);
    for (let index = 0; index < transfers.length; index++) {
      const element = transfers[index];
      console.log(
        `TokenID: ${parseInt(element.tokenId)} - Address: ${
          element.rawContract.address
        } - Date: ${await formatDate(element.metadata.blockTimestamp)}`
      );
    }
  })
  .catch((error) => console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrr", error));

  axios(config2)
  .then(async (response) => {
    const result = response["data"]["result"];
    const transfers = result["transfers"];
    console.log("---History of transfers to address: "+address);
    for (let index = 0; index < transfers.length; index++) {
      const element = transfers[index];
      console.log(
        `TokenID: ${parseInt(element.tokenId)} - Address: ${
          element.rawContract.address
        } - Date: ${await formatDate(element.metadata.blockTimestamp)}`
      );
    }
  })
  .catch((error) => console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrr", error));


  async function formatDate(timeStamp) {
  var date = new Date(timeStamp);
  var dateFormat =
    date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
  return dateFormat;
}

