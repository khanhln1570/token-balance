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
  $(".modal-footer #qr-url").val(link);

  $("#callZekeke").click(function () {
    $(this).data("clicked", true);
    if ($("#callZekeke").data("clicked")) {
      callZekeke(link);
    }
  });
  $("#flexCheckDefault").change(function () {
    let isChecked = $("#flexCheckDefault").is(":checked");
    if (isChecked) {
      $("#callZekeke").prop("disabled", false);
      $("#generateQr").prop("disabled", false);
    } else {
      $("#callZekeke").prop("disabled", true);
      $("#generateQr").prop("disabled", true);
    }
  });
});

/* find collecion */
// let collections = [];
// function apiCall() {
//   // let input = document.getElementById("nameCollection").value;
//   document
//     .querySelector("#nameCollection")
//     .addEventListener("input", async function (event) {
//       let input = event.target.value;
//       console.log(input);
//       setTimeout(call, 500, input);
//     });

//   function call(input) {
//     const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";

//     let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?apiKey=${APIKEY}&name=${input}&verified=true&&page_size=10`;
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         const result = data.data;

//         collections = result.map((collection) => {
//           return {
//             name: collection.name,
//             logo: `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${collection.logo}?apiKey=${APIKEY}`,
//           };
//         });
//         // autocomplete(document.getElementById("nameCollection"), collections);
//         if (collections.length !== 0) {
//           autocomplete(document.getElementById("nameCollection"), collections);
//         }
//       });
//   }
// }
let collections = [];
document
  .querySelector("#nameCollection")
  .addEventListener("input", async function (event) {
    let input = event.target.value;
    if (input.length > 0) {
      setTimeout(() => {
        const APIKEY = "rBWqZx0eHdgw8DTBLKL0gDBVQz6FCm4C969AsgV15MvFB3Z4";

        let url = `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?apiKey=${APIKEY}&name=${input}&verified=true&page_size=10`;
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
      }, 500);
    }
  });

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

      b.innerHTML = `<img class= "lazy-image" style=" border-radius: 50%;width: 50px;height: 50px; margin-right: 20px" src="https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif" data-src=${arr[i].logo}>`;
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

  /**lazy loading */
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
