const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {form} = require("../utils/constants")
const {addiForm} = require("../services/iformServices")

// CREATE iFORMS
exports.createIform = asyncErrorHandler(async (_request,_response,next)=>{
    let data = {
         formname : form.formname,
         sections : form.sections 
    }
    let status = await addiForm(data);
    let serviceResponse = { status }
    _response.status(codes.success)
    .json(serviceResponse);
}) 

// DELETE iFORMS
exports.deleteIform = asyncErrorHandler(async (_request,_response,next)=>{
    let serviceResponse = { "Status": "iForm Deleted" }
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET iFORMS
exports.getIform = asyncErrorHandler(async (_request,_response,next)=>{
    let serviceResponse = { "Status": "Get iFORMS" }
    _response.status(codes.success)
    .json(serviceResponse);
})

// UPDATE iFORMS
exports.updateIform = asyncErrorHandler(async (_request,_response,next)=>{
    let serviceResponse = { "Status": "Update iFORMS" }
    _response.status(codes.success)
    .json(serviceResponse);
})