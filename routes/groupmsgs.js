const express  =  require('express');

const router     =  express.Router()

const groupMessageController =  require("../controllers/groupmessage");

const aut  =  require("../middleware/authentication");

router.post('/postgroupmsgs/:id',aut.authenticate,groupMessageController.postGroupMessage);

router.get('/getgrpmsgs/:id',aut.authenticate,groupMessageController.getGroupmessage);

router.post('/removepart/:id',aut.authenticate,groupMessageController.postRemove);

module.exports  =  router;