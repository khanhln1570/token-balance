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

global.defaultCollections = [
  {
    id: "e53845ac-3c5a-5390-96b2-b4bc140c91e4",
    name: "CryptoPunks",
    logo: "token/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/23a8af9e-86e8-561c-9dc8-ce68917e062f.png",
    contracts: ["0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
    verified: true,
  },
  {
    "id": "101e48f1-d37e-5c1c-af8b-9b8cfe7fa213",
    "name": "Mutant Ape Yacht Club",
    "logo": "token/0x60E4d786628Fea6478F785A6d7e704777c86a7c6/7286e26c-d0d9-5939-99d4-12f8e43b5235.png",
    "contracts": [
      "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"
    ],
    "verified": true
  },
  {
    "id": "4203aedd-7964-5fe1-b932-eb8c4fda7822",
    "name": "Bored Ape Yacht Club",
    "logo": "token/0x0c3A405727dEa8C9FA51FD931ed223535412F7Ac/6fb9df73-db2a-5692-9f06-b686ff4781b7.jpeg",
    "contracts": [
      "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
    ],
    "verified": true
  },
  {
    "id": "885eb56d-858d-52aa-ba71-38913c9b6cab",
    "name": "Bored Ape Kennel Club",
    "logo": "token/0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623/c02f4e26-e719-573a-befa-08fdaad2714d.png",
    "contracts": [
      "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623"
    ],
    "verified": true
  },
  {
    "id": "070ef5fd-cbce-515f-9b34-10c278fb3074",
    "name": "Doodles",
    "logo": "collection/070ef5fd-cbce-515f-9b34-10c278fb3074/logo.jpeg",
    "contracts": [
      "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e"
    ],
    "verified": true
  },
  {
    "id": "aa71f0b2-0cb3-5869-9ffd-7690d2c24c07",
    "name": "Otherdeed for Otherside",
    "logo": "token/0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258/a2961b00-b33c-57e7-8001-50718b4c7902.jpeg",
    "contracts": [
      "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"
    ],
    "verified": true
  },
  {
    "id": "d41d7f83-c664-527d-9e1d-4d255b76470a",
    "name": "Azuki",
    "logo": "token/0xED5AF388653567Af2F388E6224dC7C4b3241C544/e257c989-5bda-56e8-a7cb-63ecb244207a.png",
    "contracts": [
      "0xED5AF388653567Af2F388E6224dC7C4b3241C544"
    ],
    "verified": true
  },
  {
    "id": "58c31f85-d52e-51be-b358-60977fb7df95",
    "name": "CLONE X",
    "logo": "token/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/a23b0fb3-b844-5cda-ad82-499728d0a7cd.png",
    "contracts": [
      "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B"
    ],
    "verified": true
  },
  {
    "id": "3e7665ee-a041-5cb2-8d50-09f255f3b95f",
    "name": "BEANZ Official",
    "logo": "token/0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949/20240729-c0d9-5b20-97b7-9536059db8ee.png",
    "contracts": [
      "0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949"
    ],
    "verified": true
  },
  {
    "id": "cbea0c0a-1de4-5e91-9c1f-86f1a7301022",
    "name": "Pudgy Penguins",
    "logo": "token/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8/07a07b35-d907-5ed0-84f9-3c669ec18e69.png",
    "contracts": [
      "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
    ],
    "verified": true
  }
];
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

