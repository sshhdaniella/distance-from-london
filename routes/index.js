const express = require('express');
const router = express.Router();

//allow calculation of lat / lng
const geolib = require('geolib');
const milesToMeters = require('./getMeters');
const getData = require('./getData');

//london lat lng
const LondonCoOrds = Object.freeze({
    latitude: 51.5074,
    longitude: -0.1278
});

router.get('/', (req, res) => {
    res.status(200);
    res.render('index', { title: 'Find London Users' });
});

router.get('/users/:city', async (req, res) => {
    const { city } = req.params;
    const { london_users, miles } = req.query;

    if(!miles){
        res.render('index', {title: 'Find London Users', errors: 'You must provide distance in miles', london_users})
        return;
    }
    
    if(Math.sign(miles) === -1) {
        res.render('index', {title: 'Find London Users', errors: 'You must enter a positive number', london_users})
        return;
    }

    const allUsers = await getData('https://dwp-techtest.herokuapp.com/users');
    const usersInLondon = await getData(`https://dwp-techtest.herokuapp.com/city/${city}/users`);
    
    let usersInRadius = [];
    if(miles){
        const radiusDistance = milesToMeters(miles);
        allUsers.forEach(user => {
            if(geolib.isPointWithinRadius({ latitude: user.latitude, longitude: user.longitude }, LondonCoOrds, radiusDistance)){
                usersInRadius.push({...user});
            }
        });
    }

    const combinedUsers = [...usersInLondon, ...usersInRadius];
    res.status(200);
    res.render('index', {title: 'London Users Results', users: combinedUsers, miles});
});

module.exports = router;
