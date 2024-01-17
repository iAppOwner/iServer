const mongoose = require("mongoose");
const config = require('config'); 

//Verify Connection
const connection = mongoose.connection;

const formSchema =  new mongoose.Schema({
"userid": {
  "type" : String,
},
"formname" : {
    "type" : String,
},
"iformid" : {
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

const formModal = mongoose.model(config.get("app.db.collections.form"),formSchema);

module.exports = formModal;