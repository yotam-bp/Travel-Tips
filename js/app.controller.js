import { storageService } from './services/storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;


function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    locService.getLocs()
        .then(renderLocs)
}

function addEventListenrs() {
    document.querySelector('#map').addEventListener('click', (ev) => {
        console.log('clicking on Map');
        mapService.panTo(32.0749831, 34.9120554);
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
    console.log('locs ', locs);
    const elLocsTable = document.querySelector('.location-table');
    const loc = locs.map(loc => {
        return `
        <div class="loc-container">
        <h4>${loc.name}</h4>
        <div class="loc-btns-container">
        <button data-lat="${loc.lat}" data-lng="${loc.lng}" class="go-to-loc">GO</button>
        <button class="delete-loc">DELETE</button>
        </div>
        </div>`
    });
    elLocsTable.innerHTML = loc.join('')
    const elBtns = document.querySelectorAll('.go-to-loc');
    elBtns.forEach(elBtn => elBtn.addEventListener('click', goToLoc))
}


function goToLoc(ev) {
    const lat = ev.target.dataset.lat
    const lng = ev.target.dataset.lng
    console.log('lat ', lat)
    console.log('lng ', lng)
    mapService.panTo(lat, lng);
}