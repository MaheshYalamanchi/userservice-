const invoke = require("../../lib/http/invoke")
const crypto =require("crypto")
let newUserSave = async (params) => {
var buffer = crypto.randomBytes(32);
const salt = buffer.toString('base64')
var password = params.params.password
const hasspassword =crypto.createHmac("sha1", salt).update(password).digest("hex");
var locked = Boolean(params.params.locked);
var secure = Boolean(params.params.secure);
    try {
        var createdAt = new Date()
        var formData={
            "_id" : params.params.username,
            "labels" :params.params.labels,
            "exclude" : [],
            "rep" : [],
            "salt" : salt,
            "hashedPassword" : hasspassword,
            "nickname" : params.params.username,
            "group" : params.params.group,
            "lang" : params.params.lang,
            "locked" : locked,
            "secure" : secure,
            "createdAt" : createdAt,
            "similar" : [],
            "fullname":params.params.fullname,
            "role":params.params.role,
            "email":params.params.email,
            "OrgId":params.OrgId
        }
        var getdata = {
            url: process.env.MONGO_URI,
            client: "users",
            docType: 0,
            query: formData
        };
        let getData = await invoke.makeHttpCall("post", "writeData", getdata);
        if (getData) {
            return getData;
        } else {
            return "Data Not Found";
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};
let getUpdatedRecord = async (params) => {
    try {
        var postdata = {
            url: process.env.MONGO_URI,
            client: "org",
            docType: 1,
            query: [
                {
                    $match: { _id: params.id }
                }
            ]
        };
        let responseData = await invoke.makeHttpCall("post", "aggregate", postdata);
        if (responseData) {
            return responseData;
        } else {
            return "Data Not Found";
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};
let orgUserDelete = async (params) => {
    try{
        var getdata = {
            url: process.env.MONGO_URI,
            client: "users",
            docType: 1,
            query:{
                _id:params._id
            }  
        };
        let responseData = await invoke.makeHttpCall("post", "removeData", getdata);
        if(responseData){
            return responseData;
        }else{
            return "Data Not Found";
        }
    }catch(error){
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
};
module.exports = {
    newUserSave,
    getUpdatedRecord,
    orgUserDelete
}