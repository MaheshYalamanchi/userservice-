const invoke = require("../../lib/http/invoke");
var globalMsg = require('../../configuration/messages/message');
const { METHODS } = require("http");

let timeincidents = async (params) => {
    try {
        if(params.peak.peak){
            var metrics = params.peak.peak
            var value = jsondata[metrics];
            var id = params.room[0].room
            var postdata = {
                url:process.env.MONGO_URI,
                database: "proctor",
                model: "room_log",
                docType: 0,
                query: {
                filter: { "room": id },
                update:{ 
                    $push: { 
                    "logmsg": {
                        "peak": metrics,
                        "message": value,
                        "time": params.peak.time
                    }
                    }
                }
                }
            };
            let responseData = await invoke.makeHttpCall_userDataService("post", "update", postdata);
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
                let responseData = await invoke.makeHmakeHttpCall_userDataServicettpCall("post", "update", postdata);
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
            let responseData = await invoke.makeHttpCall_userDataService("post", "update", postdata);
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
        let responseData = await invoke.makeHttpCall_userDataService("post", "write", postdata);
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
                $addFields: { b1: "Browser not supported",b2: "Focus changed to a different window",b3: "Full-screen mode is disabled", k1: "Atypical keyboard handwriting",m1: "Microphone muted or its volume is low",
                    n2: "No connection to a mobile camera", s1: "Screen activities are not shared",s2: "Second display is used", m2: "Conversation or noise in the background", n1: "No network connection",
                    c1: "Webcam is disabled",c2: "Face invisible or not looking into the camera", c3: "Several faces in front of the camera",c4: "Face does not match the profile", c5: "Found a similar profile",
                    h1: "Headphone use", m3: "Mobile use"
                }
            },
            {
            $match: {"room": params.roomId }
            },
            {
                $lookup: {
                    from: 'attaches',
                    localField: 'attach',
                    foreignField: '_id',
                    as: 'data',
                }
            },
            { $unwind: { "path": "$data","preserveNullAndEmptyArrays": true }},
            { $match: { "data.attached": true,"data.filename": params.filename } },
            { $project: {
                        "_id": 0,
                        "id": "$data._id",
                        "peak": {
                    $cond: [{ $eq: ["$metadata.peak", "b1"]},"$b1",{ $cond: [ { $eq: ["$metadata.peak","b2" ]},"$b2",{ $cond: [{ $eq: ["$metadata.peak","b3"]},"$b3",{ $cond: [{ $eq: ["$metadata.peak", "k1"]}, "$k1", { $cond: [{ $eq: ["$metadata.peak","m1"]},
                                    "$m1",{ $cond: [{ $eq: ["$metadata.peak","m2" ] }, "$m2", { $cond: [{ $eq: ["$metadata.peak","m3"]},"$m3", { $cond: [{ $eq: ["$metadata.peak", "n1"]}, "$n1",{ $cond: [ { $eq: ["$metadata.peak","n2"]}, "$n2", { $cond: [ { $eq: ["$metadata.peak", "s1" ]},
                                    "$s1", { $cond: [{ $eq: [ "$metadata.peak","s2" ]},"$s2",{ $cond: [{ $eq: [ "$metadata.peak", "c1" ]}, "$c1",{ $cond: [{ $eq: [ "$metadata.peak", "c2"]}, "$c2",{ $cond: [{ $eq: ["$metadata.peak","s2"] }, "$s2", { $cond: [{ $eq: ["$metadata.peak", "c3"]},
                                    "$c3",{ $cond: [{ $eq: [ "$metadata.peak","c4"] },"$c4", { $cond: [{ $eq: [ "$metadata.peak", "c5"]},"$c5",{ $ifNull: ["$metadata.peak",null]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},"user": "$data.user", "filename": "$data.filename","mimetype": "$data.mimetype",
                                    "size": "$data.size","createdAt": "$data.createdAt","attached": "$data.attached", "metadata": "$data.metadata"
                }
            }
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