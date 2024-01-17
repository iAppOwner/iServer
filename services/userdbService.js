const userModal = require("../modal/userModal")
const {fields,uploads} = require("../utils/constants")

exports.addUser = async(data)=>{
    try {
        let addUser =  await userModal.insertMany(data);
        return addUser;
    }
   catch(e)
   {
    return null;
   }
}

exports.getUser = async(data)=>{
    try
    {let datas = await userModal.findOne(data);
    return datas;}
    catch(e)
    {
        return null;
    }
}

exports.delUser = async(_id)=>{
 try {
    let del = await userModal.findByIdAndDelete(_id)
    return del;
 }
 catch(e)
 {
    return null;
 }
}

exports.saveFields = async(_id,fields)=>{
    try
{
    let upDate = await userModal.findByIdAndUpdate({_id},{fields})
    return upDate;
    }
    catch(e)
    {
        return null;
    }
}

exports.saveUploads = async(_id,uploads)=>{
   try {
    let save =  await userModal.findByIdAndUpdate({_id},{uploads});
    return save;
   }
   catch(e) 
   {
    return null;
   }
}
