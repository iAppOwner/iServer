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