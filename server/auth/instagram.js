const passport = require('passport')
const router = require('express').Router()
const InstagramStrategy = require('passport-instagram').Strategy
const {User} = require('../db/models')
const INSTA_CLIENT_ID = require('../../secrets').INSTA_CLIENT_ID
const INSTA_CLIENT_SECRET = require('../../secrets').INSTA_CLIENT_SECRET
const INSTA_CALLBACK = require('../../secrets').INSTA_CALLBACK
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

router.get('/', passport.authenticate('instagram'))

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
  console.log('PROFILE', profile)
  // const full
  User.findOrCreate( { where : { instagramId: profile.id } }, function (err, user) {
    return done(null, user);
  })
}))

if (!process.env.INSTA_CLIENT_ID || !process.env.INSTA_CLIENT_SECRET) {

  console.log('Instagram client ID / secret not found. Skipping Instagram OAuth.')

} 
// else {

//   const instaConfig = {
//     clientID: process.env.INSTA_CLIENT_ID || INSTA_CLIENT_ID, 
//     clientSecret: process.env.INSTA_CLIENT_SECRET || INSTA_CLIENT_SECRET,
//     callbackURL: process.env.INSTA_CALLBACK || INSTA_CALLBACK
//   }

//   console.log('INSTACONFIG', instaConfig)
//   const strategy = new InstagramStrategy(instaConfig, (token, refreshToken, profile, done) => {
//     console.log('PROFILE', profile)
//     User.findOrCreate({ instagramId: profile.id }, function (err, user) {
//       return done(null, user);
//     });

//   //   const googleId = profile.id
//   //   const name = profile.displayName
//   //   const email = profile.emails[0].value

//   //   User.find({where: {googleId}})
//   //     .then(foundUser => (foundUser
//   //       ? done(null, foundUser)
//   //       : User.create({name, email, googleId})
//   //         .then(createdUser => done(null, createdUser))
//   //     ))
//   //     .catch(done)
//   })

//   passport.use(strategy)

//   router.get('/', passport.authenticate('instagram'))

//   router.get('/verify', passport.authenticate('instagram', {
//     successRedirect: '/home',
//     failureRedirect: '/login'
//   }))

// }
