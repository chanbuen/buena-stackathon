import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
 
class PlacesSummary extends Component {
  constructor(props){
    super(props)
  }

  render(){
      const {places, distances, time} = this.props

    return(
      <div className="places">
        <ul>
        {
          distances && distances.length && (places.length === distances[0].elements.length)
          ? places.map((place, idx) => {
              if (Number((distances[0].elements[idx].duration.value)/60) <= Number(time)) {
                return (
                  <li key={idx}>{place.location.name}
                    <ul>
                      <li>{distances[0].elements[idx].distance.text}</li>
                      <li>{distances[0].elements[idx].duration.text}</li>
                    </ul>
                  </li>
                )
              }
          })
          : null
        }
        </ul>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    userLatitude: state.userLat,
    userLongitude: state.userLng,
    places: state.filteredPosts,
    distances: state.distances  
  }
}

export default connect(mapToState)(PlacesSummary)
