const iformModal = require("../modal/iformModal")

// ADD iFORM
exports.addiForm = async(iformdata) => {
    try {
     await iformModal.insertMany(iformdata)
     return true;
    }
    catch(e)
 {
     return null;
 }
 }

 // GET iFORM
 exports.getiForm = async(data)=>{
    try
    {
        let datas = await iformModal.findOne(data);
    return datas;
}
    catch(e)
    {
        return null;
    }
}

 // GET ALL iFORMS

 // DELETE iFORM

 // UPDATE iFORM