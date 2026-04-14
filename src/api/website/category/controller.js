//category
export const category = async (req, res) => {
  try {
    return res.render("website/pages/product-list");
  } catch (error) {
    console.log("category error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast");
  }
};
