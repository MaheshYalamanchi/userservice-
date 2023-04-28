const invoke = require("../lib/http/invoke");
const schedule = require("./organization/schedule")
const globalMsg = require('../configuration/messages/message');
var jwtDecode = require('jwt-decode');

let rolecreation = async (params) => {
  try {
    const data = {
      "rolename": params.rolename,
      "menuId" : params.menuId,
      "createdBy": params.createdBy,
      "updatedBy": params.updatedBy
    }
    var postdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 0,
      query: data
    };
    let responseData = await invoke.makeHttpCall("post", "write", postdata);
    if (responseData && responseData.data && responseData.data.statusMessage._id) {
      return { success: true, message: "Record inserted sucessfull" }
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
let roleupdate = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 0,
      query: {
        filter :{"_id": params._id},
        update:{$set: { rolename: params.rolename }}
      }
    };
    let responseData = await invoke.makeHttpCall("post", "update", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage.nModified>0) {
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
let roledelete = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
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
  }
  catch (error) {
    if (error && error.code == 'ECONNREFUSED') {
      return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
    } else {
      return { success: false, message: error }
    }
  }
};
let truestatus = async () => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 1,
      query: [
        {
          "$match": { "isActive": true }
        },
        {
          $project: { _id:0,id:"$_id", rolename:1}
        }
      ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage) {
      return { success: true, message:responseData.data.statusMessage }
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
let groupcreate = async (params) => {
  try {
    const data = {
      "groupname": params.groupname,
      "orgId": params.orgId,
      "planid": params.planid,
      "createdBy": params.createdBy,
      "updatedBy": params.updatedBy
    }
    var postdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
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
let groupget = async () => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
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
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
      docType: 0,
      query: {
        filter:{"_id": params._id},
        update:{$set: { groupname: params.groupname, orgId: params.orgId }},
      }
    };
    let responseData = await invoke.makeHttpCall("post", "update", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage.nModified>0) {
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
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
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
  }
  catch (error) {
    if (error && error.code == 'ECONNREFUSED') {
      return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
    } else {
      return { success: false, message: error }
    }
  }
};
let menucreate = async (params) => {
  try {
    const data = {
      "menuname": params.menuname,
      "roleId": params.roleId,
      "createdBy": params.createdBy,
      "updatedBy": params.updatedBy
    }
    var postdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
      docType: 0,
      query: data
    };
    let responseData = await invoke.makeHttpCall("post", "write", postdata);
    if (responseData && responseData.data && responseData.data.statusMessage._id) {
      var newData={
          recivedData:params,
          getResult:responseData.data.statusMessage,
      }
      let result = await schedule.newusermenu(newData)
      if (result && result.success) {
          return{ success: true, message: result.message }
        }  else {
          return{ sucess: false, message :'Record inserted failed'}
          } 
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
let menuget = async () => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
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
let menuupdate = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
      docType: 0,
      query: {
        filter :{"_id": params._id},
        update: {$set: { menuname: params.menuname, createdBy: params.createdBy ,updatedBy: params.updatedBy}},
      }
    };
    let responseData = await invoke.makeHttpCall("post", "update", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage.nModified>0) {
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
let menudelete = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
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
  }
  catch (error) {
    if (error && error.code == 'ECONNREFUSED') {
      return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
    } else {
      return { success: false, message: error }
    }
  }
};
let getmenubasedonrole = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 1,
      query: [
        {
          "$addFields": { "test": { "$toString": "$_id" } }
        },
        {
           "$match": { "test": params.roleid }
        },
        {
          $lookup:
            {
              from: "menu",
              localField: "menuId",
              foreignField: "_id",
              as: "data"
            },
        },
        {
          $unwind: { path: "$data" , preserveNullAndEmptyArrays: true }
        },
        {
          "$project":{"_id":0,"menuname":"$data.menuname"}
        }
      ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage) {
      return { success: true, message:responseData.data.statusMessage }
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
let sessionstatus = async (params) => {
  try {
    if (params && params.id ){
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "rooms",
        docType: 1,
        query: [ 
          {
            "$match": { "_id": params.id }
          },
         {
          $project: {  _id: 0,status:1}
         }]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage ) {
        return { success: true, message: responseData.data.statusMessage[0] }
      } else {
         return { success: false, message: 'Data Not Found' }
      }
    }else if (params.body && params.body.roomid){
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "rooms",
        docType: 1,
        query:  [ 
          {
            "$match": { "_id": params.body.roomid }
         },
         {
          $project: {  _id: 0,status:1}
         }]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
        return { success: true, message: responseData.data.statusMessage [0]}
      } else {
         return { success: false, message: 'Data Not Found' }
      }
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
  roleupdate,
  roledelete,
  groupcreate,
  groupget,
  groupupdate,
  groupdelete,
  menucreate,
  menuget,
  menuupdate,
  menudelete,
  getmenubasedonrole,
  sessionstatus,
  truestatus
}
