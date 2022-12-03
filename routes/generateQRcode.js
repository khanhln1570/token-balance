const express = require("express");
const router = express.Router();
const qr = require("qrcode");

router.get("/", (req, res) => {
  res.render("pages/generateQRcode",{image: null, url:null, message:null});
});

router.post("/generate", async function (req, res) {
  const url = req.body.url;
  if (url.toString().trim().startsWith(`https:`) || url.toString().trim().startsWith(`ipfs:`) ) {
    let qrcode = await qr.toDataURL(url,{
      width: 1024,
      type: 'image/png',
      margin: 2,
      scale: 5
    });
    return res.render('pages/generateQRcode',{image: qrcode, url: url,message:null})
  }
  return res.render('pages/generateQRcode',{image: null, url: url, message: 'Wrong URL format!'})
});
module.exports = router;
