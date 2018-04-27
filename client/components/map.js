import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
const GOOGLE_MAPS_API_KEY = require('../../secrets').GOOGLE_MAPS_API_KEY

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.findUrl = this.findUrl.bind(this)
  }

  mapClicked(mapProps, map, clickEvent) {
    console.log('MAP PROPS', mapProps)
    console.log('MAP', map)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow : !this.state.showingInfoWindow,
        activeMarker: {}})
    }
    // ...
  }

  onMarkerClick(props, marker, event){
    console.log('PROPS ON CLICK', props)
    console.log('MARKER', marker)

    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    })
  }
  
    findUrl(){
      this.props.posts.filter(post => {
        if(post.location.name === this.state.selectedPlace.title) {
          console.log(post.images.low_resolution.url)
          return post.images.low_resolution.url
        }
      })
    }
  

  render() {
    console.log('THIS.PROPS', this.props)
    const {posts} = this.props
    // console.log(this.props.posts[0].images.thumbnail.url)

    return (
      <Map google={this.props.google} 
        initialCenter={{
          lat: 40.7829,
          lng: -73.968285,
        }}

        onClick={this.mapClicked}
        zoom={14}>
    
        {
          posts.length ? posts.map(post => {
            return(
                <Marker key={post.id}
                  title={post.location.name}
                  name={post.location.name}
                  onClick={this.onMarkerClick}
                  position={{lat: post.location.latitude, lng: post.location.longitude}} />
            )
          })
           : null
        }

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div className="marker">
            <h2>{this.state.selectedPlace.name}</h2>
            <img src={`${this.findUrl()}`} className="infoWindow-pic"/>
          </div>
      </InfoWindow>
      
      </Map>
    );
  }
}
 

 
export default GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_API_KEY)
})(MapContainer)