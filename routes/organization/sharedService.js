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
        if (params.query && params.query.limit && params.query.filter ){
          var limit = parseInt(params.query.limit);
          var filter = parseInt(params.query.filter);
          var getdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "org",
            docType: 1,
            query: [
              {
                $match: {
                    $or: [
                      { _id: { $regex: params.query.filter, $options: 'i' } },
                      { orgname: { $regex: params.query.filter, $options: 'i' } },
                      { thumbnail: { $regex: params.query.filter, $options: 'i' } },
                      { description: { $regex: params.query.filter, $options: 'i' } }
                    ]
                }
            },
            {
              $project: {id:"$_id",_id: 0,orgname:1,thumbnail:1,description:1}
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
        }else if (params.query && params.query.limit){
          var limit = parseInt(params.query.limit);
          var getdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "org",
            docType: 1,
            query: [
              {
                $project: {id:"$_id",_id: 0,orgname:1,thumbnail:1,description:1}
              },
              {$limit:limit},
              { $sort : { createdAt : -1 } }
            ]
          };
          let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
          if (responseData && responseData.data && responseData.data.statusMessage) {
            let data = [];
            for (const child of responseData.data.statusMessage) {
                    //iterator.imageurl=child.imageurl
                    child.thumbnail="<img height='40' width ='40' src="+child.thumbnail+">"
                    data.push(child);         
            }
            return { success: true, message: data}
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
      let B = false
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
         model: "org",
         docType: 0,
         query: {
          "_id": params.org,
          $set: { isActive: B }
        }
      };
      let responseData = await invoke.makeHttpCall("post", "write", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
        return { success: true, message: "Record updated sucessfull" }
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
let getuserdetails = async (params) => {
    try {
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "org",
        docType: 1,
        query:[
          {
            "$addFields": { "test": { "$toString": "$_id" } }
          },
          {
             "$match": { "test":params.params.orgId}
          },
//           {
//             "$addFields": { "test": { "$toString": "$_id" } }
//           },
          {
            $lookup:       
              {
                from: "users",
                localField: "_id",
                foreignField: "OrgId",
                as: "data"
              }
           },
          {
              $unwind: { path: "$data" , preserveNullAndEmptyArrays: true }
          },
          {
              "$project":{_id:0,"id":"$data._id","username":"$data.username","role":"$data.role","orgname":1,"description":1,"thumbnail":1,"hashedPassword":"$data.hashedPassword"}
          }
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
        let data = [];
            for (const child of responseData.data.statusMessage) {
                    //iterator.imageurl=child.imageurl
                    child.thumbnail="<img height='40' width ='40' src="+child.thumbnail+">"
                    data.push(child);         
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
module.exports = {
    orgEntery,
    OrgDetails,
    orgEdit,
    orgDelete,
    getplandetails,
    getuserdetails
}