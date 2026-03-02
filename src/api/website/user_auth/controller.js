import Joi from "joi";
import bcrypt from "bcrypt";
import models from "../../../models/index.js";
import { session } from "express-session";

//website dashboard
export const dashboard = async (req, res) => {
  return res.render("website/index");
};

//login
export const userLogin = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body();
      const validation = Joi.validate({
        email: Joi.string().trim().lowercase().email().required(),
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
        return res.render("/freeze-feast/register");
      }
      //check for password
      const checkPassword = await bcrypt.compare(
        existedUser.password,
        password,
      );
      if (!checkPassword) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/freeze-feast/login");
      }
      //Create session
      req.session.userId = existedUser.id;
      req.session.role = existedUser.role;

      req.flash("success", "Login successful");
      return res.redirect("/freeze-feast/dashboard");
    }
    return res.render("website/pages/login");
  } catch (error) {
    console.error(error);
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
        email: Joi.string().trim().lowercase().email().required(),
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
      });

      req.flash("success", "User registered successfully");
      return res.redirect("/freeze-feast/login");
    }
    return res.render("website/pages/register");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/register");
  }
};
