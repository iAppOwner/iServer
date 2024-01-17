const router = require("express").Router()
const iform = require("../controller/iformsController")

router.route("/createiForm")
.post(iform.createIform);

router.route("/updateiForm")
.put(iform.updateIform);

router.route("/")
.get(iform.getIform);

router.route("/deleteiForm")
.delete(iform.deleteIform);

//Export Module
module.exports = router;