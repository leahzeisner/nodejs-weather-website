const request = require('request');


const geocode = (address, callback) => {
    const addr = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1IjoibGVhaHplaXNuZXIiLCJhIjoiY2twYWJxMHJ0MG9kODJ4cGdkNzc2aDI2dyJ9.uKMKhwfRLhJckPL3Y5HEBw&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Unable to connect to location service.', undefined)
        } else if (body.features.length === 0) {
            callback('Error! Unable to find location.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


const geocodeCurrentLocation = (latitude, longitude, callback) => {
    latitude = encodeURIComponent(latitude)
    longitude = encodeURIComponent(longitude)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibGVhaHplaXNuZXIiLCJhIjoiY2twYWJxMHJ0MG9kODJ4cGdkNzc2aDI2dyJ9.uKMKhwfRLhJckPL3Y5HEBw&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Unable to connect to location service.', undefined)
        } else if (body.features.length === 0) {
            callback('Error! Unable to find location.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = { geocode, geocodeCurrentLocation }