var express = require('express');
var router = express.Router();
const sharedSevices = require("../routes/sharedService");


router.post('/rolecreation', async(req, res) => {
  "use strict";
        try {
          if(req.body.rolename){
            let result = await sharedSevices.rolecreation(req.body)
              if (result && result.success) {
                  res.send({ success: true, message: result.message });
              } else {
                  res.send({ success: false, message: result.message });
              }
          }else{
            res.send({ success: false, message: 'Please fill mandatory field.' });
          }
           
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

router.get('/get', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.creationget()
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

router.put('/update', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.roleput(req.body)
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

router.delete('/delete', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.deleterole(req)
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

router.post('/creategroup', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.creategroup(req.body)
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

router.get('/groupget', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.groupget()
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});
router.put('/groupupdate', async(req, res) => {
  "use strict";
        try {
            let result = await sharedSevices.groupupdate(req.body)
            if (result && result.success) {
                res.send({ success: true, message: result.message });
            } else {
                res.send({ success: false, message: result.message });
            }
        } catch (error) {
          res.send({ success: false, message: error });
        }
});

module.exports = router