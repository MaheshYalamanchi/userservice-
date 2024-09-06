const sharedSevices = require("../routes/sharedService");
const jwt_decode = require('jwt-decode');
module.exports = function (params) {
  var app = params.app;
  app.post('/user/rolecreation', async(req, res) => {
    "use strict";
          try {
            if(req.body.rolename){
              let result = await sharedSevices.rolecreation(req.body)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not inserted' }, 200);
            } 
            }else{
              res.send({ success: false, message: 'Please fill mandatory field.' });
            }
          }catch (error) {
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400)
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400)
            }
        }
  });
  app.get('/user/role', async(req, res) => {
    "use strict";
          try {
            let result = await sharedSevices.truestatus()
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
  app.put('/user/roleupdate/:roleid', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.roleupdate(req)
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
  app.delete('/user/roledelete/:roleId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.roledelete(req.params)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message:"delete successfully"}, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            } 
          }catch (error) {
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400)
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400)
            }
        }
  });
  app.get('/user/role/:roleid', async(req, res) => {
    "use strict";
          try {
            let result = await sharedSevices.getmenubasedonrole(req.params)
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
  app.post('/user/groupcreate', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupcreate(req.body)
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
  app.get('/user/groupget/:groupId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupget(req.params)
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
  app.put('/user/groupupdate/:groupId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupupdate(req)
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
  app.delete('/user/groupdelete/:groupId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupdelete(req.params)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: "delete successfully"}, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            } 
          }catch (error) {
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400)
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400)
            }
        }
  });
 app.post('/user/menucreate', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menucreate(req.body)
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
  app.post('/user/menuget', async(req, res) => {
    "use strict";
          try {
            if(req && req.body){
              let result = await sharedSevices.menuget(req.body)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
              } 
            } else {
              app.http.customResponse(res, { success: false, message: 'Missing requset body' }, 200);
            }
          } catch (error) {
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400)
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400)
            }
          }
  });
  app.put('/user/menuupdate/:menuId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menuupdate(req)
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
  app.delete('/user/menudelete/:menuId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menudelete(req)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            } 
          }catch (error) {
            if (error && error.message) {
                app.http.customResponse(res, { success: false, message: error.message }, 400)
            } else {
                app.http.customResponse(res, { success: false, message: error }, 400)
            }
        }
  });
  app.post('/user/sessionstatus', async(req, res) => {
    "use strict";
    if(req && req.body && req.body.token ){
      var decodeToken = jwt_decode(req.body.token)
      try {
        let result = await sharedSevices.sessionstatus(decodeToken)
        if (result && result.success) {
          app.http.customResponse(res,{ success: true, message: result.message }, 200);
        }  else {
          app.http.customResponse(res, { success: false, message: 'Data Not found' }, 200);
      } 
      }catch (error) {
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400)
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400)
        }
      }
    }else if (req && req.body && req.body.roomid){
      try {
        let result = await sharedSevices.sessionstatus(req)
        if (result && result.success) {
          app.http.customResponse(res,{ success: true, message: result.message }, 200);
        }  else {
          app.http.customResponse(res, { success: false, message: 'Data Not found' }, 200);
      } 
      }catch (error) {
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400)
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400)
        }
      }
    }
});
  app.get('/user/reportlog/:roomId/:userId', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.reportlog(req.params)
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
  app.post('/user/overview', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.overview(params.body)
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
  app.post('/user/getSessionsStatus', async(req, res) => {
    "use strict";
    try {
      if(req && req.body){
        let result = await sharedSevices.getSessionsStatus(req.body)
        if (result && result.success) {
          app.http.customResponse(res,{ success: true, message: result.message }, 200);
        }  else {
          app.http.customResponse(res, { success: false, message: 'Data Not found' }, 200);
        }
      } else {
        app.http.customResponse(res, { success: false, message: 'Provide proper input details' }, 200);
      }
    }catch (error) {
      if (error && error.message) {
          app.http.customResponse(res, { success: false, message: error.message }, 400)
      } else {
          app.http.customResponse(res, { success: false, message: error }, 400)
      }
    }
  });

  app.post('/user/getScheduleList', async(req, res) => {
    "use strict";
          try {
            let result = await sharedSevices.getScheduleList(req.body)
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
  app.post('/user/broadcastMessages', async(req, res) => {
    "use strict";
          try {
            let result = await sharedSevices.broadcastMessages(req.body)
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
  app.post("/api/auth", async (req, res) => {
    "use strict";
    try {
        // console.log(JSON.stringify(req.body),'api/auth........')
        let result = await sharedSevices.proctorAuthCall(req.body)
        if (result && result.success) {
            app.logger.info({ success: true, message: result.message });
            app.http.customResponse(res, result.message, 200);
        } else {
            app.logger.info({ success: false, message: result.message });
            app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
        }
    } catch (error) {
        console.log("auth Error Body========>>>>",JSON.stringify(req.body))
        console.log(error,"authError1====>>>>")
        app.logger.error({ success: false, message: error });
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400)
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400)
        }
    }
  });
  app.post('/api/room/next', async (req, res,next) => {
    try {
        if(req.body){
            let result = await sharedSevices.getDatails(req);
            if (result && result.success) {
                app.logger.info({ success: true, message: result.message });
                app.http.customResponse(res, result.message, 200);
                console.log("finding request=========>>>>>",JSON.stringify(result.message.json))
                let getDatailsApproveResposne = await sharedSevices.getDatailsApprove(result.message.json)
            } else {
                app.logger.info({ success: false, message: result.message });
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            }
        }else{
            app.http.customResponse(res, { success: false, message: 'authorization error' }, 200);
        }
    } catch (error) {
        console.log("next Error Body1========>>>>",JSON.stringify(req.body))
        console.log("next Error1========>>>>",error)
        app.logger.error({ success: false, message: error });
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400);
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400);
        }
    }
  });
  app.post('/user/fetchingStatus', async (req, res,next) => {
    try {
        if(req.body){
            let result = await sharedSevices.fetchStreamStatus(req.body);
            if (result && result.success) {
                app.logger.info({ success: true, message: result.message });
                app.http.customResponse(res, { success: true, message: result.message }, 200);
            } else {
                app.logger.info({ success: false, message: result.message });
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
            }
        }else{
            app.http.customResponse(res, { success: false, message: 'authorization error' }, 200);
        }
    } catch (error) {
        console.log("fetchStatus Body1========>>>>",JSON.stringify(req.body))
        console.log("fetchStatus Error1========>>>>",error)
        app.logger.error({ success: false, message: error });
        if (error && error.message) {
            app.http.customResponse(res, { success: false, message: error.message }, 400);
        } else {
            app.http.customResponse(res, { success: false, message: error }, 400);
        }
    }
  });
}