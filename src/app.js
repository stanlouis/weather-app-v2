require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Require geocod and forecast
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('/', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Stanley Louis' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page', name: 'Stanley Louis' });
});

app.get('/weather', (req, res) => {
  if (req.query.address) {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          res.send({ error: error });
        } else {
          forecast(longitude, latitude, (error, foreCastData) => {
            if (error) {
              res.send({ error });
            } else {
              res.send({
                forecast: foreCastData,
                location: location,
                address: req.query.address,
              });
            }
          });
        }
      }
    );
  } else {
    res.send({
      error: 'You must supply an address',
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term!' });
  }
  res.send({
    products: [],
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help Page',
    name: 'Stanley Louis',
  });
});

app.get('/Weather', (req, res) =>
  res.send({ location: 'Maryland', temperature: '62deg' })
);

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Stanley Louis',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Stanley Louis',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
