var express = require("express");
const cors = require('cors')
var app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
require('dotenv').config();
// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let defaultSuggestions = [
  {
    id: "e53845ac-3c5a-5390-96b2-b4bc140c91e4",
    name: "CryptoPunks",
    logo: "collection/e53845ac-3c5a-5390-96b2-b4bc140c91e4/logo.png",
    contracts: ["0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
    verified: true,
  },
  {
    "id": "101e48f1-d37e-5c1c-af8b-9b8cfe7fa213",
    "name": "Mutant Ape Yacht Club",
    "logo": "collection/101e48f1-d37e-5c1c-af8b-9b8cfe7fa213/logo.png",
    "contracts": [
      "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"
    ],
    "verified": true
  },
  {
    "id": "4203aedd-7964-5fe1-b932-eb8c4fda7822",
    "name": "Bored Ape Yacht Club",
    "logo": "collection/4203aedd-7964-5fe1-b932-eb8c4fda7822/logo.png",
    "contracts": [
      "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
    ],
    "verified": true
  },
  {
    "id": "885eb56d-858d-52aa-ba71-38913c9b6cab",
    "name": "Bored Ape Kennel Club",
    "logo": "collection/885eb56d-858d-52aa-ba71-38913c9b6cab/logo.png",
    "contracts": [
      "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623"
    ],
    "verified": true
  },
  {
    "id": "aa71f0b2-0cb3-5869-9ffd-7690d2c24c07",
    "name": "Otherdeed for Otherside",
    "logo": "collection/aa71f0b2-0cb3-5869-9ffd-7690d2c24c07/logo.jpeg",
    "contracts": [
      "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"
    ],
    "verified": true
  },
  {
    "id": "d41d7f83-c664-527d-9e1d-4d255b76470a",
    "name": "Azuki",
    "logo": "collection/d41d7f83-c664-527d-9e1d-4d255b76470a/logo.jpeg",
    "contracts": [
      "0xED5AF388653567Af2F388E6224dC7C4b3241C544"
    ],
    "verified": true
  },
  {
    "id": "58c31f85-d52e-51be-b358-60977fb7df95",
    "name": "CLONE X - X TAKASHI MURAKAMI",
    "logo": "collection/58c31f85-d52e-51be-b358-60977fb7df95/logo.png",
    "contracts": [
      "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B"
    ],
    "verified": true
  },
  {
    "id": "3e7665ee-a041-5cb2-8d50-09f255f3b95f",
    "name": "BEANZ Official",
    "logo": "collection/3e7665ee-a041-5cb2-8d50-09f255f3b95f/logo.png",
    "contracts": [
      "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949"
    ],
    "verified": true
  },
  {
    "id": "cbea0c0a-1de4-5e91-9c1f-86f1a7301022",
    "name": "Pudgy Penguins",
    "logo": "collection/cbea0c0a-1de4-5e91-9c1f-86f1a7301022/logo.png",
    "contracts": [
      "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
    ],
    "verified": true
  }
];
global.defaultCollections = defaultSuggestions;
// index page
app.get("/", function (req, res) {
  res.redirect('/search');
});
// index page v2
app.get("/search", function (req, res) {
  global.version = "v2"
  res.render("pages/index");
});
// index page v1
app.get("/import", function (req, res) {
  global.version = "v1"
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// nft page
const routerGetNft = require("./routes/getNFTsRoute")
app.use('/nft', routerGetNft)

const routerQr = require("./routes/generateQRcode")
app.use('/qr', routerQr)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

