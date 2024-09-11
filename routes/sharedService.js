const invoke = require("../lib/http/invoke");
const schedule = require("./organization/schedule")
const globalMsg = require('../configuration/messages/message');
const _schedule = require('./loggs/shared');
const jwt_decode = require('jwt-decode');
const scheduleService = require('./scheduleService');

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
    let url;
    let database;
    // let tenantResponse;
    if(params && params.authorization){
      // let decodeToken = jwt_decode(params.authorization);
      // if (decodeToken && decodeToken.tenantId) {
      //   tenantResponse = await _schedule.tenantResponse(decodeToken);
      //   if (tenantResponse && tenantResponse.success) {
      //     url = tenantResponse.message.connectionString + '/' + tenantResponse.message.databaseName;
      //     database = tenantResponse.message.databaseName;
      //   } else {
      //     return { success: false, message: tenantResponse.message }
      //   }
      // } else {
        url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
        database = process.env.DATABASENAME;
      // }
    } else {
      url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    }
    var getdata = {
      url: url,
      database: database,
      model: "role",
      docType: 1,
      query: [
        {$match:{rolename:params.role}},
        { "$unwind": "$menuId" },
        {
            $lookup:{
                from:"menu",
                localField:"menuId",
                foreignField:"_id",
                as:"menuData"
            }
        },
        {
            $project:{
                menu:"$menuData"
            }
        }
    ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data) {
      var menuArray=[]
      for (const iterator of responseData.data.statusMessage) {
        menuArray.push(iterator.menu[0])
      }
      return { success: true, message: menuArray }
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
let overview = async (params) => {
  try {
    let url;
    let database;
    // let tenantResponse;
    // if(params && params.authorization){
      // let decodeToken = jwt_decode(params.authorization);
      // if (decodeToken && decodeToken.tenantId) {
      //   tenantResponse = await _schedule.tenantResponse(decodeToken);
      //   if (tenantResponse && tenantResponse.success) {
      //     url = tenantResponse.message.connectionString + '/' + tenantResponse.message.databaseName;
      //     database = tenantResponse.message.databaseName;
      //   } else {
      //     return { success: false, message: tenantResponse.message }
      //   }
      // } else {
        // url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
        // database = process.env.DATABASENAME;
      // }
    // } else {
      url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    // }
    var getdata = {
      url: url,
      database: database,
      model: "rooms",
      docType: 1,
      query: [
        { $match: { $or: [{ status: "stopped" },{ status: "paused" },{ status: "started" }]}},
        { $facet: { stoppedCount: [{$match: { status: "stopped" }}, { $group: { _id: null,stopped: { $sum: 1 } } }],
            pausedCount: [ {$match: { status: "paused" } },{$group: { _id: null,paused: { $sum: 1 } }}],
            startedCount: [{$match: { status: "started" } },{ $group: {_id: null,started: { $sum: 1 } }}]}}
      ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data) {
      var getdata = {
        url: url,
        database: database,
        model: "users",
        docType: 1,
        query: [
          {  $group: { _id: null, totalCount: { $sum: 1 } } }
        ]
      };
      let fetchData = await invoke.makeHttpCall("post", "aggregate", getdata);
      const statusMessage = responseData?.data?.statusMessage?.[0] || {};
      const stoppedCount = statusMessage.stoppedCount?.[0]?.stopped ?? 0;
      const pausedCount = statusMessage.pausedCount?.[0]?.paused ?? 0;
      const startedCount = statusMessage.startedCount?.[0]?.started ?? 0;
      const totalstudents = fetchData.data.statusMessage[0].totalCount ?? 0;
      var data ={
        "Exam Stopped" : stoppedCount,
        "Exam Paused" : pausedCount,
        "Exam Started" : startedCount,
        "Completed Students" : stoppedCount,
        "Total Exams" : stoppedCount + pausedCount + startedCount,
        "Total Students" : totalstudents
      }
      return { success: true, message: data}
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
let getSessionsStatus = async (params) => {
  try {
    let url;
    let database;
    // let tenantResponse;
    // if(params && params.authorization){
      // let decodeToken = jwt_decode(params.authorization);
      // if (decodeToken && decodeToken.tenantId) {
      //   tenantResponse = await _schedule.tenantResponse(decodeToken);
      //   if (tenantResponse && tenantResponse.success) {
      //     url = tenantResponse.message.connectionString + '/' + tenantResponse.message.databaseName;
      //     database = tenantResponse.message.databaseName;
      //   } else {
      //     return { success: false, message: tenantResponse.message }
      //   }
      // } else {
        // url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
        // database = process.env.DATABASENAME;
      // }
    // } else {
      url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    // }
    var getdata = {
      url:url,
      database: database,
      model: "rooms",
      docType: 1,
      query: [
        {
          $match: {_id: { $in: params.roomIdArr}}
        },
        {
          $project:{id:"$_id",status:"$status",_id:0}
        }
    ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage ) {
      return { success: true, message: responseData.data.statusMessage}
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

let getScheduleList = async (params) => {
  try {
    let url;
    let database;
    // let tenantResponse;
    // if(params && params.authorization){
    //   let decodeToken = jwt_decode(params.authorization);
    //   if (decodeToken && decodeToken.tenantId) {
    //     tenantResponse = await _schedule.tenantResponse(decodeToken);
    //     if (tenantResponse && tenantResponse.success) {
    //       url = tenantResponse.message.connectionString + '/' + tenantResponse.message.databaseName;
    //       database = tenantResponse.message.databaseName;
    //     } else {
    //       return { success: false, message: tenantResponse.message }
    //     }
    //   } else {
    //     url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
    //     database = process.env.DATABASENAME;
    //   }
    // } else {
      url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    // }
    var getdata = {
      url:url,
      database: database,
      model: "users",
      docType: 1,
      query:({role:"proctor"})
    };
    let responseData = await invoke.makeHttpCall("post", "read", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage ) {
      return { success: true, message: responseData.data.statusMessage}
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

let broadcastMessages = async (params) => {
  try {
    let url;
    let database;
    // let tenantResponse;
    // if(params && params.authorization){
    //   let decodeToken = jwt_decode(params.authorization);
    //   if (decodeToken && decodeToken.tenantId) {
    //     tenantResponse = await _schedule.tenantResponse(decodeToken);
    //     if (tenantResponse && tenantResponse.success) {
    //       url = tenantResponse.message.connectionString + '/' + tenantResponse.message.databaseName;
    //       database = tenantResponse.message.databaseName;
    //     } else {
    //       return { success: false, message: tenantResponse.message }
    //     }
    //   } else {
    //     url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
    //     database = process.env.DATABASENAME;
    //   }
    // } else {
      url = process.env.MONGO_URI + '/' + process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    // }
    var getdata = {
      url:url,
      database: database,
      model: "chats",
      docType: 1,
      query:[
        {$match:{ room:"sendToAll", scheduleName:params.scheduleName, testId:params.testId,user:params.user}},
        {$sort:{_id:-1}}
      ]
    };
    let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
    if (responseData && responseData.data && responseData.data.statusMessage ) {
      return { success: true, message: responseData.data.statusMessage}
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
let proctorAuthCall = async (params) => {
  try {
      if(!params?.authorization){
          console.log("Auth Token========>>>>",params.authorization)
          return { success: false, message: 'Authorization token missing.' }
      }
      var decodeToken = jwt_decode(params.authorization);
      // let tenantResponse;
      // if(decodeToken && decodeToken.tenantId ){
      //     tenantResponse = await _schedule.getTennant(decodeToken);
      //     if (tenantResponse && tenantResponse.success){
      //         decodeToken.tenantResponse = tenantResponse;
      // }    else {
      //         return { success: false, message: tenantResponse.message }
      //     }
      // }
      if(decodeToken && (decodeToken.room=="check")){
          let response = await tokenService.authCheckToken(decodeToken);
          if(response){
              var token = jwt_decode(response);
              if (decodeToken.exp){
                  return {success: true, message: { exp :token.exp, iat: token.iat, id: token.id,
                      role: token.role,token: response,room:token.room}
                  }
              } else {
                  return {success: true, message: { iat: token.iat, id: token.id,
                      role: token.role,token: response,room:token.room}
                  }
              }
              
          } else {
              return { success: false, message: 'Data Not Found' }
          }
      } else if (decodeToken){
          let getdata;
          // if(tenantResponse && tenantResponse.success){
          //     getdata = {
          //         url: tenantResponse.message.connectionString+'/'+tenantResponse.message.databaseName ,
          //         database: tenantResponse.message.databaseName ,
          //         model: "users",
          //         docType: 1,
          //         query: decodeToken.id
          //     };
          // } else {
              getdata = {
                  url: process.env.MONGO_URI+'/'+process.env.DATABASENAME,
                  database: process.env.DATABASENAME,
                  model: "users",
                  docType: 1,
                  query: decodeToken.id
              };
          // }
          let responseData = await invoke.makeHttpCall_commonDataService("post", "findById", getdata);
          if (responseData && responseData.data&&responseData.data.statusMessage&&responseData.data.statusMessage._id) {
              var splitToken = params.authorization.split(" ");
              if (decodeToken && decodeToken.room && decodeToken.provider){
                  return {success: true, message: {exp: decodeToken.exp, iat: decodeToken.iat, id: responseData.data.statusMessage._id,
                          role: responseData.data.statusMessage.role,token: splitToken[1],provider:decodeToken.provider,room:decodeToken.room}
                  }
              } else { 
                  return {
                      success: true, message: {
                          exp: decodeToken.exp, iat: decodeToken.iat, id: responseData.data.statusMessage._id,
                          role: responseData.data.statusMessage.role,
                          token: splitToken[1]
                      }
                  }
              }
          } else {
              return { success: false, message: 'Data Not Found' }
          }
      } else {
          return { success: false, message: 'Invalid Token Error' }
      }
  } catch (error) {
      console.log(error,"authError2====>>>>")
      if (error && error.code == 'ECONNREFUSED') {
          return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
      } else {
          return { success: false, message: error }
      }
  }
};
let getDatails = async (params) => {
  try {  
      if(!params?.body?.authorization){
          console.log("Next Token========>>>>",params.body.authorization)
          return { success: false, message: 'Authorization token missing.' }
      }
      decodeToken = jwt_decode(params.body.authorization)
      // let tenantResponse;
      let url;
      let database;
      // if(decodeToken && decodeToken.tenantId ){
      //     tenantResponse = await _schedule.getTennant(decodeToken);
      //     if (tenantResponse && tenantResponse.success){
      //         url = tenantResponse.message.connectionString+'/'+tenantResponse.message.databaseName;
      //         database = tenantResponse.message.databaseName;
      //         params.tenantResponse = tenantResponse;
      //     } else {
      //         return { success: false, message: tenantResponse.message }
      //     }
      // } else {
          url = process.env.MONGO_URI+'/'+process.env.DATABASENAME;
          database = process.env.DATABASENAME;
      // }
      let getdata;
      if (decodeToken && decodeToken.videoass == "VA"){
          getdata = {
              url: url,
              database: database,
              model: "rooms",
              docType: 1,
              query: {_id:params.query.id}
          };
      } else {
          getdata = {
              url: url,
              database: database,
              model: "rooms",
              docType: 1,
              query: params.query.id
          };
      }
      let responseData = await invoke.makeHttpCall_roomDataService("post", "findById", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
          responseData.data.statusMessage.id = responseData.data.statusMessage._id;
          delete responseData.data.statusMessage._id;
          params.responseData = responseData;
          params.url = url;
          params.database = database;
          return { success: true, message: responseData.data.statusMessage ,json: params}
      } else {
          return { success: false, message: 'Data Not Found' };
      }
  } catch (error) {
      console.log("next Error Body2========>>>>",JSON.stringify(params.body))
      console.log("next Error2========>>>>",error)
      if (error && error.code == 'ECONNREFUSED') {
          return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
      } else {
          return { success: false, message: error }
      }
  }
};

let getDatailsApprove = async (params) => {
  try {  
      if(params.body.body.error !== null){
          params.body.body.createdAt = new Date()
          const data = {
              id : params.query.id,
              body : params.body.body,
              error : params.responseData.data.statusMessage.error,
              // tenantResponse: params.tenantResponse,
              approvalRequest : params?.body?.body?.approvalRequest
          }
          let responsemessage = await scheduleService.errorupdate(data)
      }else if(params?.body?.body?.approve){
          const data = {
              id : params.query.id,
              approvalRequest : params?.body?.body?.approvalRequest
            
          }
          let responsemessage = await scheduleService.updateApproveStatus(data)
      }
      else{
          const data = {
              ipaddress : params.body.body.ipaddress,
              id : params.query.id,
          }
          let responsemessage = await scheduleService.updateIpAddress(data)
      }
  } catch (error) {
      console.log("next Error Body3========>>>>",JSON.stringify(params))
      console.log("next Error3========>>>>",error)
      if (error && error.code == 'ECONNREFUSED') {
          return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
      } else {
          return { success: false, message: error }
      }
  }
};

let fetchStreamStatus = async (params) => {
  try {
    if(!params?.authorization){
      console.log("fetchStreamStatus Token========>>>>",params.authorization)
      return { success: false, message: 'Authorization token missing.' }
    }
    var decodeToken = jwt_decode(params.authorization);
    let tenantResponse;
    if(decodeToken && decodeToken.tenantId ){
      tenantResponse = await _schedule.getTennant(decodeToken);
      if (tenantResponse && tenantResponse.success){
          decodeToken.tenantResponse = tenantResponse;
      } else {
        return { success: false, message: tenantResponse.message }
      }
    } else {
      url = process.env.MONGO_URI+'/'+process.env.DATABASENAME;
      database = process.env.DATABASENAME;
    }
    var sort = -1;
    var start=0;
    var postdata = {
      url: url,
      database: database,
      model: "rooms",
      docType: 1,
      query: [
          { $match: { isActive: true,_id:{$in:params.roomIds} } },
          { "$sort": { startedAt: sort } },
          { "$skip": start },
          { "$limit": 30 },
          { $group: { _id: { status: "$status" }, count: { $sum: 1 } } },
          { $project: { _id: 0, "status": "$_id.status", "count": 1 } },
      ]
    };
    let response = await invoke.makeHttpCall("post", "aggregate", postdata);
    if (response && response.data && response.data.statusMessage) {
        const message = []
        let mergedCount = 0;
        for (let obj of response.data.statusMessage) {
            if (obj.status === 'stopped' || obj.status === 'accepted') {
                mergedCount += obj.count;
            } else if (obj.status === 'started') {
                message.push({ "In Progress": obj.count })
            } else if (obj.status === 'paused') {
                message.push({ "Idle": obj.count })
            } else if (obj.status === 'rejected') {
                message.push({ "Terminated": obj.count })
            }
        }
        message.push({ "Completed": mergedCount });
        var jsonData = {
            'Completed' : 0,
            "In Progress" : 0,
            "Idle" : 0,
            'Terminated' : 0
        }
        message.forEach((item) => {
            const key = Object.keys(item)[0]; 
            const value = item[key]; 
            jsonData[key] = value;
          });
        return { success: true, message: jsonData }
    } else {
        return { success: false, message: 'Data Not found' }
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
  reportlog,
  overview,
  getSessionsStatus,
  getScheduleList,
  broadcastMessages,
  proctorAuthCall,
  getDatails,
  getDatailsApprove,
  fetchStreamStatus
}
