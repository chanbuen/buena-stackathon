import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleMap} from './index'
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete'
import Geocode from 'react-geocode'
import {assignUserLat} from '../store/user-lat'
import {assignUserLng} from '../store/user-lng'

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
    }
    this.setAddress = this.setAddress.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value })
  }

  filterPosts = event => {

  }

  calculateDistance(){
    
  }

  setAddress(event) {
    console.log(this.state.address)
    Geocode.setApiKey('AIzaSyDzu32kGFKuqie0TZTPpOC9T79UQTndxh4')
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        // this.setState({ lat, lng})
        this.props.setCoordinates(lat, lng)
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
                        ? <button type="submit" onSubmit={this.calculateDistance}>Submit Search</button>
                        : null
                      }
                    </div>
                  : null
                }
              </div>
              <GoogleMap posts={this.props.instaPosts}/>
            </div>
          }

      </div>
    
    )
  }
}

const mapToState = state => {
  return {
    instaPosts: state.instagramProfile
  }
}

const mapToDispatch = dispatch => {
  return {
    setCoordinates(lat, lng) {
      dispatch(assignUserLat(lat))
      dispatch(assignUserLng(lng))
    }
  }
}

export default connect(mapToState, mapToDispatch)(Search)