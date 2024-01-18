const router = require("express").Router()
const form = require("../controller/formController")
const multer = require('multer')
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const {BUCKET,awsConfig} = require('../utils/aws')
const path = require('path')

awsConfig()
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log("DATAS", req.body.userid);
            
            // Use path.basename to get the original filename without extension
            const originalnameWithoutExtension = path.basename(file.originalname, path.extname(file.originalname));

            // Construct the key using username, filename, and original filename without extension
            const key = `${req.body.userid}/${req.body.filename.toUpperCase()}${path.extname(file.originalname)}`;

            cb(null, key);
        }
    })
});

router.route("/:id")
.get(form.getForm);

router.route("/update")
.put(form.updateForm);

router.route("/upload")
.put(upload.single('file'),form.uploadFile);

//Export Module
module.exports = router;