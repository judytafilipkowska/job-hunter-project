const router = require("express").Router();
const Job = require("../models/job.model");
const isLoggedIn = require("../middleware/isLoggedin");

//GET JOB PANEL -> needs get cause its first display of the page
router.get("/jobs/job-panel", isLoggedIn, (req, res) => {
  const {
    addedBy,
    position,
    remote,
    location,
    wage,
    description,
    companyName,
  } = req.body;

  Job.find()
    .then((foundedAll) => {
      res.render("jobs/job-panel", { foundedAll });
    })
    .catch((err) => console.log(err));
});

//GET ADD JOB
router.get("/jobs/add-job", isLoggedIn, (req, res) => {
  const user = req.session.user;
  let isEmployer = false;

  if (user.accountType === "Employer") {
    isEmployer = true;
  }
  res.render("jobs/add-job");
});

//POST ADD JOB
router.post("/jobs/add-job", isLoggedIn, (req, res) => {
  const user = req.session.user;
  const {
    addedBy,
    position,
    remote,
    location,
    wage,
    description,
    companyName,
  } = req.body;
  ////////////console.log(req.body);//
  let isEmployer = false;

  if (user.accountType === "Employer") {
    isEmployer = true;
  }

  Job.create({
    addedBy,
    position,
    remote,
    location,
    wage,
    description,
    companyName,
  })
    .then((createdJob) => {
      // Redirect to the page with the job details
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

//GET EDIT JOB
router.get("/jobs/:jobId/edit-job", (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .then((jobs) => {
      res.render("jobs/edit-job", { editedJobs: jobs });
    })
    .catch((err) => console.log(err));
});

//POST EDIT JOB
router.post("/jobs/:jobId/edit-job", (req, res) => {
  const jobId = req.params.jobId;
  const {
    addedBy,
    position,
    remote,
    location,
    wage,
    description,
    companyName,
  } = req.body;
  Job.findByIdAndUpdate(
    { addedBy, position, remote, location, wage, description, companyName },
    { new: true }
  )

    .then((updatedJob) => {
      res.redirect(`/jobs/details-job/${jobId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
