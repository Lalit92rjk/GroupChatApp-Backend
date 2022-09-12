const express = require('express');

const router = express.Router();

const aut = require('../middleware/authentication');

const groupController = require("../controllers/createGroup");


router.get('/getgrpname/:id', aut.authenticate, groupController.getGroupName)

router.post('/creategrp', aut.authenticate, groupController.postCreateGroup);

router.get('/getallgroups', aut.authenticate, groupController.getAllGroups);

router.post('/addparticipants/:id', aut.authenticate, groupController.postAddParticipants);

router.get('/grpparticipants/:id', aut.authenticate, groupController.getGroupParticipants)


module.exports = router;