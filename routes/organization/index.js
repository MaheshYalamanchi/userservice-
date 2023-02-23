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
        res.status(200).send("Data not found");
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