const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { forecast, geolocation } = require('./api/weather')

const app = express();

hbs.registerPartials(path.join(__dirname, '../src/templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './templates/views'))

app.get('/', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Worawut Rukyat"
  })
})

app.get('/blog', (req, res) => {
  res.render('blog', {
    title: "Blog",
    name: "Worawut Rukyat"

  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "Rorawut Rukyat",
    profileUrl: "https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"

  })
})

app.get('/api/weather', (req, res) => {
  const address = req.query.location;
  if (!address) {
    const errorMessage = "please insert your location";
    return res.send({error: errorMessage});
  }
  forecast(address, (err, data) => {
    if (err) {
      const errorMessage = "Invalid location";
      return res.send({error: errorMessage});
    }
    const { lon, lat } = data
    const messageOne = `The location's at latitude: ${lat} and longitude: ${lon}`;

    geolocation(data, (err, result) => {
      const { main, description } = result[0];
      const messageTwo = `Weather today is ${main} and ${description}`;

      res.send({
        address: address,
        messageOne,
        messageTwo
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Not Found',
    name: 'Worawut Rukyat'
  })
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port ' + port)
});