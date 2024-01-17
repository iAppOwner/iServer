const router = require("express").Router()
const form = require("../controller/formController")

router.route("/:id")
.get(form.getForm);

//Export Module
module.exports = router;