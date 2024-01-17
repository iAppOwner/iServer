const mongoose = require("mongoose");
const config = require('config'); 

//Verify Connection
const connection = mongoose.connection;

connection.on("connected",()=>{
console.log("USER MODAL CONNECTED")
  });

connection.on("error",()=>{
console.log("PRODUCT MODAL CONNECTION ERROR")
});

const userSchema =  new mongoose.Schema({
  "role": {
    "type" : String,
    "default" : "user"
  },
"name": {
  "type" : String,
},
"mail": {
    "type" : String,
  },
  "iformid" : {
    "type" : String,
  },
  "status":{
    "type" : String,
    "default" : "initiated"
  },
  "date":{
    "type" : Date,
    "default" : Date.now
  },
});

const userModal = mongoose.model(config.get("app.db.collections.users"),userSchema);

module.exports = userModal;
