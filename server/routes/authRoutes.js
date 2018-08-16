const passport = require("passport");

//setup configuration on the app object to listen to incoming req
module.exports = (app) => {
  app.get("/auth/facebook", passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  app.get("/auth/twitter", passport.authenticate("twitter", {
      scope: ["profile.id"]
    })
  );

  //the url contains the code this time, passport will take the code and convert it into profile so the access token appears on server console
  app.get("/auth/facebook/callback", passport.authenticate("facebook"));

  app.get("https://127.0.0.1:5000/auth/twitter/callback", passport.authenticate("twitter"));  


  /* ================= TESTING AUTHENTICATION =================== */
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
