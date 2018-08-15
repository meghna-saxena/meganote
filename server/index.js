const express = require("express");
require("./services/passport");
const authRoutes = require('./routes/authRoutes');

// First express app
//Note: We can have several express applications inside single node.js project
const app = express();

// all route handlers will be registered with the app object
authRoutes(app);

// Dynamic port binding for heroku deployment. In prod. port defined on env variables by heroku, and in dev port is 5000
const PORT = process.env.PORT || 5000;

//express tells node to listen for incoming traffic on PORT
app.listen(PORT);
