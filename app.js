//Package Decleration
const express = require("express");
const app = express();
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const adminRouter = require('./router/adminRoute')
const saverRoute = require("./router/saveRoute")
const iformRoute = require("./router/iformRouter")
const formRoute = require("./router/formRouter")
const dotenv = require("dotenv");
const db_connection = require("./db_connection/connection")
const {awsConfig} = require('./utils/aws')
const cors = require('cors')
const session = require('express-session');

//Defiened Middleware
app.use(express.json())
app.use(cors())
app.use(
    session({
      secret: 'iUsersession@508', // Change this to a secure secret
      resave: false,
      saveUninitialized: true,
    })
  );

//Environment Config
dotenv.config()
awsConfig()

//Custome Functions for DB Connection
db_connection()

//Router Middleware
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/admin",adminRouter)
app.use("/save",saverRoute)
app.use("/iform",iformRoute)
app.use("/form",formRoute)

//Export Module
module.exports = app;