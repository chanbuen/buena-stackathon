import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GoogleMap} from './index'
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete'
import Geocode from 'react-geocode'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state ={
      lat: 0,
      lng: 0,
      address: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value })
    console.log(this.state.addressLine1)
  }

  setAddress = event => {
    console.log(this.state.address)
    Geocode.setApiKey('AIzaSyDzu32kGFKuqie0TZTPpOC9T79UQTndxh4')
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({ lat, lng})
        console.log(this.state.lat, this.state.lng)
      },
      error => {
        console.error(error);
      }
    );
    
  }

  render() {
    return(
      <div className="address-search-bar">

        <PlacesAutocomplete
          value={this.state.address}
          onChange={address => this.setState({ address })}
        >
        {
        ({ getInputProps, getSuggestionItemProps, suggestions }) => (
          <div className="autocomplete-root">
            <input {...getInputProps()} />
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
        <button onClick={this.setAddress}></button>
        <GoogleMap userLat={this.state.lat} userLng={this.state.lng} posts={this.props.instaPosts}/>
         
      </div>
    
    )
  }
}

const mapToState = state => {
  return {
    instaPosts: state.instagramProfile
  }
}

export default connect(mapToState)(Search)