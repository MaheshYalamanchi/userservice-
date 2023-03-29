const invoke = require("../lib/http/invoke");
const schedule = require("./organization/schedule")
const globalMsg = require('../configuration/messages/message');

let rolecreation = async (params) => {
  try {
    if(params.rolename){
      var postdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "role",
        docType: 1,
        query: [
          {
            "$match": { "rolename": params.rolename }
         },
        ]
      };
      let returnData = await invoke.makeHttpCall("post", "aggregate", postdata);
      if (returnData && returnData.data && returnData.data.statusMessage.length==0) {
        const data = {
          "rolename": params.rolename,
          "menuId" : params.menuId,
          "createdBy": "admin",
          "updatedBy": "admin"
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
      } else {
        return { success: false, message: 'rolename already exists' }
      }
    }else{
      return { success: false, message: 'rolename is missing' }
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
let roleget = async (params) => {
  try {
    if (params.query && params.query.limit && params.query.filter ){
      var limit = parseInt(params.query.limit);
      var filter = parseInt(params.query.filter);
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "role",
        docType: 1,
        query: [
          {
            $match: {
                $or: [
                  { _id: { $regex: params.query.filter, $options: 'i' } },
                  { rolename: { $regex: params.query.filter, $options: 'i' } },
                  { createdBy: { $regex: params.query.filter, $options: 'i' } },
                  { createdAt: { $regex: params.query.filter, $options: 'i' } },
                  { updatedBy: { $regex: params.query.filter, $options: 'i' } },
                  { updatedAt: { $regex: params.query.filter, $options: 'i' } }
                ]
            }
        },
        {
          $project: { id: "$_id", _id: 0,rolename:1,createdBy:1,createdAt:1,updatedBy:1,updatedAt:1}
        },
        {$limit:limit},
        { $sort : { createdAt : -1 } }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage ) {
        return { success: true, message: responseData.data.statusMessage }
      } else {
         return { success: false, message: 'Data Not Found' }
      }
    }else if (params.query && params.query.limit){
      var limit = parseInt(params.query.limit);
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "role",
        docType: 1,
        query: [
          {
            $project: { id: "$_id", _id: 0,rolename:1,createdBy:1,createdAt:1,updatedBy:1,updatedAt:1}
          },
          {$limit:limit},
          { $sort : { createdAt : -1 } }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
        return { success: true, message: responseData.data.statusMessage }
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
let roleupdate = async (params) => {
  try {
    if(params.body.isActive == 1){
      var isTrueSet  = true;
    }else{
      var isTrueSet  = false;
    }
    var A = new Date().toISOString()
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 0,
      query: {  
        filter :{"_id": params.params.roleId},
        update:{$set: { rolename: params.body.rolename,isActive: isTrueSet,updatedAt: A }}
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
    let B = false
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "role",
      docType: 0,
      query: {
        "_id": params.params.role,
        $set: { isActive: B }
      }
    };
    let responseData = await invoke.makeHttpCall("post", "write", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage) {
      return { success: true, message: "Record updated sucessfull"  }
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
    if (params.query && params.query.limit && params.query.filter ){
      var limit = parseInt(params.query.limit);
      var filter = parseInt(params.query.filter);
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "group",
        docType: 1,
        query: [
          {
            $match: {
                $or: [
                  { groupname: { $regex: params.query.filter, $options: 'i' } },
                ]
            }
        },
        {
          $project: { _id: 0,groupname:1}
        },
        {$limit:limit},
        { $sort : { createdAt : -1 } }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage ) {
        return { success: true, message: responseData.data.statusMessage }
      } else {
         return { success: false, message: 'Data Not Found' }
      }
    }else if (params.query && params.query.limit){
      var limit = parseInt(params.query.limit);
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "group",
        docType: 1,
        query: [
          {
            $project: { _id: 0,groupname:1}
          },
          {$limit:limit},
          { $sort : { createdAt : -1 } }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
        return { success: true, message: responseData.data.statusMessage }
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
          "$project":{"rolename": 1,"isActive":1,"_id":0,"menuname":"$data.menuname"}
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
let getgroupnamebased = async (params) => {
  try {
    var getdata = {
      url:process.env.MONGO_URI,
      database: "proctor",
      model: "group",
      docType: 1,
      query: [
        {
           "$match": { "groupname": params }
        },
        {
          $lookup:
            {
              from: "org",
              localField: "orgId",
              foreignField: "_id",
              as: "data"
            },
        },
        {
          $unwind: { path: "$data" , preserveNullAndEmptyArrays: true }
        },
        {
        $lookup:{
            from: "plan", 
            localField: "planid", 
            foreignField: "_id",
            as: "message"
        }
        },
        {
          $unwind: { path: "$message" , preserveNullAndEmptyArrays: true }
        },
        {
          "$project":{_id:0,orgname:"$data.orgname",plan:"$message.plan"}
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
module.exports = {
  rolecreation,
  roleget,
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
  getgroupnamebased
}
