import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
 
class PlacesSummary extends Component {
  constructor(props){
    super(props)
  }

  
// calculateDistance(){
//   // let origins = [`${this.props.userLatitude},${this.props.userLongitude}`]
//   let origin = '40.7084,74.0087'
//   let destination = `40.72095,-73.9963`
//   axios.get('/api/distance')
//     .then(res => res.data)
//     .then(console.log)
//     .catch(err => console.log(`Unable to get distance ${err}`))
//     googleMapsClient.directions({
//       origin: origins,
//       destination: destinations,
//       mode: 'driving'
//     }, function(err, data) {
//       if (err) {
//         console.error(err)
//       } else {
//         console.log(data)
//       }
//     })
  // geolib.getDistance(
  //   {latitude : 40.7084, longitude : 74.0087},
  //   {latitude : 40.72095, longitude : -73.9963}
  // )

// }
  render(){
    // const test = this.calculateDistance()
    return(
      <div>
        
      </div>
    )
  }
}

const mapToState = state => {
  return {
    userLatitude: state.userLat,
    userLongitude: state.userLng,
  }
}

export default connect(mapToState)(PlacesSummary)
