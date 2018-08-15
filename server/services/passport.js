const passport = require("passport");
// const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

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
      console.log("facebook accessToken", accessToken);
      console.log("facebook refreshToken", refreshToken);
      console.log("facebook profile", profile);
    }
  )
);
