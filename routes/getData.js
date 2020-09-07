const fetch = require('node-fetch');

//function to get data
const getData = async url => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;        
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getData;
