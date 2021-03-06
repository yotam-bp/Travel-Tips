import { storageService } from './storage.service.js'
import { utilService } from '../util/util.js'

export const locService = {
    getLocs,
    deleteLocFromStorage,
    _addLocation,
    loadLocs
}
const KEY = 'locations'
loadLocs()


var gLocs = [
    { id: 1, name: 'Tokyo', lat: 35.652832, lng: 139.839478, weather: 12, createdAt: 1, updatedAt: 1 },
    { id: 2, name: 'Bangkok', lat: 13.736717, lng: 100.523186, weather: 33, createdAt: 1, updatedAt: 1 },
    { id: 3, name: 'New-Delhi', lat: 28.644800, lng: 77.216721, weather: 32, createdAt: 1, updatedAt: 1 },
    { id: 4, name: 'Manila', lat: 14.599512, lng: 120.984222, weather: 28, createdAt: 1, updatedAt: 1 },
    { id: 5, name: 'Kathmandu', lat: 27.700769, lng: 85.300140, weather: 18, createdAt: 1, updatedAt: 1 },
]

function _addLocation(coords, locationName) {
    const location = {
        id: utilService.makeId(),
        name: locationName,
        lat: coords.lat,
        lng: coords.lng
    }
    gLocs.push(location)
    storageService.saveToStorage('locations', gLocs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
             storageService.saveToStorage(KEY, gLocs)
        }, 200)
    });
}


function loadLocs() {
    const myLocs = storageService.loadFromStorage('locations')
    if (!myLocs || !myLocs.length) gLocs = []
    else gLocs = myLocs
    return myLocs
}

function deleteLocFromStorage(idToDelete) {
    console.log(+idToDelete)
    gLocs.map((loc, idx) => {
        if (loc.id === +idToDelete) gLocs.splice(idx, 1);
        return
    })
    console.log(gLocs) // checking if loc is deleted from gLocs
}