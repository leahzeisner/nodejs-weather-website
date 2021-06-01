const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const currentLocationButton = document.querySelector('#use-current-location-button')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error 
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }          
        })
    })

    search.value = ''
})


currentLocationButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    message1.textContent = 'Loading...'
    message2.textContent = ''


    navigator.geolocation.getCurrentPosition(({ coords }, error) => {
        if (!error) {
            const lat = encodeURIComponent(coords.latitude)
            const long = encodeURIComponent(coords.longitude)
            fetch(`/weatherFromCurrentLocation?latitude=${lat}&longitude=${long}`)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        message1.textContent = data.error 
                    } else {
                        message1.textContent = data.location
                        message2.textContent = data.forecast
                    }          
                })
            })
        }
    })



    
})