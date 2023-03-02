const sharedSevices = require("./sharedService");
const globalMsg = require('../../configuration/messages/message');
module.exports = function (params) {
    var app = params.app;

app.post("/organization", async (req, res) => {
  "use strict";
  try {  
      let result = await sharedSevices.orgEntery(req.body)
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
app.get("/getOrgDetails", async (req, res) => {

    "use strict";
    try {
        let result = await sharedSevices.OrgDetails(req)
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
app.put("/orguserId/:id", async (req, res) => {
    "use strict";
    try {
        if (req && req.body) {
            let result = await sharedSevices.orgEdit(req.body);
            if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            } 
        } else {
            app.http.customResponse(res, { success: false, message: 'requset body error' }, 200);
        }
    } catch (error) {
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400)
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400)
        }
    }
});
app.delete("/org/:UserId", async (req, res) => {
    "use strict";
    try {
        let result = await sharedSevices.orgDelete(req.body)
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