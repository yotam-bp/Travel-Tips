
export const mapService = {
    initMap,
    addMarker,
    panTo
}

const API_KEY = 'AIzaSyBnQ0ebntiaqnKC_liI8ybwWzqTD68V02w'; //TODO: Enter your API Key
var gMap;

function initMap(lat = 32.0831488, lng = 34.783232) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 10
            })
            return gMap
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function _googleGeocodeApi() {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`)
        .then(res => res.data)
}
