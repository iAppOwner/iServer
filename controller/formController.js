const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {getUserForm,updateUserForm} = require("../services/formService")

// GET FORMS
exports.getForm = asyncErrorHandler(async (_request,_response,next)=>{
    _id = _request.params.id
    let form = await getUserForm({userid : _id})
    let serviceResponse = { formdata : form }
    _response.status(codes.success)
    .json(serviceResponse);
})
 
// UPDATE FORM
exports.updateForm = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let _id = body.formId;
    let sectionName = body.sectionName;
    let sectionFieldName = body.sectionFieldName;
    let sectionFieldValue = body.sectionFieldValue;
    if(!_id)
    {
        next(err)
    }
    
    let updatedValues = await updateUserForm(_id,sectionName,sectionFieldName,sectionFieldValue);
    let serviceResponse = { formdata : updatedValues }
    _response.status(codes.success)
    .json(serviceResponse);
})

// UPLOAD FILE
exports.uploadFile = asyncErrorHandler(async (_request, _response, _next) => {
    // const fileBuffer = _request.file.buffer;
    // const base64Data = fileBuffer.toString('base64');
    // const dataUrl = `data:${_request.file.mimetype};base64,${base64Data}`;
    // let body = _request.body;
    // let value = `${body.username.slice(0,-5)}/${body.filename.toUpperCase()}_${body.username.slice(0,-5).toUpperCase()}`
    // const result = await userModal.updateOne(
    //     { _id: body.username, 'fields.name': body.filename },
    //     { $set: { 'fields.$.value': value } }
    //   );
    let serviceResponse = { url: "SUCCESS" };
  
    _response.status(200).json(serviceResponse);
  });
