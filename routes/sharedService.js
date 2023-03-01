const invoke = require("../lib/http/invoke");
const globalMsg = require('../configuration/messages/message');

let rolecreation = async (params) => {
  try {
      const data =  {
        "rolename": params.rolename,
        "createdBy": params.createdBy,
        "updatedBy":params.updatedBy
      }
      var postdata = {
        database:"proctor",
        model: "role",
        docType: 0,
        query: data
      };
      let responseData = await invoke.makeHttpCall("post", "write", postdata);
      if (responseData && responseData.data&&responseData.data.statusMessage._id) {
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
        database:"proctor",
        model: "role",
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
        database:"proctor",
        model: "role",
        docType: 0,
        query: {
          "_id": params._id ,
          $set:{ rolename:params.rolename }  
      }
      };
      let responseData = await invoke.makeHttpCall("post", "write", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
          return { success: true, message: "Record updated sucessfully" }
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
        database:"proctor",
        model: "role",
        docType: 0,
        query: {
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
        database:"proctor",
        model: "group",
        docType: 0,
        query: data
      };
      let responseData = await invoke.makeHttpCall("post", "write", postdata);
      if (responseData && responseData.data&&responseData.data.statusMessage) {
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
        database:"proctor",
        model: "group",
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

let groupupdate = async (params) => {
  try {
      var getdata = {
        database:"proctor",
        model: "group",
        docType: 0,
        query: {
          "_id": params._id ,
          $set:{ groupname:params.groupname,orgId:params.orgId },
      }
      };
      let responseData = await invoke.makeHttpCall("post", "write", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
          return { success: true, message: "Record updated sucessfully" }
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

let groupdelete = async (params) => {
  try {
      var getdata = {
        database:"proctor",
        model: "group",
        docType: 0,
        query: {
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
  groupget,
  groupupdate,
  groupdelete
}
