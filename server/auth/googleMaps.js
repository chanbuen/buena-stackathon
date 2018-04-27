var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBW84fl1sdxT4KFB7HdunCfWVLfw5U2cdY'
});

// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});