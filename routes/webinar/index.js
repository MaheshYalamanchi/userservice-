
module.exports = function (params) {
    var app = params.app;
    const scheduleInterviewService = require("./scheduleInterviewService");
    app.post('/scheduleinterview',async(req,res)=>{
        try {
            var custCode=req.headers['custcode'];
            req.body.custCode=custCode.split('#')[1];
            let scheduleInterviewResponse=await scheduleInterviewService.scheduleInterview(req.body)
            app.logger.info({success: true, message : scheduleInterviewResponse.message, request :req.body});
            app.http.customResponse(res, scheduleInterviewResponse,  200);
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })
    app.post('/getscheduleList',async(req,res)=>{
        try {
            let scheduleListResponse=await scheduleInterviewService.getscheduleList(req.body)
            app.logger.info({success: true, message : scheduleListResponse.message, request :req.body});
            app.http.customResponse(res, scheduleListResponse,  200);
        } catch (error) {
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })
    app.post('/checkroom',async(req,res)=>{
        try {
            //check room is already exists
            let roomValidation=await scheduleInterviewService.roomValidation(req.body)
            app.logger.info({success: true, message : roomValidation, request :req.body});
            app.http.customResponse(res, roomValidation,  200);
        } catch (error) {
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    }) 
    app.post('/chat',async(req,res)=>{
        try {
            console.log(req.body)
            var chat=[];
            //check room is already exists
            let getroom=await scheduleInterviewService.getroom(req.body)
            //console.log(JSON.stringify(getroom,'lllllllllllllllll'))
            if(getroom&&getroom.success){
                if(!getroom.message.chat){
                    getroom.message.chat=[req.body]
                }else{
                    getroom.message.chat.push(req.body)
                }
                //console.log(JSON.stringify(getroom))
                let storechat=await scheduleInterviewService.storechat(getroom.message)
                app.logger.info({success: true, message : storechat, request :req.body});
                app.http.customResponse(res, storechat,  200);
            }else{
                app.logger.info({success: true, message : getroom, request :req.body});
                app.http.customResponse(res, getroom,  200);
            }
            
           
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })
    //
    app.post('/video',async(req,res)=>{
        try {
            console.log(req.body)
            var video=[];
            //check room is already exists
            let getroom=await scheduleInterviewService.getroom(req.body)
            //console.log(JSON.stringify(getroom,'lllllllllllllllll'))
            if(getroom&&getroom.success){
                req.body.timer=new Date()
                if(!getroom.message.video){
                    getroom.message.video=[req.body]
                }else{
                    getroom.message.video.push(req.body)
                }
                //console.log(JSON.stringify(getroom))
                let storechat=await scheduleInterviewService.storechat(getroom.message)
                app.logger.info({success: true, message : storechat, request :req.body});
                app.http.customResponse(res, storechat,  200);
            }else{
                app.logger.info({success: true, message : getroom, request :req.body});
                app.http.customResponse(res, getroom,  200);
            }
            
           
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    }) 
    //
    app.post('/getallroom',async(req,res)=>{
        try {
           
            let getroom=await scheduleInterviewService.getallroom()
            app.logger.info({success: true, message : getroom, request :req.body});
            app.http.customResponse(res, getroom,  200);
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })
    app.post('/getchat',async(req,res)=>{
        try {
           
            let getroom=await scheduleInterviewService.getchat(req.body)
            app.logger.info({success: true, message : getroom, request :req.body});
            app.http.customResponse(res, getroom,  200);
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })        
    app.post('/save-feedback',async(req,res)=>{
        try {
            console.log(req.body)
            //check room is already exists
            let getroom=await scheduleInterviewService.getroom(req.body)
            if(getroom&&getroom.success){
                
                getroom.message.feedback=req.body.feedback
                getroom.message.status='Completed'
                getroom.message.feedbackProvidedBy=req.body.feedbackProvidedBy
                getroom.message.feedbackProvidedDate= new Date()

                let storefeedback=await scheduleInterviewService.storefeedback(getroom.message)
                app.logger.info({success: true, message : storefeedback, request :req.body});
                app.http.customResponse(res, storefeedback,  200);
            }else{
                app.logger.info({success: true, message : getroom, request :req.body});
                app.http.customResponse(res, getroom,  200);
            }
        } catch (error) {
            console.log(error)
            app.logger.error({success: false, message : error, request :req.body});
            if(error && error.message){
                app.http.customResponse(res,{success:false, message:error.message}, 400) 
            }else{
                app.http.customResponse(res,{success:false, message:error}, 400)
            }
        }
    })
    app.post('/webinar/joined', async(req, res) => {
        "use strict";
              try {
                  let result = await scheduleInterviewService.joined(req.body)
                  if (result && result.success) {
                    app.http.customResponse(res,{ success: true, message: result.message }, 200);
                  }  else {
                    app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
                } 
              } catch (error) {
                if (error && error.message) {
                    app.http.customResponse(res, { success: false, message: error.message }, 400)
                } else {
                    app.http.customResponse(res, { success: false, message: error }, 400)
                }
              }
      });
}