
//cart
export const cart = async (req,res) => {
  try {
     return res.render("website/pages/cart");
  } catch (error) {
    console.log("cart error",error.message);
    req.flash("error","Something went wrong");
    return res.redirect("/freeze-feast");
  }
  
}
