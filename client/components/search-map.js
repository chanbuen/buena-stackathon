import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleMap, PlacesSummary} from './index'
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete'
import Geocode from 'react-geocode'
import {assignUserLat} from '../store/user-lat'
import {assignUserLng} from '../store/user-lng'
import {assignUserState} from '../store/user-state'
import {saveFilteredPosts} from '../store/user-posts-filtered'
import {saveDistances} from '../store/distances'
const GOOGLE_MAPS_API_KEY = require('../../secrets').GOOGLE_MAPS_API_KEY

class Search extends Component {
  constructor(props) {
    super(props)
    this.state ={
      lat: 0,
      lng: 0,
      address: '',
      editedAddress: false,
      searchTag: '',
      time: 0,
      editedDistance: false,
      changeView: false,
      postsBySearch: [],
      travelMode: '',
      distanceResults: {}
    }
    this.setAddress = this.setAddress.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value })
  }

  filterPosts = (event, callback, posts) => {
    let filteredPosts = posts.filter((post => {
      if (post.tags.includes(this.state.searchTag) === true) {
        return post 
      } 
    }))
    this.setState({postsBySearch: filteredPosts, changeView : true})
    console.log(filteredPosts)
    this.props.filter(filteredPosts)

    callback(filteredPosts)
  }

  getDistance = (posts) => {
    let destinations = posts.map(post => {
      return `${post.location.latitude},${post.location.longitude}`
    })
    let origins = [`${this.state.lat},${this.state.lng}`]
    let travelMode = this.props.travelMode || 'WALKING'
    console.log('DESTINATIONARR', destinations)

    axios.post('/api/distance', {origins, destinations, travelMode})
      .then(res => res.data)
      .then(data => this.props.setDist(data))
      .catch(err => console.log(`unable to get distances, ${err}`))

  }

  setAddress(event) {
    console.log(this.state.address)
    Geocode.setApiKey(GOOGLE_MAPS_API_KEY)
    Geocode.fromAddress(this.state.address)
      .then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          this.setState({ lat, lng})
          let city = this.state.address.split(',')[1]
          let state = this.state.address.split(',')[2]
          this.setState({editedAddress : true})
        },
        error => {
          console.error(`Unable to set latitude and longitude ${error}`);
        }
      );
  }

  render() {
 
    const {searchTag, time, travelMode} = this.state
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
                <div>
                  <label>Travel Mode</label>
                    <select name="travelMode" type="text" onChange={this.handleChange}>
                          <option>Select Mode</option>
                      {
                        ['WALKING','TRANSIT','DRIVING'].map((mode,idx) => {
                          return (
                            <option key={idx}>{mode}</option>
                          )
                        })
                      }
                    </select>
                  <label>Travel Time</label>
                  <div className="dropdown">                      
                      <select name="time" type="number" onChange={this.handleChange}>
                        <option>Select Minutes</option>
                        <option>{15}</option>
                        <option>{20}</option>
                        <option>{30}</option>
                      </select>
                  </div>
                  {
                    searchTag.length && Number(time) > 0 && travelMode.length
                    ? 
                    <button onClick={(e) => this.filterPosts(e, this.getDistance, this.props.instaPosts)}>Submit Search</button>
                    : null
                  }
                </div>
                <PlacesSummary time={this.state.time}/>
            </div>
              <GoogleMap travelMode={this.state.travelMode} add={this.state.address} latitude={this.state.lat} longitude={this.state.lng} posts={this.state.changeView === true && this.state.postsBySearch.length ? this.state.postsBySearch : this.props.instaPosts }/>
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
    },
    setDist(distances){
      dispatch(saveDistances(distances))
    }
  }
}

export default connect(mapToState, mapToDispatch)(Search)