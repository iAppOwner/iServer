const codes = require("./resonsecode")

module.exports = (func)=>{
  return (req,res,next)=>{
    func(req,res,next).catch(err => {
        res.status(codes.notfond)
        .json({
            "msg" : "Server Error",
            "Error" : err
        })
      })
  }
}