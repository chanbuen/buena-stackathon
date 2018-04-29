import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleMap} from './index'
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete'
import Geocode from 'react-geocode'
import {assignUserLat} from '../store/user-lat'
import {assignUserLng} from '../store/user-lng'
import {assignUserState} from '../store/user-state'
import {saveFilteredPosts} from '../store/user-posts-filtered'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state ={
      lat: 0,
      lng: 0,
      address: '',
      editedAddress: false,
      searchTag: '',
      distance: 0,
      editedDistance: false,
      changeView: false,
      postsBySearch: [],
    }
    this.setAddress = this.setAddress.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value })
  }

  filterPosts = (event, callback) => {
    let filteredPosts = this.props.instaPosts.filter((post => {
      if (post.tags.includes(this.state.searchTag) === true) {
        return post 
      } 
    }))
    this.setState({postsBySearch: filteredPosts, changeView : true})
    console.log(this.filteredPosts)
    this.props.filter(this.state.postsBySearch)

    callback()
  }

  getDistance = () => {

    let distanceMatrixServ = new this.props.google.maps.DistanceMatrixService()
    distanceMatrixServ.getDistanceMatrix({
      origins: ['40.785091,‎-73.968285'],
      destinations: ['41.8337329,-87.7321554'],
      travelMode: this.props.google.maps.TravelMode.WALKING,
      unitSystem: this.props.google.maps.UnitSystem.METRIC
    }, function(res, status) {
      if (status!=this.props.google.maps.DistanceMatrixService.OK){
        console.log('Distance Service Error: ' + status)
      } else {
        console.log(res)
      }
    })
    // console.log(this.state.distance)
    // console.log(this.props.userLatitude)
    // console.log(this.props.userLongitude)
    //   axios.post('/api/distance')
    //   .then(console.log)
    //   .catch(err => console.log(`can't get distance ${err}`))
  }

  setAddress(event) {
    console.log(this.state.address)
    Geocode.setApiKey('AIzaSyDzu32kGFKuqie0TZTPpOC9T79UQTndxh4')
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        // this.setState({ lat, lng})
        let city = this.state.address.split(',')[1]
        let state = this.state.address.split(',')[2]
        let combined = city+','+state
        this.props.setCoordinates(lat, lng, combined)
        console.log(this.state.lat, this.state.lng)
        this.setState({editedAddress : true})
      },
      error => {
        console.error(error);
      }
    );
    
  }

  render() {
    console.log('DISTANCE',this.state.distance)
    return(
      <div className="address-search-bar">
        {
          !this.state.editedAddress
          ? 
          <div>
            <label>Enter Your Starting Point</label>
            <PlacesAutocomplete
                value={this.state.address}
                onChange={address => this.setState({ address })}
              >
              {
              ({ getInputProps, getSuggestionItemProps, suggestions }) => (
                <div className="autocomplete-root">
                  <input placeholder="search address" {...getInputProps()} />
                  <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => (
                      <div {...getSuggestionItemProps(suggestion)}>
                        <span>{suggestion.description}</span>
                      </div>  
                    ))}
                  </div>
                </div>
              )
              }
              </PlacesAutocomplete>
              <button onClick={this.setAddress}>Submit</button>
            </div>
            :
            <div className="map-search-result"> 
              <div className="map-search-sidebar">
              <label>{`START`}</label>
              <label>{`${this.state.address.split(',')[0]}`}</label>
                <button onClick={() => this.setState({editedAddress : !this.state.editedAddress})}>Change Starting Point</button>
                <label>Search by Tag</label>
                <input type="text" name="searchTag" placeholder="nyceats" value={this.state.searchTag} onChange={this.handleChange}/>
                {
                  this.state.searchTag.length 
                  ? <div>
                      <label>Search by Distance</label>
                      <div className="dropdown">                      
                          <select name="distance" type="number" onChange={this.handleChange}>
                            <option>{100}</option>
                            <option>{200}</option>
                            <option>{500}</option>
                          </select>
                      </div>
                      {
                        Number(this.state.distance) > 0
                        ? <button onClick={(event) => this.filterPosts(event, this.getDistance)}>Submit Search</button>
                        : null
                      }
                    </div>
                  : null
                }
              </div>
              <GoogleMap latitude={this.props.userLatitude} longitude={this.props.userLongitude} posts={this.state.changeView === false ? this.props.instaPosts : this.state.postsBySearch}/>
            </div>
          }

      </div>
    
    )
  }
}

const mapToState = state => {
  return {
    instaPosts: state.instagramProfile,
    userLatitude: state.userLat,
    userLongitude: state.userLng,

  }
}

const mapToDispatch = dispatch => {
  return {
    setCoordinates(lat, lng, add) {
      dispatch(assignUserLat(lat))
      dispatch(assignUserLng(lng))
      dispatch(assignUserState(add))
    },
    filter(posts){
      dispatch(saveFilteredPosts(posts))
    }
  }
}

export default connect(mapToState, mapToDispatch)(Search)