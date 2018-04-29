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
      lat: 0,
      lng: 0,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.findUrl = this.findUrl.bind(this)

  }

  mapClicked(mapProps, map, clickEvent) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow : !this.state.showingInfoWindow,
        activeMarker: {}})
    }

  }

  getDistance = () => {

    let distanceMatrixServ = new this.props.google.maps.DistanceMatrixService()
    distanceMatrixServ.getDistanceMatrix({
      origins: ['41.8337329,-87.7321554'],
      destinations: ['41.8337329,-87.7321554'],
      travelMode: 'WALKING',
    }, function(res, status) {
      console.log('RES', res)
      }
    )
  }

  onMarkerClick(props, marker, event){
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    })
  }

    findUrl(){
      this.props.posts.filter(post => {
        if(post.location.name === this.state.selectedPlace.title) {
          return post.images.low_resolution.url
        }
      })
    }
  

  render() {
    console.log('THIS.PROPS', this.props)
    console.log(this.getDistance())
    const {posts} = this.props
    return (
      <Map google={this.props.google} 
        initialCenter={{
          lat: Number(this.props.latitude),
          lng: Number(this.props.longitude),
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