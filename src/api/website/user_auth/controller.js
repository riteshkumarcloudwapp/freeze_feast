import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../../../models/index.js";
import session from "express-session";
import sendEmailSMTP from "../../../utils/emailService.js";

//website dashboard
export const dashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/freeze-feast/login");
  }
  return res.render("website/index");
};

//login
export const userLogin = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      const validation = Joi.object({
        email: Joi.string().trim().lowercase() .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/).required(),
        password: Joi.string().min(8).required(),
      });
      const { error } = validation.validate(req.body);
      if (error) return res.json({ status: false, message: error.message });

      //check for existance of user
      const existedUser = await models.User.findOne({
        where: { email },
      });
      if (!existedUser) {
        req.flash("error", "User not registered");
        return res.redirect("/freeze-feast/register");
      }
      //check for password
      const checkPassword = await bcrypt.compare(
        password,
        existedUser.password,
      );
      if (!checkPassword) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/freeze-feast/login");
      }

      //Create session
      // req.session.userId = existedUser.id;
      // req.session.role = existedUser.role;
      req.session.user = {
        id: existedUser.id,
        email: existedUser.email,
        role: existedUser.role 
      }

      console.log('token---',req.session.user);
      
      // Role ke hisaab se redirect karo
      if (existedUser.role === "admin") {
      return res.redirect("/freeze-feast/admin/dashboard");
      }

      req.flash("success", "Login successful");
      return res.redirect("/freeze-feast");
    }

    return res.render("website/pages/login");
  } catch (error) {
    console.error("Login user API error:",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/login");
  }
};

//register
export const registerUser = async (req, res) => {
  try {
    if (req.method === "POST") {
      //get data from client
      const { fullName, email, password, confirmPassword } = req.body;
      //validation
      const validation = Joi.object({
        fullName: Joi.string().trim().required(),
        email: Joi.string().trim().lowercase().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/).required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .messages({
            "any.only": "Passwords do not match",
          }),
        terms: Joi.boolean().truthy("on").valid(true).required(),
      });
      const { error } = validation.validate(req.body);
      if (error) return res.json({ status: false, message: error.message });

      //check User exist or not
      const existUser = await models.User.findOne({
        where: { email },
      });
      if (existUser) {
        req.flash("error", "User already exists");
        return res.redirect("/freeze-feast/login");
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create user
      await models.User.create({
        fullName,
        email,
        password: hashedPassword,
        role: "user" 
      });

      req.flash("success", "User registered successfully");
      return res.redirect("/freeze-feast/login");
    }

    return res.render("website/pages/register", {
      error: req.flash("error"),
      success: req.flash("success")
    });
  } catch (error) {
    console.error("Register User API:",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/register");
  }
};

//forget password
export const forgetPassword = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/freeze-feast/forgot");
      }

    const token = jwt.sign(
      {id : user.id, role: user.role},
     process.env.JWT_SECRET,
      {expiresIn: '5m'}
    );

    
     const resetLink = `http://localhost:4004/freeze-feast/change-password?token=${token}`;
      console.log("Reset Link:", resetLink);

      //Send Email
      await sendEmailSMTP(
        email,
        "Reset Password",
        "forgetPassword",   // template name
        {
        name: user.fullName,
        resetLink,
        year: new Date().getFullYear(),
        }    
      );

      req.flash("success", "Reset link sent to your email");
      return res.redirect("/freeze-feast/login");
    }

    return res.render("website/pages/forgot", {
      error: req.flash("error"),
      success: req.flash("success"),
    });

  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/forgot");
  }
};

//reset password
export const changePassword = async (req,res) => {
  try {

    const {token} = req.params;
    const {newPassword, confirmPassword} = req.body;

    const validation = Joi.object({
      newPassword: Joi.string()
                      .min(8)
                      .required(),

      confirmPassword: Joi.string()
                          .required()
                          .valid(Joi.ref('newPassword'))
                          .messages({
                          "any.only": "Passwords do not match",
                          "string.empty": "Confirm password is required"
                        })

     })

    const {error} = validation.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      return res.redirect("back");
    }

    // get token and decode it.
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if(!decodedToken){
       req.flash("error", "Invalid or expired token");
       return res.redirect("/freeze-feast/login");
    }

   //Fetch user from token
    const user = await models.User.findOne({
      where: { id: decodedToken.id },
    });

    if(!user){
      req.flash("error","User not found");
      return res.redirect("/freeze-feast/register");
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(newPassword,8);

    user.password = hashedPassword;
    await user.save();

    //response
    req.flash("success", "Password changed successfully");
    return res.redirect("/freeze-feast/login");
    
  } catch (error) {
    console.log("resetPassword error:",error);
    req.flash("error","Something went wrong");
    return res.redirect("/freeze-feast/change-password")
  }
  
}