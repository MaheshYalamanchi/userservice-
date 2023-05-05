const invoke = require("../../lib/http/invoke")
const schedule = require("./schedule")
let orgEntery = async (params) => {
    try {
        var jsonData = {
            "orgname": params.orgname,
            "description": params.description,
            "thumbnail": params.thumbnail,
            "createdBy": params.createdBy,
            "updatedBy": params.updatedBy,
        }
        var getdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "org",
            docType: 0,
            query: jsonData
        };
        let responseData = await invoke.makeHttpCall("post", "write", getdata);
        if (responseData && responseData.data && responseData.data.statusMessage._id) {
            var newData={
                recivedData:params,
                getResult:responseData.data.statusMessage,
            }
            let result = await schedule.newUserSave(newData)
            if (result && result.success) {
                return{ success: true, message: result.message }
              }  else {
                return{ sucess: false, message :'Record inserted failed'}
                } 
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
let OrgDetails = async (params) => {
    try {
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "org",
        docType: 1,
        query: [
          {
            "$addFields": { "_id": { "$toString": "$_id" } }
          },
          {
            "$match": { "_id": params.orgId }
          },
          {
            $project: { isActive:1,_id:0 ,orgname:1,description:1,thumbnail:1,createdBy:1,updatedBy:1,updatedAt:1,createdAt:1}
          }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
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
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "org",
            docType: 0,
            query: {
                filter: { "_id": params._id },
                update: { $set: params }
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
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "org",
            docType: 0,
            query: {
                "_id": params._id,
                $set: { isActive: params.isActive }
            }
        };
        let responseData = await invoke.makeHttpCall("post", "write", getdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
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
let getplandetails = async () => {
    try {
        var getdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "plan",
            docType: 1,
            query: {}
        };
        let responseData = await invoke.makeHttpCall("post", "read", getdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
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
module.exports = {
    orgEntery,
    OrgDetails,
    orgEdit,
    orgDelete,
    getplandetails
}