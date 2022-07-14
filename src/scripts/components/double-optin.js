

// function getApiResponse() {

//     const ApiUrl = 'https://cloud.mailing.halloanwalt.de/test-api-sandbox?q=1';

//     fetch(ApiUrl)
//     .then(response => response.json())
//     .then(data => console.log(data));

// }


// getApiResponse();

export default function doubleOptIn() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const qParameter = urlParams.get('q');



  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // console.log(response);
    return response.json(); // parses JSON response into native JavaScript objects
  }

  //   const ApiUrl = 'https://cloud.mailing.halloanwalt.de/test-api-sandbox?q=1';
  const ApiUrl = 'https://cloud.mailing.halloanwalt.de/test-api-sandbox';

  postData(ApiUrl + '?' + new URLSearchParams({
        q: qParameter,
    }))
    .then(data => {
      console.log("data:"); // JSON data parsed by `data.json()` call
      console.log(data); // JSON data parsed by `data.json()` call

        const successAnimation = document.getElementById('success');
        const failureAnimation = document.getElementById('failure');
        const loadingAnimation = document.getElementById('loading');

        if (data.statusCode == '200') {
            loadingAnimation.classList.add("hidden");
            successAnimation.classList.remove("hidden");
          } else {
            loadingAnimation.classList.add("hidden");
            failureAnimation.classList.remove("hidden");
        }

    });


}

