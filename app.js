const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//database and models..
const sequelize = require('./util/database');
const User=require('./models/user');
const Message=require('./models/messages');


const cors = require('cors')

//routes.........
const signlogin=require('./routes/loginsignup');
 const messageroute=require('./routes/message');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());


app.use(signlogin);
app.use(messageroute);



 User.hasMany(Message);
Message.belongsTo(User);




sequelize
// .sync({ force: true })
.sync()
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err)
})

