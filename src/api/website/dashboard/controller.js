//category
export const category = async (req, res) => {
  try {
    return res.render("website/pages/product-list");
  } catch (error) {
    console.log("category error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/dashboard");
  }
};

//About
export const about = async (req, res) => {
  try {
    return res.render("website/pages/about");
  } catch (error) {
    console.log("About error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/dashboard");
  }
};

//contact
export const contact = async (req, res) => {
  try {
    return res.render("website/pages/contact");
  } catch (error) {
    console.log("contact error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast/dashboard");
  }
};

//cart
export const cart = async (req,res) => {
  try {
      return res.render("website/pages/cart");
  } catch (error) {
    console.log("cart error",error.message);
    req.flash("error","cart error");
    return res.redirect("/freeze-feast/dashboard");
  }
  
}

