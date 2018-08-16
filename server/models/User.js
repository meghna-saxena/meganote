const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create schema for new collection. Schema describes the properties inside every individual record.
const userSchema = new Schema({
  facebookId: String,
  name: String,
  emails: Array
});

mongoose.model("users", userSchema);
