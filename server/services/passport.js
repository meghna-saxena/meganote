const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//requiring mongoose model in this file
//User is model class
const User = mongoose.model("users");

/* ======================== ENCODING USERS ============================ */
// user -> model instance from the database

// serializeUser takes user instance add some unique identifier to set cookie for future followup req
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser converts the unique token inside the cookie back to user instance so that the records can be accessed
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//creates new instance of twitter/fb passport strategy
/* ================ FACEBOOK STRATEGY ============================== */
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "email", "displayName", "photos"]
    },
    (accessToken, refreshToken, profile, done) => {
      //Mongoose queries
      User.findOne({ facebookId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          //creating model instance/record
          new User({
            facebookId: profile.id,
            name: profile.displayName,
            emails: profile.emails
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

/* ================ TWITTER STRATEGY ============================== */
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
