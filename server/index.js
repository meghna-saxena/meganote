/* ============= SERVER SIDE ARCHITECTURE ====================== */

const express = require("express");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./config/keys");
const expressSession = require("express-session");

// First express app
//Note: We can have several express applications inside single node.js project
const app = express();

//express session is required for twitter oauth since it uses oauth1.0
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));


//creates new instance of twitter/fb passport strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterAPIKey,
      consumerSecret: keys.twitterAPISecret,
      callbackURL: "http://127.0.0.1:5000/auth/twitter/callback"
    },
    (oauth_token, tokenSecret, profile, cb) => {
      console.log("twitter oauth_token",oauth_token);
      console.log("twitter tokenSecret",tokenSecret);
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
      profileFields: ['id', 'email', 'displayName', 'photos']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("facebook accessToken", accessToken);
      console.log("facebook refreshToken", refreshToken);
      console.log("facebook profile", profile);
    }
  )
);


//setup configuration on the app object to listen to incoming req
// all route handlers will be registered with the app object

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

app.get(
  "/auth/twitter",
  passport.authenticate("twitter", {
    scope: ["profile.id"]
  }));


//the url contains the code this time, passport will take the code and convert it into profile so the access token appears on server console
app.get("/auth/facebook/callback", passport.authenticate("facebook"));

app.get("http://127.0.0.1:5000/auth/twitter/callback", passport.authenticate("twitter"));


// Dynamic port binding for heroku deployment. In prod. port defined on env variables by heroku, and in dev port is 5000
const PORT = process.env.PORT || 5000;

//express tells node to listen for incoming traffic on PORT
app.listen(PORT);
