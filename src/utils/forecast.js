const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const lat = encodeURIComponent(latitude);
    const long = encodeURIComponent(longitude);
    const url = `http://api.weatherstack.com/current?access_key=2ade4621baaea4386417a0f6e31f4c50&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Error! Unable to find location.', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            const forecast = `It's currently ${weather_descriptions[0]}. ` + 
                                    `It's ${temperature} degrees out. ` +
                                    `It feels like ${feelslike} degrees out.`

            callback(undefined, { forecast })
        }
    })
}


module.exports = forecast