const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
const {comparePassword} = require("../../utils/bcryptPass")
const {getAuthUser, updateSession} = require("../../services/loginService")

// GET LOGIN
exports.login = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let mail = body.mail;
    let otp =  body.otp;

    if(!mail && !otp)
    {next(err)}
   
    let serviceResponse = {msg : "Loggedin"};
    let datas = await getAuthUser(mail);
    // session['userid'] = datas.userid
    // console.log(_request.sessionID)
//     if(!datas.session)
// {   
     if(datas)
    {
        let logins = await comparePassword(otp,datas.password)
       if(logins)
       {
        serviceResponse.un = datas.userid;
        serviceResponse.role = datas.role;
        serviceResponse.mail = datas.mail;

        let mail = datas.mail;
        await updateSession(mail)
       }
       else
       {
     serviceResponse = {msg : "Invalid Password"};
       }
    }
    else
    {
        serviceResponse = {msg : "Account not found..."};
    }
// }
//     else
//     {
//         serviceResponse = {msg : "Active session found..."};
//     }
    
    _response.status(codes.success)
    .json(serviceResponse);
})

//GET LOGOUT
exports.logout = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let _id = body.uid;
    if(!_id)
    {
        next(err)
    } 
    await updateSession(datas._id,{session : false})
    serviceResponse = {msg : "Logged Out Successfully..."};

    _response.status(codes.success)
    .json(serviceResponse);
})