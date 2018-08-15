/* ============= SERVER SIDE ARCHITECTURE ====================== */

const express = require("express");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./config/keys");

// First express app
//Note: We can have several express applications inside single node.js project
const app = express();

//creates new instance of twitter/fb passport strategy
// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: keys.twitterAPIKey,
//       consumerSecret: keys.twitterAPISecret,
//       callbackURL: "/auth/twitter/callback"
//     },
//     accessToken => {
//       console.log("twitter accessToken", accessToken);
//     }
//   )
// );

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

//the url contains the code this time, passport will take the code and convert it into profile so the access token appears on server console
app.get("/auth/facebook/callback", passport.authenticate("facebook"));

// app.get(
//   "/auth/twitter",
//   passport.authenticate("twitter", {
//     scope: ["email"]
//   })
// );

// Dynamic port binding for heroku deployment. In prod. port defined on env variables by heroku, and in dev port is 5000
const PORT = process.env.PORT || 5000;

//express tells node to listen for incoming traffic on PORT
app.listen(PORT);
