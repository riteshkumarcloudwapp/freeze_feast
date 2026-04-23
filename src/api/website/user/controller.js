import Joi from "joi";
import models from "../../../models/index.js";

//user_profile
export const userProfile = async (req,res)=>{
  try {

    if(req.method === "POST"){

      const user_id = req.session.user.id;
      const {fullName, email, phone_number, city, postcode, address} = req.body;

      //validate
      const validation = Joi.object({
        fullName: Joi.string().trim().min(2).max(255).allow("",null),
        email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/).allow("",null), 
        phone_number: Joi.string().pattern(/^\+?[0-9]{10,15}$/).allow("",null),
        city: Joi.string().max(100).allow("",null),
        postcode: Joi.string().min(4).max(6).allow("",null),
        address: Joi.string().trim().allow("",null),
      })

      const {error} = validation.validate(req.body);
      if (error) {
        req.flash("error", error.details[0].message);
        return res.redirect("/freeze-feast/user-profile");
      }

      //check for file data
      if(!req.file){
        req.flash("error", "Please upload a profile picture");
        return res.redirect("/freeze-feast/user-profile");
      }

      //fetch the user
      const user = await models.User.findByPk(user_id);
      if(!user){
        req.flash("error", "User not found");
        return res.redirect("/freeze-feast/user-profile");
      }
      
      //update
      await user.update({
        fullName: fullName ?? user.fullName, 
        email: email ?? user.email, 
        phone_number: phone_number, 
        city: city, 
        postcode: postcode, 
        address: address,
        profile_picture: req.file?.filename
      });

      req.flash("success", "Profile updated successfully");
      return res.redirect("/freeze-feast/user-profile");

    }

    //get
    if (!req.session.user) {
      req.flash("error", "Please login to view your profile");
      return res.redirect("/freeze-feast/login");
    }

    return res.render("website/pages/userProfile", {
        user: req.session.user,
    });    

  } catch (error) {
    console.log("userProfile API error:",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/user-profile");
  }
}