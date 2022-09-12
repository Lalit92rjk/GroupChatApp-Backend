const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//database and models..
const sequelize = require('./util/database');
const User=require('./models/user');
const Message=require('./models/messages');
const Group=require('./models/groups');
const Usergroup=require('./models/usergroups');
const Groupmessage=require('./models/groupmessage');



const cors = require('cors')

//routes.........
const signlogin=require('./routes/loginsignup');
const messageroute=require('./routes/message');
const CreateGroup=require('./routes/creategroup');
const groupMsgrouter=require('./routes/groupmsgs');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());


app.use(signlogin);
app.use(messageroute);
app.use(CreateGroup);
app.use(groupMsgrouter);


User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});

User.hasMany(Groupmessage);
Groupmessage.belongsTo(User);

sequelize
// .sync({ force: true })
.sync()
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err)
})

