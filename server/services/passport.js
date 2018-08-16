const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

//creates new instance of twitter/fb passport strategy
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

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "email", "displayName", "photos"]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("facebook accessToken", accessToken);
      console.log("facebook refreshToken", refreshToken);
      console.log("facebook profile", profile);
    }
  )
);
