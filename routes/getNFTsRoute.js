const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getNFTs", async function (req, res) {
  // Wallet address
  const address = req.query.walletAddress;
  if (address !== undefined) {
    let imagesPolygon = [];
    let imagesEth = [];
    const images = {};

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
    await axios(configEthereum)
      .then((response) => {
        const data = response["data"]["ownedNfts"];

        imagesEth = data.map((contract) => contract.media[0].gateway);
        images.imagesEth = imagesEth;
        // console.log(imagesEth);
      })
      .catch((error) => console.log("error", error));

    await axios(configPolygon)
      .then((response) => {
        const data = response["data"]["ownedNfts"];
        imagesPolygon = data.map((contract) => contract.media[0].gateway);
        images.imagesPolygon = imagesPolygon;
      })
      .catch((error) => console.log("error", error));

    if (images.length !== 0) {
      res.render("pages/getNFTs", {
        images: images,
      });
    }
  } else {
    res.render("pages/getNFTs", {
      images: null,
    });
  }
});

router.get("/getSpecific", async function (req, res) {
  // Wallet address
  // const address = "0xbba21be4e2b63bcfb58b263b02408df4a52ec722";
  // const tokenId = 703;
  // const chain = 'eth'

  const address = req.query.contractAddress;
  const tokenId = req.query.tokenId;
  const chain = req.query.chain;
  if (address !== undefined) {
    // Alchemy URL
    let baseURL = "";
    if (chain === "eth") {
      baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
    } else {
      baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
    }
    const url = `${baseURL}/getNFTMetadata?contractAddress=${address}&tokenId=${tokenId}`;

    const config = {
      method: "get",
      url: url,
    };

    // Make the request and print the formatted response:
    await axios(config)
      .then((response) => {
        const data = response["data"];
        // res.status(200).json({ok: true, data: data})
        res.render("pages/getSpecificNFT", {
          image: data,
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getSpecificNFT", {
      image: null,
    });
  }
});

router.get("/getNFTOpensea", async function (req, res) {
  // const url = "https://opensea.io/assets/ethereum/0x231d3559aa848bf10366fb9868590f01d34bf240/2178";

  const urlOpensea = req.query.url;

  if (urlOpensea !== undefined) {
    const splitUrl = urlOpensea.split("/");
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
    const url = `${baseURL}/getNFTMetadata?contractAddress=${address}&tokenId=${tokenId}`;

    const config = {
      method: "get",
      url: url,
    };

    // Make the request and print the formatted response:
    await axios(config)
      .then((response) => {
        const data = response["data"];
        // res.status(200).json({ok: true, data: data})
        res.render("pages/getNFTOpensea", {
          image: data,
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getNFTOpensea", {
      image: null,
    });
  }
});

module.exports = router;
