import _ from 'lodash';
// import './style.css';
// import 'bootstrap';
import './scss/main.scss';
import './styles/icon-animations.css';
//import Logo from './logo.png';
/*
function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Logo;

    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());
*/
// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab
// function showTab(n) {
//     // This function will display the specified tab of the form ...
//     var x = document.getElementsByClassName("tab");
//     x[n].style.display = "block";
//     // ... and fix the Previous/Next buttons:
//     if (n == 0) {
//         document.getElementById("prevBtn").style.display = "none";
//     } else {
//         document.getElementById("prevBtn").style.display = "inline";
//     }
//     if (n == (x.length - 1)) {
//         document.getElementById("nextBtn").innerHTML = "Jetzt beauftragen!";
//     } else {
//         document.getElementById("nextBtn").innerHTML = "Weiter";
//     }
//     // ... and run a function that displays the correct step indicator:
//     fixStepIndicator(n)
// }

// function nextPrev(n) {
//     // This function will figure out which tab to display
//     var x = document.getElementsByClassName("tab");
//     // Exit the function if any field in the current tab is invalid:
//     if (n == 1 && !validateForm()) return false;
//     // Hide the current tab:
//     x[currentTab].style.display = "none";
//     // Increase or decrease the current tab by 1:
//     currentTab = currentTab + n;
//     // if you have reached the end of the form... :
//     if (currentTab >= x.length) {
//         //...the form gets submitted:
//         document.getElementById("regForm").submit();
//         return false;
//     }
//     // Otherwise, display the correct tab:
//     showTab(currentTab);
// }

// function validateForm() {
//     // This function deals with validation of the form fields
//     var x, y, i, valid = true;
//     x = document.getElementsByClassName("tab");
//     y = x[currentTab].getElementsByTagName("input");
//     // A loop that checks every input field in the current tab:
//     for (i = 0; i < y.length; i++) {
//         // If a field is empty...
//         if (y[i].value == "") {
//             // add an "invalid" class to the field:
//             y[i].className += " invalid";
//             // and set the current valid status to false:
//             valid = false;
//         }
//     }
//     // If the valid status is true, mark the step as finished and valid:
//     if (valid) {
//         document.getElementsByClassName("step")[currentTab].className += " finish";
//     }
//     return valid; // return the valid status
// }

// function fixStepIndicator(n) {
//     // This function removes the "active" class of all steps...
//     var i, x = document.getElementsByClassName("step");
//     for (i = 0; i < x.length; i++) {
//         x[i].className = x[i].className.replace(" active", "");
//     }
//     //... and adds the "active" class to the current step:
//     x[n].className += " active";
// }

// window.nextPrev = nextPrev;


// function getApiResponse() {

//     const ApiUrl = 'https://cloud.mailing.halloanwalt.de/test-api-sandbox?q=1';

//     fetch(ApiUrl)
//     .then(response => response.json())
//     .then(data => console.log(data));

// }


// getApiResponse();

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
        q: 1,
    }))
    .then(data => {
      console.log("data:"); // JSON data parsed by `data.json()` call
      console.log(data); // JSON data parsed by `data.json()` call

        const successAnimation = document.getElementById('success');
        const failureAnimation = document.getElementById('failure');

        if (data.statusCode == '200') {
            successAnimation.classList.remove("hidden");
        } else {
            failureAnimation.classList.remove("hidden");
        }

    });