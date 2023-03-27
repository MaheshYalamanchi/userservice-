const sharedSevices = require("../routes/sharedService");
module.exports = function (params) {
  var app = params.app;
  app.post('/api/role', async(req, res) => {
    "use strict";
          try {
            if(req.body){
              let result = await sharedSevices.rolecreation(req.body)
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              }  else {
                app.http.customResponse(res, { success: false, message: result.message }, 200);
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
  app.get('/api/role', async(req, res) => {
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
  app.put('/roleupdate', async(req, res) => {
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
  app.get('/api/group', async(req, res) => {
    "use strict";
          try {
            if (req.query && req.query.limit && req.query.filter ) {
              let result = await sharedSevices.groupget(req);
              if (result && result.success) {
                app.http.customResponse(res,{ success: true, message: result.message }, 200);
              } else {
                app.http.customResponse(res, { success: false, message: 'Data Not Found' }, 200);
              }
            }else if(req.query && req.query.limit ) {
              let result = await sharedSevices.groupget(req);
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
  app.get('/api/role/:roleid', async(req, res) => {
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
  app.get('/api/group/:groupname', async(req, res) => {
    "use strict";
          try {
            let result = await sharedSevices.getgroupnamebased(req.params.groupname)
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