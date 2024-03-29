let collections = [];
let defaultSuggestions = [
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
    "id": "5a144c3b-55e5-5332-82b0-9191e9bdee1c",
    "name": "Kanpai Pandas",
    "logo": "collection/5a144c3b-55e5-5332-82b0-9191e9bdee1c/logo.png",
    "contracts": [
        "0xaCF63E56fd08970b43401492a02F6F38B6635C91"
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
    "name": "CLONE X - X TAKASHI MURAKAMI",
    "logo": "token/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/a23b0fb3-b844-5cda-ad82-499728d0a7cd.png",
    "contracts": [
      "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B"
    ],
    "verified": true
  },
  {
    "id": "82a84cd9-4753-502f-84f0-5e819e43a67b",
    "name": "GossApe Girl",
    "logo": "collection/82a84cd9-4753-502f-84f0-5e819e43a67b/logo.gif",
    "contracts": [
        "0x3bF447963c8d8BDf06751528De40efB0849f3037"
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
let input = 'default';
const processChanges = debounce(() => saveInput(input));

/** lazy image */
const images = document.querySelectorAll(".lazy-image");
const config = {
  // Khi hình ảnh này cách màn hình 300px,
  // nó sẽ được load
  rootMargin: "300px 0px",
  threshold: 0.01,
};

let observer = new IntersectionObserver(onIntersection, config);
images.forEach((image) => {
  observer.observe(image);
});

function onIntersection(entries) {
  entries.forEach((entry) => {
    // Nếu hình ảnh đã trở nên visible,
    // thì thay thế src cũ bằng src mới
    // và hủy bỏ theo dõi hình ảnh này
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);
      entry.target.src = entry.target.dataset.src;
    }
  });
}

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
  $(".modal-body #image-detail").attr("src", link);
  $(".modal-body #image-title").text(title);
  $(".modal-body #image-tokenId").text(`#${parseInt(tokenId)}`);
  $("#flexCheckDefault").prop("checked", false);
  $("#callZekeke").prop("disabled", true);
  $("#generateQr").prop("disabled", true);
  $("#downloadNft").prop("disabled", true);
  $(".modal-footer #qr-url").val(link);
  $("#downloadNft").attr("data-image-src", link);
  $("#downloadNft").attr("data-image-title", title);

  $("#callZekeke").click(function () {
    let version = $(this).attr("data-version");
    if (version === 'v2') {
      $("#warning-version").modal('show')
    } else {
      if ($(this).attr('disabled') === 'disabled') {
      } else {
        $(this).data("clicked", true);
        if ($("#callZekeke").data("clicked")) {
          callZekeke(link);
        }
      }
    }

  });

  $("#generateQr").click(function (event) {
    let version = $(this).attr("data-version");
    if (version === "v2") {
      event.preventDefault();
      $("#warning-version").modal('show')
    }

  });
  $("#flexCheckDefault").change(function () {
    let isChecked = $("#flexCheckDefault").is(":checked");
    if (isChecked) {
      $("#callZekeke").prop("disabled", false);
      $("#generateQr").prop("disabled", false);
      $("#downloadNft").prop("disabled", false);
    } else {
      $("#callZekeke").prop("disabled", true);
      $("#generateQr").prop("disabled", true);
      $("#downloadNft").prop("disabled", true);
    }
  });
});

const downloadNft = document.getElementById("downloadNft");
downloadNft.addEventListener("click", (event) => {
  // Tải hình ảnh về máy tính
  downloadImages(downloadNft.dataset.imageSrc, downloadNft.dataset.imageTitle);
});
const downloadImages = (url, title) => {


  const filename = `${title}.png`;
  fetch(`https://api.codetabs.com/v1/proxy?quest=${url}`)
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    })
    .catch((err) => {
      console.log(err);
    });
// Sử dụng fetch để tải về dữ liệu hình ảnh từ URL
// fetch(url, {mode: 'cors'})
//   .then(response => response.blob()) // chuyển đổi dữ liệu thành Blob
//   .then(blob => {
//     // Tạo đối tượng FileReader
//     const reader = new FileReader();

//     // Đọc dữ liệu của Blob và chuyển đổi thành base64
//     reader.readAsDataURL(blob);

//     // Khi quá trình đọc kết thúc, tạo một đối tượng Image mới để hiển thị hình ảnh
//     reader.onloadend = () => {
//       const image = new Image();
//       image.src = reader.result;
//       document.body.appendChild(image);
//     };
//   })
//   .catch(error => console.error(error));
};







function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}

function saveInput(input) {
  if (input.length > 0) {
    const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${APIKEY}`);
    const requestOptions = {
      method: 'GET',
      headers: headers
    };
    let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=${input}&verified=true&page_size=10`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const result = data.data;
        collections = result.map((collection) => {
          return collection
        });
        collections = collections.sort((a, b) => { return a.name.split(" ").join("").localeCompare(b.name.split(" ").join("")) });
        autocomplete(document.getElementById("nameCollection"), collections);
      });
  }

}

function autoCompleteDefault(arr, isDefault = true) {
  if (!arr) arr = defaultSuggestions;
  let input = document.getElementById("nameCollection");
  if (isDefault) input.value = '';
  var dropdown, // dropdown
    items, // item of dropdown
    i
  currentFocus = -1;
  /*create a DIV element that will contain the items (values):*/
  dropdown = document.createElement("DIV");
  dropdown.setAttribute("id", "autocomplete-list");
  dropdown.setAttribute("class", "autocomplete-items scroll");
  /*append the DIV element as a child of the autocomplete container:*/
  input.parentNode.appendChild(dropdown);
  for (i = 0; i < arr.length; i++) {

    /*create a DIV element for each matching element:*/
    items = document.createElement("DIV");

    items.innerHTML = `<img class= "lazy-image" style=" border-radius: 50%;width: 50px;height: 50px; margin-right: 20px" src="https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif" data-src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${arr[i].logo}?apiKey=rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4">`;
    items.innerHTML += "<strong>" + arr[i].name + "</strong>";

    /*insert a input field that will hold the current array item's value:*/
    items.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
    items.addEventListener("click", function (e) {
      /*insert the value for the autocomplete text field:*/
      input.value = this.getElementsByTagName("input")[0].value;
      getDetailCollection(input.value);
    });
    dropdown.appendChild(items);

  }
  const images = document.querySelectorAll(".lazy-image");
  const config = {
    // Khi hình ảnh này cách màn hình 300px,
    // nó sẽ được load
    rootMargin: "300px 0px",
    threshold: 0.01,
  };

  let observer = new IntersectionObserver(onIntersection, config);
  images.forEach((image) => {
    observer.observe(image);
  });

  function onIntersection(entries) {
    entries.forEach((entry) => {
      // Nếu hình ảnh đã trở nên visible,
      // thì thay thế src cũ bằng src mới
      // và hủy bỏ theo dõi hình ảnh này
      if (entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        entry.target.src = entry.target.dataset.src;
      }
    });
  }
}


function autocomplete(inp, arr) {
  if (arr.length > 0) {
    autoCompleteDefault(arr, false)
  }
  var currentFocus;
  closeAllLists();
  currentFocus = -1
  inp.addEventListener("input", function (e) {
    var a, // dropdown
      b, // item of dropdown
      i,
      val = this.value;
    closeAllLists();
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items scroll");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    if (val.length > 0) {

      for (i = 0; i < arr.length; i++) {
        if (arr[i].name.toUpperCase().includes(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");

          b.innerHTML = `<img class= "lazy-image" style=" border-radius: 50%;width: 50px;height: 50px; margin-right: 20px" src="https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif" data-src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${arr[i].logo}?apiKey=rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4">`;
          b.innerHTML += "<strong>" + arr[i].name + "</strong>";

          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;


            getDetailCollection();
          });
          a.appendChild(b);
        }
      }
    } else {
      autoCompleteDefault(defaultSuggestions, false);
    }

  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById("autocomplete-list");

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

function getDetailCollection(nameCollection) {
  let url = `/nft/detailCollection?nameCollection=${nameCollection}`;
  window.location.href = url;

}