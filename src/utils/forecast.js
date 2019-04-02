const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/${
    process.env.DARKSKY_API_KEY
  }/${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location! Try another search.', undefined);
    } else {
      const { precipProbability, temperature } = response.body.currently;
      const { summary } = response.body.daily.data[0];
      callback(
        undefined,
        `${summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
