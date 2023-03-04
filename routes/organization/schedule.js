const invoke = require("../../lib/http/invoke")
const crypto = require("crypto")
let newUserSave = async (params) => {
    var buffer = crypto.randomBytes(32);
    const salt = buffer.toString('base64')
    var Password = params.recivedData.password
    const hasspassword = crypto.createHmac("sha1", salt).update(Password).digest("hex");
    var locked = Boolean(params.locked);
    var secure = Boolean(params.secure);
    try {
        var formData = {
            "_id": params.recivedData.username,
            "labels": params.recivedData.labels,
            "exclude": [],
            "rep": [],
            "salt": salt,
            "hashedPassword": hasspassword,
            "username":params. recivedData.username,
            "nickname":params.recivedData.nickname,
            "group": params.recivedData.group,
            "lang": params.recivedData.lang,
            "locked": locked,
            "secure": secure,
            "similar": [],
            "fullname": params.recivedData.fullname,
            "role": params.recivedData.role,
            "roleId": params.recivedData.roleId,
            "email":params. recivedData.email,
            "OrgId": params.getResult._id,
            "face":"",
            "passport":"",
            "useragent":"",
            "browser":"",
            "ipaddress":"",
            "os":""
        }
        var getdata = {
            database: "proctor",
            model: "users",
            docType: 0,
            query: formData
        };
        let responseData = await invoke.makeHttpCall("post", "insert", getdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
            return { success: true, message: responseData.data.statusMessage }
        } else {
            return { success: false, message: 'Data Not inserted' }
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
    try {
        var getdata = {
            url: process.env.MONGO_URI,
            client: "users",
            docType: 1,
            query: {
                _id: params._id
            }
        };
        let responseData = await invoke.makeHttpCall("post", "removeData", getdata);
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

let OrgId = async (params) => {
    try {
        data = {
            "OrgId": params.OrgId,
            "createdBy": params.params.createdBy,
            "updatedBy": params.params.updatedBy,
            "description": params.params.description,
            "orgname": params.params.orgname,
            "thumbnail": params.params.thumbnail
        }
        var postdata = {
            database: "proctor",
            model: "users",
            docType: 0,
            query: data
        };
        let responseData = await invoke.makeHttpCall("post", "write", postdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
            return { success: true, message: responseData.data.statusMessage }
        } else {
            return { success: false, message: 'Data Not inserted' }
        }
    }
    catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};

module.exports = {
    newUserSave,
    getUpdatedRecord,
    orgUserDelete,
    OrgId
}