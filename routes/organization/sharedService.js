const invoke = require("../../lib/http/invoke")
const schedule = require("./schedule")
let orgEntery = async (params) => {
  try{
    var createdAt = new Date()
    var updatedAt = new Date()
    var jsonData={
        "orgname":params.Org_name,
        "description":params.description,
        "thumbnail":params.Thumbnail,
        "createdAt":createdAt,
        "updatedAt":updatedAt,
        "createdBy":params.username,
        "updatedBy":params.username

    }
    console.log(jsonData)
      var getdata = {
          url: process.env.MONGO_URI,
          client: "org",
          docType: 0,
          query: jsonData
      };
      let responseData = await invoke.makeHttpCall("post", "write", getdata);
      console.log(responseData);
      if(responseData && responseData.data&&responseData.data.iid){
        var newData = {
            params:params,
            OrgId:responseData.data.iid
          }
          let getData = await schedule.newUserSave(newData);
          if(getData && getData.data && getData.data.statusMessage){
              return { success: true, message: 'data inserted in org and user collection' }
          } else {
              return { success: false, message: 'Data Not Found' }
          }
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
let OrgDetails = async (params) => {
    try {
        var getdata = {
            url: process.env.MONGO_URI,
            client: "org",
            docType: 1,
            query: [

            ]
        };
        let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
        if (responseData && responseData.data) {
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
let orgEdit = async (params) => {
    try {
        var updatedAt = new Date();
        params.body.updatedAt = updatedAt;
        var getdata = {
            url: process.env.MONGO_URI,
            client: "org",
            docType: 0,
            query: {
                filter: { "_id": objectId(params.params.userId) },
                update: { $set: params.body }
            }
        };
        let response = await invoke.makeHttpCall("post", "update", getdata);
        if (response && response.data && response.data.statusMessage && response.data.statusMessage.nModified == 1) {
            let responseData = await schedule.getUpdatedRecord(params);
            if (responseData && responseData.data && responseData.data.statusMessage) {
                return { success: true, message: responseData.data.statusMessage[0] };
            } else {
                return { success: false, message: 'Data Not Found' };
            }
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
            url: process.env.MONGO_URI,
            client: "org",
            docType: 1,
            query: {
                _id: params.UserId
            }
        };
        let responseData = await invoke.makeHttpCall("post", "readData", getdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
            let response = await schedule.orgUserDelete(responseData.data.statusMessage[0]);
        }
        if (responseData && responseData.data) {
            return { success: true, message: responseData.data.statusMessage[0] }
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