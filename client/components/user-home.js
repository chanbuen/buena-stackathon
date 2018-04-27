import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import InstagramProfile from './insta-profile'
import {requestProfile} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {user, getProfile} = this.props
    getProfile(user.instagramMedia)
    
  }

    render() {
      const {user, profile} = this.props
      return (
        <div className="user-home">
          <h3>Welcome, {user.instagramDisplayName}</h3>
          {
            profile.length 
            ? <InstagramProfile />
            : null
          }
        </div>
      )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    profile: state.instagramProfile
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProfile(profileLink) {
      dispatch(requestProfile(profileLink))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
  // getProfile: PropTypes.func.isRequired
}
