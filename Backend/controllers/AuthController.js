const UserModel = require("../models/UserModel");
const { SecretToken } = require("../util/SecretToken");
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res) => {
  try {
    const { email, username, password, createdAt } = req.body;
    // console.log(req.body);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    else {
      let hashedPass = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        email: email,
        username: username,
        password: hashedPass,
        createdAt: createdAt

      });

      const token = SecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({ message: "User signed in successfully", success : true });
    }
  } catch (error) {
    res.json({message : `something went wrong ${error}`});
  }
};

// login route 

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = SecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(202).json({ message: "User logged in successfully", success : true });
  } catch (error) { res.json(error) }
}