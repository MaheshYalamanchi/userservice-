const invoke = require("../../lib/http/invoke");
var globalMsg = require('../../configuration/messages/message');
const shared = require("./shared");
const { METHODS } = require("http");
let reportlog = async (params) => {
    try {
      jsondata = {
        b1 : "Browser not supported",
        b2 : "Focus changed to a different window",
        b3 : "Full-screen mode is disabled",
        k1 : "Atypical keyboard handwriting",
        m1 : "Microphone muted or its volume is low",
        n2 : "No connection to a mobile camera",
        s1 : "Screen activities are not shared" ,
        s2 : "Second display is used" ,
        m2 : "Conversation or noise in the background",
        n1 : "No network connection ",
        c1 : "Webcam is disabled" ,
        c2 : "Face invisible or not looking into the camera",
        c3 : "Several faces in front of the camera",
        c4 : "Face does not match the profile ",
        c5 : "Found a similar profile",
        h1 : "Headphone use",
        m3 : "Mobile use"
      }
        var postdata = {
          url:process.env.MONGO_URI,
          database: "proctor",
          model: "room_log",
          docType: 1,
          query: [
            {
              "$match": { "room": params.room }
            },
            {
              $project: { _id:1 ,room:1}
            }
          ]
        };
        let result = await invoke.makeHttpCall("post", "aggregate", postdata);
        if( result.data.statusMessage.length>0){
          data ={
            room :result.data.statusMessage,
            metrics : jsondata,
            peak : params
          }
          let status = await shared.timeincidents(data)
          if (status && status.message) {
            return { success: true, message:  status.message}
          } else {
            return { success: false, message: 'Data Not inserted' }
          }
        }else{
          if(params.peak){
          var metrics = params.peak
          const value = jsondata[metrics];
          const data = {
            "logmsg": {
              "message" : value,
              time :params.time,
            },
            "room": params.room,
            "student": params.student,
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
        }else{
          data ={
            room :result.data.statusMessage,
            metrics : jsondata,
            peak : params
          }
          let status = await shared.time(data)
          if (status && status.message) {
            return { success: true, message:  status.message}
          } else {
            return { success: false, message: 'Data Not inserted' }
          }
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

module.exports={
    reportlog
}