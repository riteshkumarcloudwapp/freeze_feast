
//home
export const home = async (req, res) => {
  try {
    return res.render("website/index");
  } catch (error) {
    console.log("home error",error.message);
    req.flash("error", "Something went wrong");
    return res.redirect("/freeze-feast");
  }
};

