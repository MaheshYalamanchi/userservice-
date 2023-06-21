const invoke = require("../../lib/http/invoke");
var globalMsg = require('../../configuration/messages/message');
const { METHODS } = require("http");

let timeincidents = async (params) => {
    try {
        if(params.peak.peak){
            var metrics = params.peak.peak
            var value = jsondata[metrics];
            var id = params.room[0]._id
            var postdata = {
                url:process.env.MONGO_URI,
                database: "proctor",
                model: "room_log",
                docType: 0,
                query: {
                filter: { "_id": id },
                update:{ 
                    $push: { 
                    "logmsg": {
                        "message": value,
                        "time": params.peak.time
                    }
                    }
                }
                }
            };
            let responseData = await invoke.makeHttpCall("post", "update", postdata);
            if (responseData && responseData.data && responseData.data.statusMessage) {
                return { success: true, message: "Record inserted sucessfull" }
            } else {
                return { success: false, message: 'Data Not inserted' }
            }
        }else if(params.peak){
            if(params.peak.submittime){
                var time = params.peak.submittime
                var exam = "Exam submited"
            }else if(params.peak.starttime){
                var time = params.peak.starttime
                var exam = "Exam started"
            }else if (params.peak.pausetime){
                var time = params.peak.pausetime
                var exam = "Exam paused"
            }else if (params.peak.stoptime){
                var time = params.peak.stoptime
                var exam = "Exam stoped"
            }else if (params.peak.messagetime){
                var time = params.peak.messagetime
                var exam = params.peak.message
                var id = params.room[0]._id
                var postdata = {
                    url:process.env.MONGO_URI,
                    database: "proctor",
                    model: "room_log",
                    docType: 0,
                    query: {
                        filter: { "_id": id },
                        update:{ 
                            $push: { 
                                "chat": {
                                    "sendBy":params.peak.student,
                                    "role":params.peak.role,
                                    "chatMessage": exam,
                                    "time": time
                                }
                            }
                        }
                    }
                };
                let responseData = await invoke.makeHttpCall("post", "update", postdata);
                if (responseData && responseData.data && responseData.data.statusMessage) {
                    return { success: true, message: "Record inserted sucessfull" }
                } else {
                    return { success: false, message: 'Data Not inserted' }
                }
            }
            var id = params.room[0]._id
            var postdata = {
                url:process.env.MONGO_URI,
                database: "proctor",
                model: "room_log",
                docType: 0,
                query: {
                    filter: { "_id": id },
                    update:{ 
                        $push: { 
                            "logmsg": {
                                "message": exam,
                                "time": time,
                                "status" : params.peak.status,
                                "comment" : params.peak.comment
                            }
                        }
                    }
                }
            };
            let responseData = await invoke.makeHttpCall("post", "update", postdata);
            if (responseData && responseData.data && responseData.data.statusMessage) {
                return { success: true, message: "Record inserted sucessfull" }
            } else {
                return { success: false, message: 'Data Not inserted' }
            }
        }
    }catch (error) {
      if (error && error.code == 'ECONNREFUSED') {
        return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
      } else {
        return { success: false, message: error }
      }
    }
};
let time = async (params) => {
    try {
        if(params.peak.submittime){
            var time = params.peak.submittime
            var exam = "Exam submited"
        }else if(params.peak.starttime){
            var time = params.peak.starttime
            var exam = "Exam started"
        }else if (params.peak.stoptime){
            var time = params.peak.stoptime
            var exam = "Exam stoped"
        }else if (params.peak.messagetime){
            var time = params.peak.messagetime
            var exam = params.peak.message+"(from="+params.peak.student+")"
        }else if (params.peak.pausetime){
            var time = params.peak.pausetime
            var exam = "Exam paused"
        }
        const data = {
            "logmsg": {
                "message" : exam,
                "time" : time,
                "status" : params.peak.status,
                "comment" : params.peak.comment
            },
            "room": params.peak.room,
            "student": params.peak.student,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
        var postdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "room_log",
            docType: 0,
            query: data
        };
        let responseData = await invoke.makeHttpCall("post", "write", postdata);
        if (responseData && responseData.data && responseData.data.statusMessage._id) {
            return { success: true, message: "Record inserted sucessfull" }
        } else {
            return { success: false, message: 'Data Not inserted' }
        }
    }catch (error) {
      if (error && error.code == 'ECONNREFUSED') {
        return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
      } else {
        return { success: false, message: error }
      }
    }
  };
  let filename = async (params) => {
    try {
      var getdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "chats",
        docType: 1,
        query: [
          {
            "$match": { "room": params.roomId }
          },
          {
             $lookup: {
              from: 'attaches',
              localField: 'attach',
              foreignField: '_id',
              as: 'data',
            }
          },
          {
             "$unwind": { "path": "$data", "preserveNullAndEmptyArrays": true }
          },
          {
            "$match": { "data.attached" : true ,"data.filename": params.filename }
          },
          {
            "$project": { "_id": 0 ,"id" :"$data._id", user:"$data.user",filename: "$data.filename", mimetype: "$data.mimetype",size: "$data.size",createdAt: "$data.createdAt",attached: "$data.attached",metadata:"$data.metadata"}
          },
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", getdata);
      if (responseData && responseData.data && responseData.data.statusMessage) {
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
module.exports={
    timeincidents,
    time,
    filename
}