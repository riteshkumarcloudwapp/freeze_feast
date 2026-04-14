import Joi from "joi";
import models from "../../../models/index.js";


//contact
export const contact = async (req, res) => {
  try {
    console.log("METHOD:", req.method);

    if (req.method === "POST") {

      
      console.log("POST HIT");
      console.log("BODY:", req.body);

      const { name, email, phone_number, subject, description } = req.body;

      const validation = Joi.object({
        name: Joi.string().trim().min(2).max(255).required(),
        email: Joi.string().trim().lowercase().email().required(),
        phone_number: Joi.string()
          .trim()
          .required(),
        subject: Joi.string().trim().min(3).required(),
        description: Joi.string().trim().min(5).required(),
      });

      const { error } = validation.validate(req.body);

      if (error) {
        console.log("VALIDATION ERROR:", error.message);
        req.flash("error", error.message);
        return res.redirect("/freeze-feast/contact");
      }

      await models.Contact.create({
        name,
        email,
        phone_number,
        subject,
        description,
      });

      req.flash("success", "Message sent successfully!");
      return res.redirect("/freeze-feast/contact");
    }

     return res.render("website/pages/contact");

  } catch (error) {
    console.log("contact error", error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/contact");
  }
};
