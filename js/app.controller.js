import { storageService } from './services/storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
let gMap;

function onInit() {
    mapService.initMap()
    .then((map) => {
        console.log('Map is ready');
        gMap = map
        addEventListenrs();
        })
        .catch(() => console.log('Error: cannot init map'));

}

function addEventListenrs() {
    //google Maps function!
        gMap.addListener('click', (ev) => {
        mapService.panTo(ev.latLng.lat(), ev.latLng.lng());
    })

    // gMap.addListener('contextmenu', (ev) => {
    //     mapService.addMarker({lat:ev.latLng.lat(), lng: ev.latLng.lng()});
    // })
    //////////////////////////
    document.querySelector('.search-location-btn').addEventListener('click', (ev) => {
        console.log('search');
    })

    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6895, 139.6917);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
