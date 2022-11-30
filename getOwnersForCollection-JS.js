const fetch = require("node-fetch");

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData(
  "https://eth-mainnet.g.alchemy.com/v2/YVMqyY1EhL0f281q52gtBw04p92ACOzA/getOwnersForCollection?contractAddress=0x15ea13b66b3badb355fcfa6317c3b96567825037",
  {}
)
  .then((data) => {
    console.log(data);
    alert("Successly get list of Address"); // JSON data parsed by `data.json()` call
  })
  .catch((err) => {
    alert("Sorry, Error");
  });
