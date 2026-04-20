//auth middleware is session based.
import { session } from 'express-session';

//Sirf logged in user
export const isAuthenticated = (req, res, next) => {

  if (req.session.user) return next();
  req.flash("error", "Please login first");
  return res.redirect("/freeze-feast/login");
};


//Sirf Admin
export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  req.flash("error", "Access denied");
  return res.redirect("/freeze-feast/login");
};
