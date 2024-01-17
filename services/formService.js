const formModal = require(".././modal/formModal")

//ADD USER FORM
exports.addUserForm = async(formdata) => {
   try {
    await formModal.insertMany(formdata)
    return true;
   }
   catch(e)
{
    return null;
}
}

//DELETE USER FORM 
exports.deleteUserForm = async(formdata) => {
    try {
     await formModal.deleteMany(formdata)
     return true;
    }
    catch(e)
 {
     return null;
 }
 }

 //GET USER FORM 
exports.getUserForm = async(formdata) => {
    try {
     let data = await formModal.findOne(formdata)
     return data;
    }
    catch(e)
 {
     return null;
 }
 }