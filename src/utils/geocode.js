const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search!');
    } else {
      const { center, place_name } = response.body.features[0];
      const location = place_name;
      const longitude = center[0];
      const latitude = center[1];
      callback(undefined, { location, longitude, latitude });
    }
  });
};

module.exports = geocode;
