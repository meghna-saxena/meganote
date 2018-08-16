const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//requiring mongoose model in this file
//User is model class
const User = mongoose.model("users");

//creates new instance of twitter/fb passport strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "email", "displayName", "photos"]
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ facebookId: profile.id, name: profile.displayName, emails: profile.emails }).save();
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterAPIKey,
      consumerSecret: keys.twitterAPISecret,
      callbackURL: "http://127.0.0.1:5000/auth/twitter/callback"
    },
    (oauth_token, tokenSecret, profile, cb) => {
      console.log("twitter oauth_token", oauth_token);
      console.log("twitter tokenSecret", tokenSecret);
      console.log("twitter profile", profile);
    }
  )
);
