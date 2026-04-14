//About
export const about = async (req, res) => {
  try {
    return res.render("website/pages/about");
  } catch (error) {
    console.log("About error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast");
  }
};