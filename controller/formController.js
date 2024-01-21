const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {getUserForm,updateUserForm} = require("../services/formService")
const {delFile} = require('../services/awsService')

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
    console.log({
        _id,sectionName,sectionFieldName,sectionFieldValue
    })
    let updatedValues = await updateUserForm(_id,sectionName,sectionFieldName,sectionFieldValue);
    let serviceResponse = { formdata : updatedValues }
    _response.status(codes.success)
    .json(serviceResponse);
})

// DELETE FILE
exports.deketeFile = asyncErrorHandler(async (_request, _response, _next) => {
    let body = _request.body;
    let _id = body.formId;
    let sectionName = body.sectionName;
    let sectionFieldName = body.sectionFieldName;
    let sectionFieldValue = body.sectionFieldValue;
    if(!_id)
    {
        next(err)
    }
    await delFile(sectionFieldValue)
    let updatedValues = await updateUserForm(_id,sectionName,sectionFieldName,'');
    let serviceResponse = { formdata : updatedValues }
    _response.status(200).json(serviceResponse);
  });
