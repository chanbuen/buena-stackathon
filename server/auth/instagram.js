const passport = require('passport')
const router = require('express').Router()
const InstagramStrategy = require('passport-instagram').Strategy
const {User} = require('../db/models')
const INSTA_CLIENT_ID = require('../../secrets').INSTA_CLIENT_ID
const INSTA_CLIENT_SECRET = require('../../secrets').INSTA_CLIENT_SECRET
const INSTA_CALLBACK = require('../../secrets').INSTA_CALLBACK
const axios = require('axios')


module.exports = router


console.log('INSTA_CLIENT_ID', INSTA_CLIENT_ID)
console.log('INSTA_CLIENT_SECRET', INSTA_CLIENT_SECRET)
console.log('INSTA_CLIENT_CALLBACK', INSTA_CALLBACK)


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done)
})

router.get('/', passport.authenticate('instagram') )

router.get('/verify', passport.authenticate('instagram', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))

const instaConfig = {
  clientID: process.env.INSTA_CLIENT_ID || INSTA_CLIENT_ID, 
  clientSecret: process.env.INSTA_CLIENT_SECRET || INSTA_CLIENT_SECRET,
  callbackURL: process.env.INSTA_CALLBACK || INSTA_CALLBACK
}

passport.use(new InstagramStrategy(instaConfig, (token, refreshToken, profile, done) => {
  
  axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`, (req, res) => {

  })
  
  const info = {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    instagramDisplayName: profile.displayName,
    instagramId: profile.id,
    instagramProfilePicture: profile._json.data.profile_picture,
    instagramMedia: `https://api.instagram.com/v1/users/${profile.id}/media/recent/?access_token=${token}`
  }

  User.findOrCreate( { where : { instagramId: profile.id } , defaults : info } ) 
    .then(([user, boolean]) => {
      done(null, user)
    })
}))

if (!process.env.INSTA_CLIENT_ID || !process.env.INSTA_CLIENT_SECRET) {

  console.log('Instagram client ID / secret not found. Skipping Instagram OAuth.')

} 
