const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// find by wallet
router.get("/getNFTs", async function (req, res) {
  // Wallet address
  const address = req.query.walletAddress;
  if (address) {
    let images = [];
    const APIKEY_ETHEREUM_ALCHEMY = process.env.APIKEY_ETHEREUM_ALCHEMY;
    const APIKEY_POLYGON_ALCHEMY = process.env.APIKEY_POLYGON_ALCHEMY;
    const APIKEY_ARBITRUM_ALCHEMY = process.env.APIKEY_ARBITRUM_ALCHEMY;
    const APIKEY_OPTIMISM_ALCHEMY = process.env.APIKEY_OPTIMISM_ALCHEMY;

    const excludeFilters = ["SPAM"];
    // Alchemy URL
    const baseURLEthereum = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY_ETHEREUM_ALCHEMY}`;
    const baseURLPolygon = `https://polygon-mainnet.g.alchemy.com/v2/${APIKEY_POLYGON_ALCHEMY}`;
    const baseURLArbitrum = `https://arb-mainnet.g.alchemy.com/v2/${APIKEY_ARBITRUM_ALCHEMY}`;
    const baseURLOptimism = `https://opt-mainnet.g.alchemy.com/v2/${APIKEY_OPTIMISM_ALCHEMY}`;
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
      if (!response.value) {
        return res.render("pages/getNFTs", {
          images: null,
          message: "NOT FOUND",
          address: address,
        });
      }
      const data = response.value.data;
      return data;
    });

    const resultsFilterNull = results.filter(
      (nfts) => nfts.ownedNfts.length > 0
    );

    // console.log(resultsFilterNull);
    const ownedNfts = resultsFilterNull.map((ownedNfts) => ownedNfts.ownedNfts);
    for (let index = 0; index < ownedNfts.length; index++) {
      const ownedNft = ownedNfts[index];
      for (let index = 0; index < ownedNft.length; index++) {
        const element = ownedNft[index];
        images.push(element);
      }
    }
    if (images.length !== 0) {
      res.render("pages/getNFTs", {
        images: images,
        message: null,
        address: address,
      });
    } else {
      res.render("pages/getNFTs", {
        images: null,
        message: "NOT FOUND",
        address: address,
      });
    }
  } else {
    res.render("pages/getNFTs", {
      images: null,
      message: null,
      address: null,
    });
  }
});

// find by contract address
router.get("/getSpecific", async function (req, res) {
  // Wallet address
  // const address = "0xbba21be4e2b63bcfb58b263b02408df4a52ec722";
  // const tokenId = 703;
  // const chain = 'eth'
  const APIKEY_ETHEREUM_ALCHEMY = process.env.APIKEY_ETHEREUM_ALCHEMY;
  const APIKEY_POLYGON_ALCHEMY = process.env.APIKEY_POLYGON_ALCHEMY;
  const APIKEY_ARBITRUM_ALCHEMY = process.env.APIKEY_ARBITRUM_ALCHEMY;
  const APIKEY_OPTIMISM_ALCHEMY = process.env.APIKEY_OPTIMISM_ALCHEMY;

  const address = req.query.contractAddress;
  const tokenId = req.query.tokenId;
  const chain = req.query.chain;
  const input = { address, tokenId, chain };
  if (address !== undefined) {
    // Alchemy URL
    let baseURL = "";
    switch (chain) {
      case "eth":
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY_ETHEREUM_ALCHEMY}`;
        break;
      case "matic":
        baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${APIKEY_POLYGON_ALCHEMY}`;
        break;
      case "arbitrum":
        baseURL = `https://arb-mainnet.g.alchemy.com/v2/${APIKEY_ARBITRUM_ALCHEMY}`;
        break;
      case "optimism":
        baseURL = `https://opt-mainnet.g.alchemy.com/v2/${APIKEY_OPTIMISM_ALCHEMY}`;
        break;
      default:
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY_ETHEREUM_ALCHEMY}`;
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
            message: "NOT FOUND",
            input,
          });
        }
        res.render("pages/getSpecificNFT", {
          image: data,
          message: null,
          input,
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getSpecificNFT", {
      image: null,
      message: null,
      input,
    });
  }
});

// find by opensea url
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
    const APIKEY_ETHEREUM_ALCHEMY = process.env.APIKEY_ETHEREUM_ALCHEMY;
    const APIKEY_POLYGON_ALCHEMY = process.env.APIKEY_POLYGON_ALCHEMY;
    const APIKEY_ARBITRUM_ALCHEMY = process.env.APIKEY_ARBITRUM_ALCHEMY;
    const APIKEY_OPTIMISM_ALCHEMY = process.env.APIKEY_OPTIMISM_ALCHEMY;
    switch (splitUrl[splitUrl.length - 3]) {
      case "eth":
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY_ETHEREUM_ALCHEMY}`;
        break;
      case "matic":
        baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${APIKEY_POLYGON_ALCHEMY}`;
        break;
      case "arbitrum":
        baseURL = `https://arb-mainnet.g.alchemy.com/v2/${APIKEY_ARBITRUM_ALCHEMY}`;
        break;
      case "optimism":
        baseURL = `https://opt-mainnet.g.alchemy.com/v2/${APIKEY_OPTIMISM_ALCHEMY}`;
        break;
      default:
        baseURL = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY_ETHEREUM_ALCHEMY}`;
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
            message: "NOT FOUND",
            urlOpensea: urlOpensea,
          });
        }
        res.render("pages/getNFTOpensea", {
          image: data,
          message: null,
          urlOpensea: urlOpensea,
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getNFTOpensea", {
      image: null,
      message: null,
      urlOpensea: null,
    });
  }
});

// not now
router.get("/getCollections", async function (req, res) {
  const name = req.query.nameCollection;
  const APIKEY = process.env.APIKEY_BLOCKDEAMON;
  if (name) {
    let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=${name}&verified=true`;
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
            message: null,
          });
        }
        res.render("pages/getCollections", {
          collections: collections,
          message: null,
        });
      })
      .catch((error) => console.log("error", error));
  } else {
    res.render("pages/getCollections", {
      collections: null,
      message: null,
    });
  }
});

// find by collection
router.get("/detailCollection", async function (req, res) {
  const nameCollection = req.query.nameCollection;
  const tokenId = req.query.tokenId;
  const contractAddress = req.query.contractAddress;
  const APIKEY = process.env.APIKEY_BLOCKDEAMON;
  // console.log(tokenId, contractAddress, "dcndncndcndcndcndcnd");
  let url;
  if (contractAddress && tokenId) {
    url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=${contractAddress}&token_id=${tokenId}`;
  } else if (nameCollection) {
    url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?collection_name=${nameCollection}`;
  } else {
    return res.render("pages/detailCollection", {
      collections: null,
      message: null,
    });
  }
// console.log(url,"okokkokokokokokokok");
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
      if (collections.length === 0) {
        return res.render("pages/detailCollection", {
          collections: null,
          contractAddress: null,
          message: "NOT FOUND",
          nameCollection: nameCollection
        });
      }
      let contract_address = collections[0].contract_address
        ? collections[0].contract_address
        : null;
      // console.log(contract_address);
      res.render("pages/detailCollection", {
        collections: collections,
        contractAddress: contract_address,
        message: null,
        nameCollection: nameCollection
      });
    })
    .catch((error) => console.log("error", error));
});

module.exports = router;
