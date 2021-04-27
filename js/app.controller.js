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
    locService.getLocs()
        .then(renderLocs)

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



function renderLocs(locs) {
    // console.log('locs ', locs);
    const elLocsTable = document.querySelector('.location-table');
    const loc = locs.map(loc => {
        return `
        <div class="loc-container">
        <h4>${loc.name}</h4>
        <div class="loc-btns-container">
        <button data-lat="${loc.lat}" data-lng="${loc.lng}" class="go-to-loc">GO</button>
        <button data-id="${loc.id}" class="delete-loc">DELETE</button>
        </div>
        </div>`
    });
    elLocsTable.innerHTML = loc.join('')
    // go to location
    const elBtns = document.querySelectorAll('.go-to-loc');
    elBtns.forEach(elBtn => elBtn.addEventListener('click', goToLoc))
    // delete location
    const elDeleteBtns = document.querySelectorAll('.delete-loc');
    elDeleteBtns.forEach(elBtn => elBtn.addEventListener('click', deleteLoc))
}


function goToLoc(ev) {
    const lat = ev.target.dataset.lat
    const lng = ev.target.dataset.lng
    console.log('lat ', lat)
    console.log('lng ', lng)
    mapService.panTo(lat, lng);
}

function deleteLoc(ev) {
    const btnId = ev.target.dataset.id
    console.log(btnId)
    locService.deleteLocFromStorage(btnId);
    locService.getLocs().then(renderLocs)
}