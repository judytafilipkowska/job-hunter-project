function isEmployer(req, res, next) {
  if (req.session.user.accountType !== "Employer") {
    return res.redirect("/");
  }
  next();
}

module.exports = isEmployer;
