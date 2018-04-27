import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class InstagramProfile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="instagram-profile">
        {
          this.props.media.map((post,idx) => {
            return(
              <div className="instagram-post" key={post.id}>
              <img src={post.images.thumbnail.url} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapToState = state => {
  return {
    media: state.instagramProfile
  }
}

export default connect(mapToState)(InstagramProfile)