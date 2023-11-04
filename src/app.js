const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express();

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Himanshu Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Himanshu Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Reach out to me for help',
        name: 'Himanshu Singh'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send('Error: Address is missing');
    }
    
    geocode(address, (error, {latitude, longitude} = {}) => {
        if(error){
            res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if(error){
                    res.send({
                        error
                    })
                }else {
                    res.send({
                        forecast: data.description,
                        temperature: data.temperature,
                        feelslike: data.feelslike,
                        address
                    })
                }
            })
        }
    })
});

app.get('*', (req, res)=>{
    res.send('My 404 page')
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});