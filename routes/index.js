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
            if (req.query && req.query.limit && req.query.filter ) {
              let result = await sharedSevices.roleget(req);
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              } else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
              }
            }else if(req.query && req.query.limit ) {
              let result = await sharedSevices.roleget(req);
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              } else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
              }
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
              let result = await sharedSevices.roleupdate(req.body)
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
  app.delete('/roledelete', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.roledelete(req.body)
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
  app.post('/groupcreate', async(req, res) => {
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
  app.get('/groupget', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupget()
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
  app.put('/groupupdate', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupupdate(req.body)
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
  app.delete('/groupdelete', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.groupdelete(req.body)
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
 app.post('/menucreate', async(req, res) => {
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
  app.get('/menuget', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menuget()
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
  app.put('/menuupdate', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menuupdate(req.body)
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
  app.delete('/menudelete', async(req, res) => {
    "use strict";
          try {
              let result = await sharedSevices.menudelete(req.body)
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

}