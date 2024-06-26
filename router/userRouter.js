const router = require("express").Router()
const user = require("../controller/userController")
const multer = require('multer')
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const {BUCKET,awsConfig} = require('../utils/aws')
const path = require('path')

awsConfig()
const s3 = new aws.S3();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//       console.log(req.params.filename)
//       console.log(req.body.username)
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: "public-read",
//         bucket: BUCKET,
//         key: function (req, file, cb) {
//             console.log("DATAS",req.body.username);
//             cb(null, `${req.body.username.slice(0,-5)}/${file.originalname=req.body.filename.toUpperCase()+"_"+req.body.username.toUpperCase().slice(0,-5)}.${path.extname(file.originalname)}`)
//         }
//     })
// })

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log("DATAS", req.body.username);
            
            // Use path.basename to get the original filename without extension
            const originalnameWithoutExtension = path.basename(file.originalname, path.extname(file.originalname));

            // Construct the key using username, filename, and original filename without extension
            const key = `${req.body.username.slice(0, -5)}/${req.body.filename.toUpperCase()}_${req.body.username.toUpperCase().slice(0, -5)}_${originalnameWithoutExtension.toUpperCase()}${path.extname(file.originalname)}`;

            cb(null, key);
        }
    })
});

router.route("/adduser/")
.post(user.adduser);

router.route("/getallusers")
.get(user.getallusers);

router.route("/dashboard/:id")
.get(user.dashboard);

router.route("/get")
.post(user.getuser);

router.route("/deleteuser/:username") 
.delete(user.deleteuser);

router.route("/access")
.post(upload.single('file'),user.accessuser);



//Export Module
module.exports = router;