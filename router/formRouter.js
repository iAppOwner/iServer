const router = require("express").Router()
const form = require("../controller/formController")

router.route("/:id")
.get(form.getForm);

router.route("/update")
.put(form.updateForm);

//Export Module
module.exports = router;