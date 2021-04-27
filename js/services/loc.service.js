import {storageService} from './storage.service.js'

export const locService = {
    getLocs
}
const KEY = 'My-locations'

var locs = [
    { id: 1, name: 'Tokyo', lat: 32.047104, lng: 34.832384, weather: 12, createdAt:1, updatedAt:1 },
    { id: 2, name: 'Bangkok', lat: 32.047104, lng: 34.832384, weather: 33, createdAt:1, updatedAt:1 },
    { id: 3, name: 'New-Delhi', lat: 32.047104, lng: 34.832384, weather: 32, createdAt:1, updatedAt:1 },
    { id: 4, name: 'Manila', lat: 32.047104, lng: 34.832384, weather: 28, createdAt:1, updatedAt:1 },
    { id: 5, name: 'Kathmandu', lat: 32.047104, lng: 34.832384, weather: 18, createdAt:1, updatedAt:1 },
]


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
            storageService.saveToStorage('locations', locs)
        }, 2000)
    });
}


