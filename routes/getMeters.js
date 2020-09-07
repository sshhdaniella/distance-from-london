//accepts distance in miles
//covert miles to km and then multiply by 1000 to get meters
//isPointWithinRadius accepts distance in meters
const milesToMeters = (m) => {
    return (m * 1.60934) * 1000;
}

module.exports = milesToMeters;
