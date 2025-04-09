const request = require('request')
// const url = 'http://api.weatherstack.com/current?access_key=083a12be18f8d4d8a114836dffb78762&query=37.8267,-122.4233&units=f'
// request({ url: url }, (error, response) => {
//     const data = JSON.parse(response.body)
//     console.log(data.current);
// })

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to weather service');
//     } else if (response.body.error){
//         console.log('Unable to find location');
//     }
//     else {
//         const current = response.body.current;
//         console.log(current.weather_descriptions[0]+' . it is currently '+current.temperature+' degrre out but feels like '+current.feelslike);
//     } 
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=083a12be18f8d4d8a114836dffb78762&query='+latitude+','+longitude+'&units=m'
    request({ url, json: true }, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather service', undefined);
    } else if (body.error){
        callback('Unable to find location', undefined);
    }
    else {
        const current = body.current;
        callback(undefined, {
            description: current.weather_descriptions[0],
            temperature: current.temperature,
            feelslike: current.feelslike
        })
    } 
})
}

module.exports = forecast