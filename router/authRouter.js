const router = require("express").Router()
const login = require("../controller/auth/loginController")

router.route("/login")
.post(login.login);

//Export Module
module.exports = router;