const User = require("../Model/userModel");
const bcrypty = require("bcrypt");
const jwt = require("jsonwebtoken");


const securedPassword = async (password) => {
  try {
    const passwordHash = await bcrypty.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};

//====================== USER SIGN UP ==================//
const userRegistration = async (req, res) => {
  try {
  
    const { name, email, phone, password } = req.body;
    const spassword = await securedPassword(password);
    const exist = await User.findOne({ email: email });

    if (exist) {
      res.json({ alert: "Email already exist", status: false });
    } else {
      const user = new User({
        userName: name,
        email: email,
        password: spassword,
        mobile: phone,
      });

      const userSavedData = await user.save();
      const token = jwt.sign(
        { userId: userSavedData._id },
        process.env.tokenSecret,
        {
          expiresIn: "1h",
        }
      );
      res.json({ userSavedData, alert: "registration", token, status: true });
    }
  } catch (error) {
    console.log(error);
  }
};

//====================== USER LOGIN ==========================//

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({email:email});
    
    if (exist) {
      const compared = await bcrypty.compare(password, exist.password);
      if (compared) {
        let token = jwt.sign({ userId: exist._id }, process.env.tokenSecret, {
          expiresIn: "1h",
        });
        res.json({
          userLogindata: exist,
          status: true,
          err: null,
          token,
        });
      }else{
      res.json({ alert: "Entered password is incorect !" });
      }
    } else {
      res.json({ alert: "Email not exist !" });
    }
  } catch (error) {
    console.log(error);
  }
};

//============== USER IMAGE UPLOAD OPTION ======================//

const userImage = async (req, res) => {
  try {
    const id = req.body.userId;
    const image = req.file.filename;
    const updatedImage = await User.findOneAndUpdate(
      { _id: id },
      { $set: { image: image } },
      { new: true }
    ).then((response) => {
      res.json({ updated: true, data: response });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userImage,
};
