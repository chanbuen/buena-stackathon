import React, {Component} from 'react'
import {connect} from 'react-redux'
import { map } from '.'
import {distance} from 'google-distance-matrix'
 
class PlacesSummary extends Component {
  constructor(props){
    super(props)
  }


  render(){
    let origins = [`${this.props.userLatitude},${this.props.userLongitude}`]
    let destinations = [`40.72095,-73.9963`]
    return(
      <div>
        {
          distance.matrix(origins, destinations, function (err, distances) {
            if (!err)
                console.log(distances);
          })
        }
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
