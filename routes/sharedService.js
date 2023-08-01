const invoke = require("../lib/http/invoke");
const schedule = require("./organization/schedule")
const globalMsg = require('../configuration/messages/message');

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
    let A = new Date()
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 1,
      query: {
        filter :{"_id": params.params.roleid},
        update:{$set: { rolename: params.body.rolename,createdBy: params.body.createdBy,updatedBy: params.body.updatedBy,isActive: params.body.isActive,updatedAt: A }}
      }
    };
    let responseData = await invoke.makeHttpCall("post", "updatedataMany", getdata);
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
        "_id": params.roleId,
        $set: { isActive: false }
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
let groupget = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
      docType: 1,
      query: [
        {
          "$addFields": { "_id": { "$toString": "$_id" } }
        },
        {
          "$match": { "_id": params.groupId }
        },
        {
          $project: { groupname:1,orgId:1,planid:1,createdBy:1,updatedBy:1,createdAt:1,updatedAt:1,_id:0 }
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
let groupupdate = async (params) => {
  try {
    let A = new Date()
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
      docType: 1,
      query: {
        filter:{"_id": params.params.groupId},
        update:{$set: { groupname: params.body.groupname, orgId: params.body.orgId,isActive:params.body.isActive,planid:params.body.planid,createdBy:params.body.createdBy,updatedBy:params.body.updatedBy,updatedAt:A }},
      }
    };
    let responseData = await invoke.makeHttpCall("post", "updatedataMany", getdata);
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
        "_id": params.groupId,
        $set: { isActive: false }
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
      "displayName": params.menuname,
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
let menuget = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
      docType: 1,
      query: [
        {
          $project: { displayName:1,createdBy:1,updatedBy:1,createdAt:1,updatedAt:1,iconName:1,route:1,isActive:1,_id:0}
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
let menuupdate = async (params) => {
  try {
    let A = new Date()
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "menu",
      docType: 0,
      query: {
        filter :{"_id": params.params.menuId},
        update: {$set: { menuname: params.body.menuname, createdBy: params.body.createdBy ,updatedBy: params.body.updatedBy,updatedAt:A}},
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
        "_id": params.params.menuId,
        $set: { isActive: false }
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
      if (responseData && responseData.data && responseData.data.statusMessage&&responseData.data.statusMessage.length ) {
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
      if (responseData && responseData.data && responseData.data.statusMessage&&responseData.data.statusMessage.length) {
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
let reportlog = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "reportlog",
      docType: 1,
      query: [
        {
          "$match": {
            "$or": [ { "roomId": params.roomId },{ "student": params.userId }]
          }
        },
        {
          "$project": { "_id": 0 }
        }
      ]
    };
    let fetchData = await invoke.makeHttpCall("post", "aggregate", getdata);
    console.log("fetchData",fetchData)
    if (fetchData && fetchData.data) {
      return { success: true, message: fetchData.data.statusMessage }
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
  truestatus,
  reportlog
}
