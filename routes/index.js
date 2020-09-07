const express = require('express');
const router = express.Router();

const getData = require('./getData');
const getRadiusDistance = require('./getRadiusDistance');

router.get('/', (req, res) => {
    res.status(200);
    res.render('index', { title: 'Find London Users' });
});

router.get('/users/:city', async (req, res) => {
    const { city } = req.params;
    const { miles } = req.query;

    if(!miles){
        res.render('index', {title: 'Find London Users', errors: 'You must provide distance in miles'});
        return;
    }
    
    if(Math.sign(miles) === -1) {
        res.render('index', {title: 'Find London Users', errors: 'You must enter a positive number'})
        return;
    }

    if(!Math.abs(miles)) {
        res.render('index', {title: 'Find London Users', errors: 'You must enter a number'})
        return;
    }

    const allUsers = await getData('https://dwp-techtest.herokuapp.com/users');
    const usersInLondon = await getData(`https://dwp-techtest.herokuapp.com/city/${city}/users`);
    
    const usersInRadius = allUsers.length > 0 && miles ? getRadiusDistance(allUsers, miles) : [];

    const combinedUsers = [...usersInLondon, ...usersInRadius];
    res.status(200);
    res.render('index', {title: 'London Users Results', users: combinedUsers, miles});
});

module.exports = router;
