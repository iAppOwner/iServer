const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {getUserForm} = require("../services/formService")

// GET iFORMS
exports.getForm = asyncErrorHandler(async (_request,_response,next)=>{
    _id = _request.params.id
    let form = await getUserForm({userid : _id})
    let serviceResponse = { formdata : form }
    _response.status(codes.success)
    .json(serviceResponse);
})