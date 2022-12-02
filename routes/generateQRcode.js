const express = require("express");
const router = express.Router();
const qr = require("qrcode");

router.get("/", (req, res) => {
  res.render("pages/generateQRcode",{image: null, url:null});
});

router.post("/generate", async function (req, res) {
  const url = req.body.url;
  let qrcode = await qr.toDataURL(url);
  return res.render('pages/generateQRcode',{image: qrcode, url: url})
});
module.exports = router;
