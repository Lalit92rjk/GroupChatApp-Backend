const express = require("express");

const router = express.Router();

const groupMessageController = require("../controllers/groupmessage");

const aut = require('../middleware/authentication');



router.post('/postgroupmsgs/:id', aut.authenticate, groupMessageController.postGroupMessage );

router.get('/getgrpmsgs/:id', aut.authenticate, groupMessageController.getGroupMessage);

router.post("/removepart/:id", aut.authenticate, groupMessageController.postRemove);

router.post("/makeuseradmin/:id", aut.authenticate, groupMessageController.postUserAdmin);



module.exports=router;