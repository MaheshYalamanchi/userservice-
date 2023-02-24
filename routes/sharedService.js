const invoke = require("../lib/http/invoke");
const globalMsg = require('../configuration/messages/message');

let rolecreation = async (params) => {
  try {
      const data =  {
        "rolename": params.rolename,
        "createdBy": params.createdBy,
        "createdAt": new Date(),
        "updatedBy":params.updatedBy,
        "updatedAt": new Date()
      }
      var postdata = {
        url: process.env.MONGO_URI,
        client: "role",
        docType: 0,
        query: data
      };
      let responseData = await invoke.makeHttpCall("post", "write", postdata);
      if (responseData && responseData.data&&responseData.data.iid) {
          return { success: true, message: "Record inserted sucessfull"}
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

let creationget = async () => {
  try {
      var getdata = {
        url: process.env.MONGO_URI,
        client: "role",
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

let roleput = async (params) => {
  try {
      var getdata = {
        url: process.env.MONGO_URI,
        client: "role",
        docType: 0,
        query: {
          filter: { "_id": params._id },
          update: { $set: params.rolename }
      }
      };
      let responseData = await invoke.makeHttpCall("post", "update", getdata);
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

let deleterole = async (params) => {
  try {
      var getdata = {
        url: process.env.MONGO_URI,
        client: "role",
        docType: 1,
        query: {
          _id: params.UserId
      }
      };
      let responseData = await invoke.makeHttpCall("post", "readData", getdata);
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

let creategroup = async (params) => {
  try {
      const data =  {
        "groupname": params.groupname,
        "orgId" : params.orgId
      }
      var postdata = {
        url: process.env.MONGO_URI,
        client: "group",
        docType: 0,
        query: data
      };
      let responseData = await invoke.makeHttpCall("post", "write", postdata);
      if (responseData && responseData.data&&responseData.data.iid) {
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

let groupget = async () => {
  try {
      var getdata = {
        url: process.env.MONGO_URI,
        client: "role",
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



module.exports = {
  rolecreation,
  creationget,
  roleput,
  deleterole,
  creategroup,
  groupget
}
