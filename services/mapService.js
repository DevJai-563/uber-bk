const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
    
    const  res  = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)} ` );
    
    if(res.data.length > 0) {

        return {
            lat: res.data[0].lat,
            lon: res.data[0].lon,
            display_name: res.data[0].display_name
        };

       
    } else {
        throw new Error("Unable to get coordinates");
    }
    }

module.exports.getDistanceTime = async (originAdd, destinationAdd) => {
    if(!originAdd || !destinationAdd) {
        throw new Error("Origin and destination addresses are required");
    }
    const origin = await module.exports.getAddressCoordinates(originAdd);
    const destination = await module.exports.getAddressCoordinates(destinationAdd);

    const res = await axios.get(`https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`);
    if(res.data.routes.length > 0) {
        return {
            distance: Math.ceil(res.data.routes[0].distance/1000),
            duration: Math.ceil(res.data.routes[0].duration/60)
        };
    } else {
        throw new Error("Unable to get distance and time");
    }
}

