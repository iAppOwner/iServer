const authModal = require(".././modal/authModal")

exports.addAuthUser = async(dataauth) => {
   try {
    await authModal.insertMany(dataauth)
    return true;
   }
   catch(e)
{
    return null;
}
}

exports.getAuthUser = async(mail) => {
    try {
     let authData = await authModal.findOne({mail})
     return authData;
    }
    catch(e)
 {
     return null;
 }
 }

 exports.deleteAuthUser = async(mail) => {
    try {
     let authData = await authModal.deleteOne({mail})
     return authData;
    }
    catch(e)
 {
     return null;
 }
 }

 exports.updateSession = async(mail,data)=>{
    try {
     let userSession =  await authModal.updateOne({mail},{$set : {session : true}});
     return userSession;
    }
    catch(e) 
    {
     return null;
    }
 }
 