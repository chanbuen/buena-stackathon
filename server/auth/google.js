const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done)
})

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/verify',
  passport.authenticate('google', {
    // successRedirect: '/', // or wherever
    failureRedirect: '/login' // or wherever
  }), (req, res) => {
    req.redirect('/')
  }
);

const googleConfig = {
      clientID: process.env.GOOGLE_CLIENT_ID || '583129700749-l00ricq5e8csubc1etl631gmg8j9evg3.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '8QjdX_VEfloAdvsKIUt1gL-R',
      callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:8080/auth/google/verify'
    }

passport.use(new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  User.find({where: {googleId}})
    .then(foundUser => (foundUser
      ? done(null, foundUser)
      : User.create({name, email, googleId})
        .then(createdUser => done(null, createdUser))
    ))
    .catch(done)
}))

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

//   console.log('Google client ID / secret not found. Skipping Google OAuth.')

// } else {

//   const googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID || '583129700749-l00ricq5e8csubc1etl631gmg8j9evg3.apps.googleusercontent.com',
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '8QjdX_VEfloAdvsKIUt1gL-R',
//     callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:8080/auth/google/verify'
//   }

//   const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
//     const googleId = profile.id
//     const name = profile.displayName
//     const email = profile.emails[0].value

//     User.find({where: {googleId}})
//       .then(foundUser => (foundUser
//         ? done(null, foundUser)
//         : User.create({name, email, googleId})
//           .then(createdUser => done(null, createdUser))
//       ))
//       .catch(done)
//   })

//   passport.use(strategy)

//   router.get('/', passport.authenticate('google', {scope: 'email'}))

//   router.get('/verify', passport.authenticate('google', {
//     successRedirect: '/home',
//     failureRedirect: '/login'
//   }))

// }
