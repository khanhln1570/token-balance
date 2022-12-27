const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getNFTs", async function (req, res) {
  // Wallet address
  const address = req.query.walletAddress;
  if (address !== undefined) {
    let images = [];

    const excludeFilters = ["SPAM"];
    // Alchemy URL
    const baseURLEthereum = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
    const baseURLPolygon = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
    const baseURLArbitrum = `https://arb-mainnet.g.alchemy.com/v2/3YPCXZqc3Y3DAsEGV6ERHaKPToOBugYk`;
    const baseURLOptimism = `https://opt-mainnet.g.alchemy.com/v2/S47UuB5EDzwZpF8x_E9HmMIjrX3nFFaP`;
    const urlEthereum = `${baseURLEthereum}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;
    const urlPolygon = `${baseURLPolygon}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;
    const urlArbitrum = `${baseURLArbitrum}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;
    const urlOptimism = `${baseURLOptimism}/getNFTs/?owner=${address}&excludeFilters=${excludeFilters}`;

    const sources = [
      {
        method: "get",
        url: urlEthereum,
      },
      {
        method: "get",
        url: urlPolygon,
      },
      {
        method: "get",
        url: urlArbitrum,
      },
      {
        method: "get",
        url: urlOptimism,
      },
    ];
    const tasks = sources.map(axios);

    const responses = await Promise.allSettled(tasks);

    let results = responses.map((response) => {
      const data = response.value.data;
      return data;
    });

    const resultsFilterNull = results.filter(
      (nfts) => nfts.ownedNfts.length > 0
    );

    // console.log(resultsFilterNull);
    const ownedNfts = resultsFilterNull.map((ownedNfts) => {
      return ownedNfts.ownedNfts.map((contract) => contract.media[0].gateway);
    });
    for (let index = 0; index < ownedNfts.length; index++) {
      const ownedNft = ownedNfts[index];
      for (let index = 0; index < ownedNft.length; index++) {
        const element = ownedNft[index];
        images.push(element);
      }
    }
    // console.log(images);
    if (images.length !== 0) {
      res.render("pages/getNFTs", {
        images: images,
        message: null
      });
    }else {
      res.render("pages/getNFTs", {
        images: null,
        message: "NOT FOUND"
      });
    }
  } else {
    res.render("pages/getNFTs", {
      images: null,
      message: null
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
    switch (chain) {
      case "eth":
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
        break;
      case "matic":
        baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
        break;
      case "arbitrum":
        baseURL = `https://arb-mainnet.g.alchemy.com/v2/3YPCXZqc3Y3DAsEGV6ERHaKPToOBugYk`;
        break;
      case "optimism":
        baseURL = `https://opt-mainnet.g.alchemy.com/v2/S47UuB5EDzwZpF8x_E9HmMIjrX3nFFaP`;
        break;
      default:
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
        break;
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
        if (!data) {
          res.render("pages/getSpecificNFT", {
            image: null,
            message: null
          });
        }
        res.render("pages/getSpecificNFT", {
          image: data,
          message: null
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getSpecificNFT", {
      image: null,
      message: null
    });
  }
});

router.get("/getNFTOpensea", async function (req, res) {
  // const url = "https://opensea.io/assets/ethereum/0x231d3559aa848bf10366fb9868590f01d34bf240/2178";

  const urlOpensea = req.query.url;

  if (urlOpensea !== undefined) {
    const splitUrl = urlOpensea.split("/");
    // Contract address
    const address = splitUrl[splitUrl.length - 2];
    const tokenId = splitUrl[splitUrl.length - 1];
    // Alchemy URL
    let baseURL = "";

    switch (splitUrl[splitUrl.length - 3]) {
      case "eth":
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
        break;
      case "matic":
        baseURL = `https://polygon-mainnet.g.alchemy.com/v2/uADTmcfw38hlAUu7m0vjyREqKFEOzjD_`;
        break;
      case "arbitrum":
        baseURL = `https://arb-mainnet.g.alchemy.com/v2/3YPCXZqc3Y3DAsEGV6ERHaKPToOBugYk`;
        break;
      case "optimism":
        baseURL = `https://opt-mainnet.g.alchemy.com/v2/S47UuB5EDzwZpF8x_E9HmMIjrX3nFFaP`;
        break;
      default:
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA`;
        break;
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
        if (!data) {
          res.render("pages/getNFTOpensea", {
            image: null,
            message: "NOT FOUND"
          });
        }
        res.render("pages/getNFTOpensea", {
          image: data,
          message: null
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getNFTOpensea", {
      image: null,
      message: null
    });
  }
});

router.get("/getCollections", async function (req, res) {
  const name = req.query.nameCollection;
  const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";

  if (name) {
    let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=${name}`;
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${APIKEY}`,
      },
    };

    // Make the request and print the formatted response:
    await axios(config)
      .then((response) => {
        const data = response["data"]["data"];
        const collections = data.map((collection) => {
          collection.logo = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${collection.logo}?apiKey=${APIKEY}`;
          return collection;
        });
        if (!collections) {
          res.render("pages/getCollections", {
            collections: null,
            message: null
          });
        }
        res.render("pages/getCollections", {
          collections: collections,
          message: null
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getCollections", {
      collections: null,
      message: null
    });
  }
});

router.get("/detailCollection/:collectionId", async function (req, res) {
  const collectionId = req.params.collectionId;
  const tokenId = req.query.tokenId;
  const contractAddress = req.query.contractAddress;
  const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";

  if (collectionId) {
    let url;
    if (tokenId) {
      url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=${contractAddress}&token_id=${tokenId}`;
    } else {
      url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?collection_id=${collectionId}`;

    }
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${APIKEY}`,
      },
    };

    // Make the request and print the formatted response:
    await axios(config)
      .then((response) => {
        const data = response["data"]["data"];
        // console.log(data);
        const collections = data.map((collection) => {
          // collection.token_id = parseInt(collection.token_id);
          collection.image_url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${collection.image_url}?apiKey=${APIKEY}`;
          return collection;
        });
        if (!collections) {
          res.render("pages/detailCollection", {
            collections: null,
            contractAddress: contractAddress,
            collectionId: collectionId,
            message: "NOT FOUND"
          });
        }
        // console.log(collections);
        res.render("pages/detailCollection", {
          collections: collections,
          contractAddress: contractAddress,
          collectionId: collectionId,
          message: null
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/detailCollection", {
      collections: null,
      message: null
    });
  }
});

module.exports = router;
