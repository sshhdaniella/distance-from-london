const geolib = require('geolib');
const milesToMeters = require('./getMeters');

//london lat lng
const LondonCoOrds = Object.freeze({
    latitude: 51.5074,
    longitude: -0.1278
});

const getRadiusDistance = (data, miles) => {
    let dataInRadius = [];
    const radiusDistance = milesToMeters(miles);
    data.forEach(item => {
        if(geolib.isPointWithinRadius({ latitude: item.latitude, longitude: item.longitude }, LondonCoOrds, radiusDistance)){
            dataInRadius.push({...item});
        }
    });

    return dataInRadius;
}

module.exports = getRadiusDistance;
