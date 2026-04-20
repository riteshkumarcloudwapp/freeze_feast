
const flashMessages = (req, res, next) => {
  res.locals.success     = req.flash("success");
  res.locals.error       = req.flash("error");
  res.locals.info        = req.flash("info");
  res.locals.warning     = req.flash("warning");
  
  // Add this one line
  res.locals.currentUser = req.session.user || null;
  
  next();
};

export default flashMessages;