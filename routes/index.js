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
  app.get('/user/menuget', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menuget(req.query.role)
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
  app.get('/user/overview', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.overview()
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
}