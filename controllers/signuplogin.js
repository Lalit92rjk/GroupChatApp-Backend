const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.postsignup = async(req, res) => {
  const { name, email, phonenumber, pwd } = req.body;

  const password = await bcrypt.hash(pwd, 10);

  User.create({
    name,
    email,
    phonenumber,
    password,
  })
    .then((result) => {
      res.json({ result, suc: true });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.postlogin = async (req, res) => {
  const { email, pwd } = req.body;

  const user = await User.findAll({ where: { email: email } });

  if (user.length > 0) {
    const dbid = user[0].id;
    const dbemail = user[0].email;
    const dbpassword = user[0].password;
    const dbname = user[0].name;
    const dbphonenumber = user[0].phonenumber;

    const emailpwdmatch = await bcrypt.compare(pwd, dbpassword);

    if (emailpwdmatch) {
      const token = jwt.sign(dbid, `${process.env.TOKEN_SECRET}`);
      res.status(200).json({ msg: "login successful", token: token });
    } else {
      res.status(401).json({ msg: "something went wrong" });
    }
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};