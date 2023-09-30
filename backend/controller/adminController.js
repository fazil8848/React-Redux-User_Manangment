const UserDb = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("../Routes/adminRouts");

const securedPassword = async (password) => {
  try {
    const bycryptedpas = await bcrypt.hash(password, 10);
    return bycryptedpas;
  } catch (error) {
    console.log(error);
  }
};

//=============== ADMIN LOGIN =====================//
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await UserDb.findOne({ email: email });
    if (exist) {
      if (exist.is_Admin === true) {
        const compared = await bcrypt.compare(password, exist.password);
        if (compared) {
          const admintoken = jwt.sign(
            { adminId: exist._id },
            process.env.tokenSecret,
            { expiresIn: "1h" }
          );
          res.json({ adminLoginData: exist, status: true, admintoken });
        } else {
          res.json({ alert: "Entered email is wrong" });
        }
      } else {
        res.json({ alert: "Not a valid admin" });
      }
    } else {
      res.json({ alert: "Email is not existing" });
    }
  } catch (error) {
    console.log(error);
  }
};

//============================ADD USER =======================//

const adminAddUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;
    const exist = await UserDb.findOne({ email: email });
    if (exist) {
      res.json({ alert: "Email already taken" });
    } else {
      const spassword = await securedPassword(password);
      const newData = new UserDb({
        userName: name,
        email: email,
        password: spassword,
        mobile: phone,
      });
      const userSavedData = await newData.save();
      const token = jwt.sign(
        { userId: userSavedData._id },
        process.env.tokenSecret,
        { expiresIn: "1h" }
      );
      res.json({ userSavedData, alert: "Registred", status: true, token });
    }
  } catch (error) {
    console.log(error);
  }
};

//========================= FOR ADMIN SIDE USERLIST ===========================//
const loadUsers = async (req, res) => {
  try {
    const userdata = await UserDb.find({ is_Admin: false });
    if (userdata) {
      res.json({ userdata, status: true });
    } else {
      res.json({ userdata, status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

//======================= FOR ADMIN DELETE USERS ================================//

const deleteUser = async (req, res) => {
  try {
    const id = req.body.userId;
    const userData = await UserDb.deleteOne({ _id: id });
    if (userData) {
      res.json({ delete: true, alert: "Deleted succesfully" });
    } else {
      res.json({ delete: false });
    }
  } catch (error) {
    console.log(error);
  }
};

//===================== ADMIN LOAD USER DATA UPDATE ==================================//

const loadUserData = async (req, res) => {
  try {
    const id = req.body.id;
    const userData = await UserDb.findOne({ _id: id });
    if (userData) {
      res.json({ userData, status: true });
    } else {
      res.json({ userData, status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

//==================== FOR ADMIN EDIT USER DATA =====================================//

const editUserByAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, number, email } = req.body;
    const updatedData = await UserDb.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          userName: name,
          mobile: number,
          email,
        },
      }
    );

    if (updatedData) {
      res.json({ updatedData, status: true, alert: "updation completed" });
    } else {
      res.json({ updatedData, status: false, alert: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminLogin,
  adminAddUser,
  loadUsers,
  deleteUser,
  loadUserData,
  editUserByAdmin,
};
