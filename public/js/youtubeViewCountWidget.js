//const

let map;
function initMap() {
    //const { google } = require('googleapis');
    //const goo = new google.maps();
    var inputVal = document.getElementById("inputLatitude").value;
    console.log("ici");
    alert(inputVal);
    inputVal = parseFloat(inputVal);
    console.log(inputVal);
    map = new google.maps.Map(document.getElementById('map'), {
//        center: {lat: -34.397, lng: 150.644},
        center: {lat: inputVal, lng: 150.644},
        zoom: 8,
    });
}
