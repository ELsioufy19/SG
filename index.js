import mongoose from 'mongoose';
import passport from 'passport'
import session from 'express-session'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';import User from "./DB/models/user.model.js"; // Assuming you're using the same User model
import connectDB from "./DB/conection.js";
// import appRouter from "./src/modules/app.router.js";
import express  from 'express'
// import setupRoutes from './modules/app.router.js';
import appRouter from "./src/modules/app.router.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
// setupRoutes(app); 
const port = process.env.PORT
app.use(express.json());
appRouter(app)
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
////////////////////////////////////////////////
// module.exports = app;



// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup (stores user info in session)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user based on Google profile
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = new User({
    username: profile.displayName,
    googleId: profile.id,
    email: profile.emails[0].value,
    profilePicture: profile.photos[0].value
  });

  await newUser.save();
  done(null, newUser);
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user based on Facebook profile
  const existingUser = await User.findOne({ facebookId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = new User({
    username: profile.displayName,
    facebookId: profile.id,
    email: profile.emails ? profile.emails[0].value : '',
    profilePicture: profile.photos ? profile.photos[0].value : ''
  });

  await newUser.save();
  done(null, newUser);
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the OAuth Demo');
});

// Google login route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

// Facebook login route
app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

// Facebook OAuth callback route
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

// Protected route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  res.json({
    message: 'Profile',
    user: req.user
  });
});




