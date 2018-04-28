const router = require('express').Router()
const GOOGLE_MAPS_API_KEY = require('../../secrets').GOOGLE_MAPS_API_KEY
// const distance = require('google-distance-matrix')
module.exports = router
var googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_MAPS_API_KEY
});

// Geocode an address.

router.get('/', (req, res, next) => {
  console.log('REQ.BODY', req.body)
  const origins = '40.7084,74.0087'
  const destinations = `40.72095,-73.9963`
  // distance.matrix(origins, destinations, function(err, distances){
  //   if (!err)
  //     console.log(distances)
  // })

  googleMapsClient.directions({
    origins,
    destinations
  }, function(err, response) {
    if (!err) {
      console.log(response.json.results);
    }
  });
})

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });