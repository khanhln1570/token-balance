
  function callZekeke(url) {
    console.log(url)
    window.parent.postMessage({
      message_type: 'IMAGE_SELECTED',
      url: url,
      mime: 'image/jpeg, image/png'
    }, '*')
    
  }
        // window.addEventListener("message", function (event) {
        //         if (event.origin !== "http://localhost:8080")
        //             return;
        //         localStorage.setItem("url", event.data.url)
        //         console.log(event.data);
        //     });

