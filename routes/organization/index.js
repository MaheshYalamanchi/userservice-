const sharedSevices = require("./sharedService");
const globalMsg = require('../../configuration/messages/message');
module.exports = function (params) {
    var app = params.app;

app.post("/organization", async (req, res) => {
  "use strict";
  try {
      let result = await sharedSevices.orgEntery(req.body)
      if (result && result.success) {
        res.status(200).send(result.message);
      } else {
        res.status(200).send("data not inserted");
      }
  }catch(error){
    if (error && error.code == 'ECONNREFUSED') {
        return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
    } else {
        return { success: false, message: error }
    }
  }
});
app.get("/getOrgDetails", async (req, res) => {

    "use strict";
    try {
        let result = await sharedSevices.OrgDetails(req)
        if (result && result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(200).send("data not found");
        }
    }catch(error){
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
});
app.put("/org/:userId", async (req, res) => {
    "use strict";
    try {
        if (req && req.body) {
            let result = await sharedSevices.orgEdit(req);
            if (result && result.success) {
                res.status(200).send(result.message);
            } else {
                res.status(200).send("data not found");
            }
        } else {
            app.http.customResponse(res, { success: false, message: 'requset body error' }, 200);
        }
    }catch(error){
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
});
app.delete("/org/:UserId", async (req, res) => {
    "use strict";
    try {
        let result = await sharedSevices.orgDelete(req.params)
        if (result && result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(200).send("data not found");
        }
    }catch(error){
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
});

}