const mongoose = require("mongoose");
const config = require('config'); 

//Verify Connection
const connection = mongoose.connection;

const iformSchema =  new mongoose.Schema({
"formname": {
  "type" : String,
},
  "sections":{
    "type" : Array,
  },
  "date":{
    "type" : Date,
    "default" : Date.now
  },
});

const iformModal = mongoose.model(config.get("app.db.collections.iform"),iformSchema);

module.exports = iformModal;