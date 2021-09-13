const axios = require('axios')

const forecast = (location, callback) => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=969cbf505f969f0686763be1f5e655e1`)
    .then((response) => {
      const location = response.data.coord;
      callback(null, location)
    })
    .catch((err) => {
      callback(err, null)
    })
}

const geolocation = ({ lon, lat }, callback) => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=969cbf505f969f0686763be1f5e655e1`)
    .then((response) => {
      const data = response.data.weather;
      callback(null, data)
    })
    .catch((err) => {
      callback(err, null)
    })
}

module.exports = {
  forecast,
  geolocation
};