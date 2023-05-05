const invoke = require("../../lib/http/invoke");
var globalMsg = require('../../configuration/messages/message')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const otpGenerator = require('otp-generator')


let scheduleInterview = async(params) => {
    'use strict'
    try{
        var hash,video_id;
        if(params.type=='webrtc'){
            hash = bcrypt.hashSync(params.password, salt);
            params.password=hash;
        }else{
            hash=params.password;
        }
        for (const iterator of params.userDtl) {
            if(iterator.type=='candidate'){
                video_id=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                iterator.video_id=video_id
                //iterator.link=process.env.webrtc+'/demos/dashboard/canvas-designer.html?open=true&sessionid='+params.roomId+'&publicRoomIdentifier=dashboard&userFullName='+iterator.userFullName+'&password='+params.password+'&type=Candidate&roomName='+params.roomName+'&startTime='+params.startTime+'&endTime='+params.endTime
                iterator.link=process.env.webrtc+"/?room="+params.roomId+"&username="+iterator.userFullName+'&password='+hash+'&type=Candidate&roomName='+params.roomName+'&startTime='+params.startTime+'&endTime='+params.endTime+"&video_id="+video_id+"&custCode="+params.custCode
            }
            if(iterator.type=='interviewer'){
                video_id=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                iterator.video_id=video_id
                //iterator.link=process.env.webrtc+'/demos/dashboard/canvas-designer.html?open=false&sessionid='+params.roomId+'&publicRoomIdentifier=dashboard&userFullName='+iterator.userFullName+'&password='+params.password+'&type=Interviwer&roomName='+params.roomName+'startTime='+params.startTime+'&endTime='+params.endTime
                iterator.link=process.env.webrtc+"/?room="+params.roomId+"&username="+iterator.userFullName+'&password='+hash+'&type=interviewer&roomName='+params.roomName+'&startTime='+params.startTime+'&endTime='+params.endTime+"&video_id="+video_id+"&custCode="+params.custCode
            } 
            let emailArray = [{
                "emailType": "interviewScheduleMail",
                "username": iterator.userFullName,
                "useremail": iterator.emailId,
                "webrtclink": iterator.link,
                "start":params.emailStartTime,
                "end":params.emailEndTime,
                "dateFormat":params.startTime,
                "userDtl":iterator
            }]  
           /* let responseData = await sharedServices.sendEmail(emailArray);
            console.log("responseData",responseData)
            if(responseData.success){
                console.log("11111")
                iterator.emailStatus = true
            }else{
                console.log("22222")
                iterator.emailStatus = false
            }*/
        }
        var postdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 0,
            query: params
        };
        let resultData = await invoke.makeHttpCall("post", "write", postdata);
        if( resultData.status ==200){
            return {success:true, message : "Webinar scheduled sucessfully"}
        }else{
            return {success:false, message : "Problem in Interview schedule"}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}

let getscheduleList = async(params) => {
    'use strict'
    try{
        var getscheduleList = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 1,
            query: {
                "userDtl.emailId":params.email
            }
        };
        let scheduleList = await invoke.makeHttpCall("post", "read", getscheduleList);
        if( scheduleList && scheduleList.data){
            return {success:true, message : "Schedule details fetched sucessfully",data:scheduleList.data.statusMessage}
        }else{
            return {success:false,message:'Failed to fetch the data.'}
        }
    }catch(error){
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}

let roomValidation = async(params) => {
    'use strict'
    try{
        var getscheduleList = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 1,
            query: {
                "roomId":params.roomId
            }
        };
        let scheduleList = await invoke.makeHttpCall("post", "read", getscheduleList);
        if( scheduleList && scheduleList.data&&scheduleList.data.statusMessage.length){
            if(params.password==scheduleList.data.statusMessage[0].password){
                return {success:true, message : "valid credential"}
            }else{
                return {success:false, message : "wrong credential"}
            }
        }else{
            return {success:false,message:'This room is not available.'}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}

let storechat = async(params) => {
    'use strict'
    try{
        //console.log(JSON.stringify(params))
        var postdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 0,
            query: params
        };
        let resultData = await invoke.makeHttpCall("post", "write", postdata);
        if( resultData.status ==200){
            return {success:true, message : "Interview scheduled sucessfully"}
        }else{
            return {success:false, message : "Problem in Interview schedule"}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}
//get room

let getroom = async(params) => {
    'use strict'
    try{
        var getscheduleList = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            model: "webinar",
            docType: 1,
            query: {
                "roomId":params.room
            }
        };
        let scheduleList = await invoke.makeHttpCall("post", "read", getscheduleList);
        if( scheduleList && scheduleList.data&&scheduleList.data.statusMessage.length){
            return {success:true, message : scheduleList.data.statusMessage[0]}
        }else{
            return {success:false,message:'This room is not available.'}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}
//
let getallroom = async() => {
    'use strict'
    try{
        var getscheduleList = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 1,
            query: {
              
            }
        };
        let scheduleList = await invoke.makeHttpCall("post", "read", getscheduleList);
        if( scheduleList && scheduleList.data&&scheduleList.data.statusMessage.length){
            return {success:true, message : scheduleList.data.statusMessage}
        }else{
            return {success:false,message:'This room is not available.'}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}
//
let getchat = async(params) => {
    'use strict'
    try{
        var getscheduleList = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 1,
            query: {
                "roomId":params.room
            }
        };
        let scheduleList = await invoke.makeHttpCall("post", "read", getscheduleList);
        if( scheduleList && scheduleList.data&&scheduleList.data.statusMessage.length){
            return {success:true, message : scheduleList.data.statusMessage}
        }else{
            return {success:false,message:'This room is not available.'}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}

let storefeedback = async(params) => {
    'use strict'
    try{
        //console.log(JSON.stringify(params))
        var postdata = {
            url:process.env.MONGO_URI,
            database: "proctor",
            model: "webinar",
            docType: 0,
            query: params
        };
        let resultData = await invoke.makeHttpCall("post", "write", postdata);
        if( resultData.status ==200){
            return {success:true, message : "Interview end sucessfully"}
        }else{
            return {success:false, message : "Problem in Interview schedule"}
        }
    }catch(error){
        console.log(error)
        if(error && error.code=='ECONNREFUSED'){
            return {success:false, message:globalMsg[0].MSG000,status:globalMsg[0].status}
        }else{
            return {success:false, message:error}
        }
    }
}
let joined = async (params) => {
    try {
      var postdata = {
        url:process.env.MONGO_URI,
        database: "proctor",
        model: "webinar",
        docType: 1,
        query: [
          { $unwind: { path: "$joined", preserveNullAndEmptyArrays: true } },
          { $match : { roomId : params.roomId,"joined.join.email":params.join.email}}
        ]
      };
      let responseData = await invoke.makeHttpCall("post", "aggregate", postdata);
      if (responseData && responseData.data && responseData.data.statusMessage.length>0) {
        return { success: true, message: "Data already inserated"}
      } else if(responseData.data.statusMessage.length==0){
        var postdata = {
          url:process.env.MONGO_URI,
          database: "proctor",
          model: "webinar",
          docType: 0,
          query: params
        };
        let responseData = await invoke.makeHttpCall("post", "write", postdata);
        if (responseData && responseData.data && responseData.data.statusMessage) {
          return { success: true, message: "Record inserted sucessfull" }
        } else {
          return { success: false, message: 'Data Not inserted' }
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

module.exports={
    scheduleInterview,
    getscheduleList,
    roomValidation,
    storechat,
    getroom,
    getallroom,
    getchat,
    storefeedback,
    joined
}