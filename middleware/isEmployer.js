function isEmployer(req, res, next) {
    if(req.user.accountType === "Employer") next();
    else res.redirect('/login');
}

module.exports = isEmployer;