function callZekeke(url) {
  console.log(url);
  window.parent.postMessage(
    {
      message_type: "IMAGE_SELECTED",
      url: url,
      mime: "image/jpeg, image/png",
    },
    "*"
  );
}
// select image nft
$(document).on("click", ".nft", function () {

  let link = $(this).attr("data-link");
  let title = $(this).attr("data-title");
  let tokenId = $(this).attr("data-tokenid");
  console.log(link);
  $(".modal-body #image-detail").attr("src", link);
  $('.modal-body #image-title').text(title);
  $('.modal-body #image-tokenId').text(`#${parseInt(tokenId)}`);
  $("#flexCheckDefault").prop('checked', false);
  $('#callZekeke').prop("disabled", true);
  $('#generateQr').prop("disabled", true);
  $(".modal-footer #qr-url").val(link);

  $("#callZekeke").click(function () {
    $(this).data('clicked', true);
    if ($('#callZekeke').data('clicked')) {
      callZekeke(link)
    }
  });
});

$('#flexCheckDefault').change(function () {
  let isChecked = $('#flexCheckDefault').is(':checked');
  if (isChecked) {
    $('#callZekeke').prop("disabled", false);
    $('#generateQr').prop("disabled", false);
  } else {
    $('#callZekeke').prop("disabled", true);
    $('#generateQr').prop("disabled", true);
  }
}); 
// window.addEventListener("message", function (event) {
//         if (event.origin !== "http://localhost:8080")
//             return;
//         localStorage.setItem("url", event.data.url)
//         console.log(event.data);
//     });
let collections = [];
async function apiCall() {
  let input = document.getElementById("nameCollection").value;
  setTimeout(call, 500, input);
  function call(input) {
    if (input.length >= 1) {
      const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";

      let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?apiKey=${APIKEY}&name=${input}&verified=true`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const result = data.data;

          collections = result.map((collection) => {
            return {
              name: collection.name,
              logo: `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${collection.logo}?apiKey=${APIKEY}`,
            };
          });
          // autocomplete(document.getElementById("nameCollection"), collections);
          if (collections.length !== 0) {
            autocomplete(
              document.getElementById("nameCollection"),
              collections
            );
          }
        });
    }
  }
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
          the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items scroll");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      // if (arr[i].replace(/\s/g,'').toLowerCase().includes(val.replace(/\s/g,'').toLowerCase()) ) {

      /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      /*make the matching letters bold:*/

      b.innerHTML = `<img style=" border-radius: 50%;width: 50px;height: 50px; margin-right: 20px" src=${arr[i].logo}>`;
      b.innerHTML += "<strong>" + arr[i].name + "</strong>";
      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
      /*execute a function when someone clicks on the item value (DIV element):*/
      b.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        inp.value = this.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/

        closeAllLists();
      });
      a.appendChild(b);
      // }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

let account;

// https://docs.walletconnect.com/quick-start/dapps/web3-provider
let provider = new WalletConnectProvider.default({
  rpc: {
    1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
    137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
    // ...
  },
  bridge: "https://bridge.walletconnect.org",
});

const connectWC = async () => {
  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  if (window.mobileCheck()) {
    try {
      await provider.enable();
  
      //  Create Web3 instance
      const web3 = new Web3(provider);
      window.w3 = web3;
  
      var accounts = await web3.eth.getAccounts(); // get all connected accounts
      account = accounts[0]; // get the primary account
      document.getElementById("walletAddress").value = account;
    } catch (error) {
      console.warn(error);
      location.reload();
    }
  } else {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      account = accounts[0];
      if (account) {
        console.log(account);
        document.getElementById("walletAddress").value = account;
      } else {
        alert("Fail")
      }
      ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
        console.log(result);
      });
    });
  }
 
};

const sign = async (msg) => {
  if (w3) {
    return await w3.eth.personal.sign(msg, account);
  } else {
    return false;
  }
};

const contract = async (abi, address) => {
  if (w3) {
    return new w3.eth.Contract(abi, address);
  } else {
    return false;
  }
};

const disconnect = async () => {
  // Close provider session
  await provider.disconnect();
};
