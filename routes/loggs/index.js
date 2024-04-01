const services = require("./logservice");
const invoke = require("../../lib/http/invoke");
module.exports = function (params) {
    var app = params.app;
    
    app.post('/api/reportlog', async (req, res,next) => {
        try {
            if(req.body){
                let result = await services.reportlog(req.body);
                if (result && result.success) {
                    // let response = await invoke.makeHttpCall("get", "closeconnection");
                    app.logger.info({ success: true, message: result.message });
                    app.http.customResponse(res, result.message, 200);
                } else {
                    app.logger.info({ success: false, message: result.message });
                    app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
                }
            }else{
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            }
        } catch (error) {
            app.logger.error({ success: false, message: error });
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400);
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400);
            }
        }
    });
    app.post('/api/chat/screen/:roomId', async (req, res,next) => {
        try {
            if(req.params){
                req.params.authorization = req.body.authorization 
                let result = await services.screenshotget(req.params);
                if (result && result.success) {
                    app.http.customResponse(res,{ success: true, message: result.message }, 200);
                  }  else {
                    app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
                  } 
            }else{
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            }
        } catch (error) {
            app.logger.error({ success: false, message: error });
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400);
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400);
            }
        }
    });
}