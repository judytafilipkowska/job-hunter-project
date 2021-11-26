function isJobSeeker(req, res, next) {
if (req.session.user.accountType === "Job seeker") next();
else res.redirect('/login');
}

 module.exports = isJobSeeker;