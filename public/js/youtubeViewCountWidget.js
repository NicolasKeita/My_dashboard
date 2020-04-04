let map;
function initMap() {
    let inputLatitude = document.getElementById("inputLatitude").value;
    let inputLongitude = document.getElementById("inputLongitude").value;
    inputLatitude = parseFloat(inputLatitude);
    inputLongitude = parseFloat(inputLongitude);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: inputLatitude, lng: inputLongitude},
        zoom: 7,
    });
}
