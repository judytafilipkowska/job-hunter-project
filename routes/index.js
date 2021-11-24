const router = require("express").Router();
const Job = require("../models/job.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const { user } = req.session;
  let isNotLogged = user == undefined;
  let isEmployer = user?.accountType === "Employer";

  Job.find()
    .then((foundedAll) => {
      res.render("index", { isNotLogged, isEmployer, foundedAll });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
