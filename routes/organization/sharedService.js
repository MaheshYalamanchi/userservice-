const invoke = require("../../lib/http/invoke")
const schedule = require("./schedule")
let orgEntery = async (params) => {
    try {
        var jsonData = {
            "orgname": params.orgname,
            "description": params.description,
            "thumbnail": params.thumbnail,
            "createdBy": params.createdBy,
            "updatedBy": params.updatedBy
        }
        var getdata = {
            database: "proctor",
            model: "org",
            docType: 0,
            query: jsonData
        };
        let responseData = await invoke.makeHttpCall("post", "write", getdata);
        if (responseData && responseData.data&&responseData.data.statusMessage._id) {
            return { success: true, message: "Record inserted sucessfull"}
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
let OrgDetails = async () => {
    try {
        var getdata = {
          database:"proctor",
          model: "org",
          docType: 1,
          query: {}
        };
        let responseData = await invoke.makeHttpCall("post", "read", getdata);
        if (responseData && responseData.data) {
            return { success: true, message: responseData.data.statusMessage }
        } else {
            return { success: false, message: 'Data Not Found' }
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
let orgEdit = async (params) => {
    try {
        var postdata = {
            database:"proctor",
            model: "org",
            docType: 0,
            query:{
                filter: {"_id": params._id },
                update:{$set: params }
            }
        };
        let responseData = await invoke.makeHttpCall("post", "update", postdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
            return { success: true, message: "Record updated sucessfully" }
        } else {
            return { success: false, message: 'Data Not Found' }
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};
let orgDelete = async (params) => {
    try {
        var getdata = {
            database:"proctor",
            model: "org",
            docType: 0,
            query:{
                "_id": params._id ,
                $set:{ isActive:params.isActive }
            }
        };
        let responseData = await invoke.makeHttpCall("post", "write", getdata);
        if (responseData && responseData.data  && responseData.data.statusMessage) {
            return { success: true, message: responseData.data.statusMessage }
        } else {
            return { success: false, message: 'Data Not Found' }
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};


module.exports = {
    orgEntery,
    OrgDetails,
    orgEdit,
    orgDelete,
}