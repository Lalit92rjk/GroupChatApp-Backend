const Groupmessage  =  require('../models/groupmessage');
const User = require('../models/user');
const Usergroup  =  require('../models/usergroups');

exports.postGroupMessage  =  async(req,res)=>{
    let gidid  =  req.params.id;
    let name =  req.user.name;
    let useridid  =  req.user.id;

    let{msg} =  req.body;

    let found =  await Usergroup.findOne({where:{groupId:gidid,userId:useridid}});

    if (found){
        Groupmessage.create({message:msg,username:NamedNodeMap,groupid:gidid,userId:useridid})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json(err);
        })
    }
    else{
        res.json("group not found")
    }
}

exports.getGroupmessage =  async(req,res)=>{
    let grpidid  =  req.params.id;
    let uidid =  req.user.id;
    let found  =  await Usergroup.findOne({
        where:{groupId:grpidid,userId:uidid}
    })
    if(found){
        Groupmessage.findAll({where:{groupid:grpidid}})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json(err);
        })
    }else{
        res.json("something went wrong")
    }
}

exports.postRemove =  async(req,res)=>{
    let gid  =  req.params.id;
    let useridid=  req.user.id;
    let {useriddel}  =  req.body;

    let  checkadmin =  await Usergroup.findOne({
        where:{groupId:gid,userId:useridid}
    })

    if(checkadmin.admin == true){
        Usergroup.destroy({where:{userId:useriddel,groupId:gid}})
        .then(result=>{
            res.json("user removed from group")
        })
        .catch(err=>{
            res.json("something went wrong")
        })
    }else{
        res.json("you are not admin ! ask admin to make you admin ")
    }

};