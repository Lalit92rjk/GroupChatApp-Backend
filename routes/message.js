const express = require('express');

const router = express.Router();

const chatController = require("../controllers/message");

const aut = require('../middleware/authentication');


router.post('/chatmessage', aut.authenticate, chatController.postMessage);

router.get('/getmessages', aut.authenticate, chatController.getMessage);

router.get('/user',aut.authenticate, chatController.getUsers);


module.exports = router;