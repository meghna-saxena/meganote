const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
require("./models/User");
require("./services/passport");
const keys = require("./config/keys");

/* ================== Connecting to mongodb ======================= */
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

/* =================== First express app ========================= */
//Note: We can have several express applications inside single node.js project
const app = express();

/* ================= ENABLING COOKIES ============================ */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =====Express session is required for twitter oauth since it uses oauth1.0 ========= */
// A temporary secret is stored in the session to prevent cross site scripting attacks.
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla"
  })
);

// all route handlers will be registered with the app object
authRoutes(app);

// Dynamic port binding for heroku deployment. In prod. port defined on env variables by heroku, and in dev port is 5000
const PORT = process.env.PORT || 5000;

//express tells node to listen for incoming traffic on PORT
app.listen(PORT);
