const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//allow calculation of lat / lng
const geolib = require('geolib');

//london lat lng
const LondonCoOrds = Object.freeze({
    latitude: 51.5074,
    longitude: -0.1278
});

//function to get data
const getData = async url => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//endpoints
// https://dwp-techtest.herokuapp.com/instructions
// https://dwp-techtest.herokuapp.com/city/{city}/users == London
// https://dwp-techtest.herokuapp.com/user/{id}
// https://dwp-techtest.herokuapp.com/users

router.get('/', (req, res) => {
    res.render('index', { title: 'Distance from London' });
});

router.get('/users/:city', async (req, res) => {
    const { city } = req.params;
    const { miles } = req.query;

    const mileToM = (m) => {
        return (m * 1.60934) * 1000;
    }

    const allUsers = await getData('https://dwp-techtest.herokuapp.com/users');
    const usersInLondon = await getData(`https://dwp-techtest.herokuapp.com/city/${city}/users`);
    
    let usersInRadius = [];
    if(miles){
        const radiusDistance = mileToM(miles);
        allUsers.forEach(user => {
            if(geolib.isPointWithinRadius({ latitude: user.latitude, longitude: user.longitude }, LondonCoOrds, radiusDistance)){
                usersInRadius.push({...user});
            }
        });
    }

    const combinedUsers = [...usersInLondon, ...usersInRadius];
    res.render('index', {title: 'Users in London', users: combinedUsers});
});

module.exports = router;
