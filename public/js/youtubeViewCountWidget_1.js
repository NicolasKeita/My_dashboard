let map;
function initMap() {
    let inputLatitude_1 = document.getElementById("inputLatitude_1");
    let inputLongitude_1 = document.getElementById("inputLongitude_1");
    if (inputLatitude_1) {
        inputLatitude_1 = inputLatitude_1.value;
        inputLatitude_1 = parseFloat(inputLatitude_1);
    }
    if (inputLongitude_1) {
        inputLongitude_1 = inputLongitude_1.value;
        inputLongitude_1 = parseFloat(inputLongitude_1);
    }
    if (inputLongitude_1 !== undefined) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: inputLatitude_1, lng: inputLongitude_1},
            zoom: 7,
        });
    }
    let inputLatitude_2 = document.getElementById("inputLatitude_2");
    let inputLongitude_2 = document.getElementById("inputLongitude_2");
    if (inputLatitude_2) {
        inputLatitude_2 = inputLatitude_2.value;
        inputLatitude_2 = parseFloat(inputLatitude_2);
    }
    if (inputLongitude_2) {
        inputLongitude_2 = inputLongitude_2.value;
        inputLongitude_2 = parseFloat(inputLongitude_2);
    }
    if (inputLongitude_2 !== undefined) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: inputLatitude_2, lng: inputLongitude_2},
            zoom: 7,
        });
    }
    let inputLatitude_3 = document.getElementById("inputLatitude_3");
    let inputLongitude_3 = document.getElementById("inputLongitude_3");
    if (inputLatitude_3) {
        inputLatitude_3 = inputLatitude_3.value;
        inputLatitude_3 = parseFloat(inputLatitude_3);
    }
    if (inputLongitude_3) {
        inputLongitude_3 = inputLongitude_3.value;
        inputLongitude_3 = parseFloat(inputLongitude_3);
    }
    if (inputLongitude_3 !== undefined) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: inputLatitude_3, lng: inputLongitude_3},
            zoom: 7,
        });
    }
}
