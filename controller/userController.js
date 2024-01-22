const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {add,view,get,del} = require('../services/awsService')
const {addUser,delUser,getUser} = require("../services/userdbService")
const {mailer} = require("../utils/mailer")
const config = require('config');
const { gtoken, vtoken } = require("../services/jwtService")
const { genpass } = require("../utils/otp")
const {hashPassword} = require("../utils/bcryptPass")
const userModal = require("../modal/userModal")
const {addAuthUser, getAuthUser, deleteAuthUser} = require('../services/loginService')
const {encryptMessage,decryptMessage} = require('../services/crypto')
const {addUserForm,deleteUserForm,getUserForm,getFields} = require('../services/formService')
const {getiForm} = require("../services/iformServices")

//ADD USER
const appname = config.get("app.name");
const phone = config.get("app.phone");

exports.adduser = asyncErrorHandler(async (_request,_response,next)=>{
    let mail = _request.body.mailid.trim();
    let name = _request.body.name.trim();
    let iformid = _request.body.iform.trim();
    let otp = genpass(10)
    let password = await hashPassword(otp)
    let serviceResponse = { 
        status : false
    }; 

    if((!name&&!mail))
    {
next(err)
    }

    const datas = await view();
    let userLogin = await getAuthUser(mail)
    if(!userLogin)
    {
        let data = {name,mail,iformid}
        await addUser(data)
        let userData = await getUser({mail})
        let userid = userData._id;
        let dataauth = {mail,role: 'user',password,userid,name}
        let iform = await getiForm({_id : iformid})
        await addAuthUser(dataauth)
            await add(`${userid}/`)
            let formData = {
                userid,
                iformid : iform.id,
                formname : iform.formname,
                sections : iform.sections
            } 
            await addUserForm(formData)
        serviceResponse = {
           status : userData._id
       };
       let datas = `Dear ${name.toUpperCase()},<br/> <br/>I hope this message finds you well.<br/><br/>
       As part of our ongoing process, we kindly request that you upload the necessary documents by clicking the link
       <br/><br/>
       <div style="padding : '3px'; border : '1px';">
        <strong>Email: </strong> ${mail}<br/>
        <strong>Password:</strong> <i><code style="color : 'green'">${otp}</code></i>
        </div>
       <br/>
       <a href=${config.get("app.ui.link")+'/login'}>Click here</a> to login and upload your documents. For loging use the above unique credentials.<br/>
       <br/>If you encounter any issues or have any questions regarding the document upload process, please feel free to reach out to ${phone} for assistance.
       <br/><br/>Thanks & Regards<br/>iDocs Team.`
       let sub = `${appname} - Documents Upload`
       mailer(mail,sub,datas)
    }
    _response.status(codes.success)
    .json(serviceResponse);
    })

// GET ALL USERS
exports.getallusers = asyncErrorHandler(async (_request,_response,next)=>{
    let serviceResponse = {
        datas : await view()
    };
    _response.status(codes.success)
    .json(serviceResponse);
})

//DELETE USERS
exports.deleteuser = asyncErrorHandler(async (_request,_response,next)=>{
    let mail = _request.body.mailid.trim().toLowerCase();

    if(!mail)
    {
        next(err)
    }
    let userData = await getUser({mail})
    let _id = userData._id;
    let  serviceResponse = {status : false};
    await del(`${_id}/`)
    let delUsr = await delUser(_id)
    let delAuth = await deleteAuthUser(userData.mail)
    let delForm = await deleteUserForm({userid : _id})
    if(!(!delUsr && !delAuth && !delForm ))
    {
     serviceResponse = {status : true};
    }
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET ALL USERS
exports.getuser = asyncErrorHandler(async (_request,_response,next)=>{
    let username = _request.body.username.trim().toLowerCase();
    if(!username)
    {
        next(err)
    }
    let serviceResponse = {
        datas : await getUser(username)
    };
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET ALL USERS
exports.accessuser = asyncErrorHandler(async (_request, _response, _next) => {
    let body = _request.body;
    let value = `${body.username.slice(0,-5)}/${body.filename.toUpperCase()}_${body.username.slice(0,-5).toUpperCase()}`
    const result = await userModal.updateOne(
        { _id: body.username, 'fields.name': body.filename },
        { $set: { 'fields.$.value': value } }
      );
    let serviceResponse = { url: result };
  
    _response.status(200).json(serviceResponse);
  });

// GET UPLOADES
exports.upload = asyncErrorHandler(async (_request,_response,next)=>{
    const fileBuffer = req.file.buffer;
    const base64Data = fileBuffer.toString('base64');
    const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`;
    let serviceResponse = { url: dataUrl }
    _response.status(codes.success)
    .json(serviceResponse);
})

exports.dashboard = asyncErrorHandler(async (_request,_response,next)=>{
    let _id = _request.params.id
    let formFields = await getFields(_id)
    const values = formFields.map(field => field.value);
    const status = formFields.map(field => field.status);
    const statusData = status.filter(value => value !== undefined);
    const statusLength = statusData.length;
    const approved = statusData.filter(value => value.toLowerCase().includes('approved')).length;
    const nonApproved = statusLength-approved;
    const totalLength = values.filter(value => value !== undefined).length;
    const empty = values.filter(value => value == '').length
    const nonEmpty = totalLength - empty;
    let dataSource = formFields.map((v)=>{
        let name =v.name;
        let value = v.value;
        let status = v.status == 'upending' ?"Pending With You" : v.status == 'apending' ? "Pending With Admin" : v.status == 'approved' ? 'Approved' : 'Rejected';
        let comments = v.comments;
        return {name,value,status,comments}
    });
    dataSource = dataSource.filter((obj)=>{
        return obj.value !== undefined
    })

    let serviceResponse = {
        totalLength, empty, nonEmpty, statusLength, approved, nonApproved, dataSource, formFields
    } 
    _response.status(codes.success)
    .json(serviceResponse);
})