const request = require('request')

// const positionStackURL = 'http://api.positionstack.com/v1/forward?access_key=3743566e888574011c3236162171a41b&query=kanpur&limit=1';

// request( { url: positionStackURL, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to positionstack service');
//     } else if(response.body.error){
//         console.log('Unable to find coordinates for given location');
//     } else{
//         const data = response.body.data[0];
//         console.log('Latitde: ' +data.latitude+ ' and Longitude: '+data.longitude);
//     }
// })

const geoCode = (address, callback) => {
    const positionStackURL = 'http://api.positionstack.com/v1/forward?access_key=3743566e888574011c3236162171a41b&query='+address+'&limit=1';
        request( { url: positionStackURL, json: true }, (error, {body}) => {
                if(error){
                    callback('Unable to connect to positionstack service', undefined);
                } else if(body.error){
                    callback('Unable to find coordinates for given location',undefined);
                } else{
                    const data = body.data[0];
                    callback(undefined, {
                        latitude: data.latitude,
                        longitude: data.longitude
                    })
                }
        })
}    

module.exports = geoCode