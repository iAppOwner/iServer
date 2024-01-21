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

 
 // UPDATE FORM
 exports.updateUserForm = async(_id,sectionName,sectionFieldName,sectionFieldValue)=>{
    try
    {
        let datas = await formModal.findByIdAndUpdate(
            _id,
            {
              $set: {
                ['sections.' + sectionName + '.fields.' + sectionFieldName + '.value']: sectionFieldValue
              }
            },
            { new: true }
          );
          
    return datas;
}
    catch(e)
    {
        return null;
    }
}

 // UPDATE FORM
 exports.getFields = async(userid)=>{
    try
    {
        const projection = {
            'sections.fields': 1,
            '_id': 0,
          };
          
          console.log('Form fields for userid:', projection);
          // Find documents with the specified userid and projection
          let result = await formModal.find({userid},projection);
          
          // Output the result
           result = result.map((obj)=>
          {
            return obj.sections.flat().map(fields=>{
                return fields
            })
          })
          result = result[0]
          result = result.map(r=>{
            return r.fields
          })
          return result.flat();          
}
    catch(e)
    {
        return null;
    }
}
