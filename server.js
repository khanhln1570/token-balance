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

// index page
app.get("/", function (req, res) {
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

