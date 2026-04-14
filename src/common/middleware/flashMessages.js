

const flashMessages = (req, res, next) => {
  // Har EJS template mein automatically available ho jayega
  res.locals.success = req.flash("success");
  res.locals.error   = req.flash("error");
  res.locals.info    = req.flash("info");
  res.locals.warning = req.flash("warning");
  next();
};

export default flashMessages;