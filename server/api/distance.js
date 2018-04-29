const router = require('express').Router()
const axios = require('axios')
const GOOGLE_MAPS_API_KEY = require('../../secrets').GOOGLE_MAPS_API_KEY
// const distance = require('google-distance-matrix')
module.exports = router
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjeV2maJ-Oxb3UKjSHM58NFJfhCCX478U'
});
const distance = require('google-distance-matrix') 
// Geocode an address.

router.post('/', (req, res, next) => {

 
  // const origins = ['40.785091,-73.968285']
  // const destinations = [‎'40.730610,-73.935242']
  var origins = ['New York NY'];
  var destinations = ['41.8337329,-87.7321554'];
  var mode = 'walking'
  
  distance.matrix(origins, destinations, mode, function(err, distances){
    if (!err)
      console.log(distances)
      res.json(distances.rows)
  })
}) 


//   googleMapsClient.distanceMatrix({
//     origins : '75+9th+Ave+New+York,+NY',
//     destinations : `Bridgewater+Commons,+Commons+Way,+Bridgewater,+NJ`
//   }, function(err, response) {
//     if (!err) {
//       console.log(response)
//       console.log(response.json.results);
//     }
//   })

  // googleMapsClient.directions({
  //     origin,
  //     destination,
  //     mode: 'walking'
  //   }, function(err, response) {
  //     if (!err) {
  //       console.log(response)
  //       console.log(response.json.results);
  //     }
  //   })
  // })


// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });