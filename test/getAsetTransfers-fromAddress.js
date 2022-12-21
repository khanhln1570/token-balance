const axios = require("axios");

const address = "0x73bE32F230E0C0159ac1349B19f070D117Dc8c57";
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
      category: ["erc721"],
      withMetadata: true
    }
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

axios(config)
  .then(async (response) => {
    const result = response["data"]["result"];
    const transfers = result["transfers"];
    console.log(transfers.length);
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
