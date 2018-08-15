const passport = require("passport");

//setup configuration on the app object to listen to incoming req
module.exports = (app) => {
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  //the url contains the code this time, passport will take the code and convert it into profile so the access token appears on server console
  app.get("/auth/facebook/callback", passport.authenticate("facebook"));
};
