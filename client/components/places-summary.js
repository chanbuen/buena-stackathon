import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// const GOOGLE_MAPS_API_KEY = require('../../secrets').GOOGLE_MAPS_API_KEY
 
class PlacesSummary extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    axios.get('/api/distance')
      .then(res => res.data)
      .then(console.log)
      .catch(err => console.log(`Unable to get distance ${err}`))
}
  render(){
    // const test = this.calculateDistance()
    console.log(this.props.filteredPosts)
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
    places: state.filteredPosts
  }
}

export default connect(mapToState)(PlacesSummary)
