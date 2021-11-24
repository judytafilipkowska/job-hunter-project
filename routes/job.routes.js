const router = require("express").Router();
const Job = require("../models/job.model");
const isLoggedIn = require("../middleware/isLoggedin");
const isEmployer = require("../middleware/isEmployer");

//GET JOB PANEL -> needs get cause its first display of the page
router.get("/jobs/job-panel", isLoggedIn, isEmployer, (req, res) => {
  const { user } = req.session;
  Job.find({ addedBy: user._id })
    .then((foundedAll) => {
      console.log(foundedAll);
      res.render("jobs/job-panel", { foundedAll });
    })
    .catch((err) => console.log(err));
});

//GET ADD JOB
router.get("/jobs/add-job", isLoggedIn, isEmployer, (req, res) => {
  /*   const user = req.session.user;
  let isEmployer = false;

  if (user.accountType === "Employer") {
    isEmployer = true;
  } */
  res.render("jobs/add-job");
});

//POST ADD JOB
router.post("/jobs/add-job", isLoggedIn, (req, res) => {
  const user = req.session.user;
  const { position, remote, location, wage, description, companyName } =
    req.body;

  Job.create({
    addedBy: user._id,
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

router.get("/jobs/:jobId/details", (req, res) => {
  const jobId = req.params.jobId;
  let isJobSeeker = false;

  if (user.accountType === "Job seeker") {
    isEmployer = true;
  }

  Job.findById(jobId)
    .then((job) => {
      res.render("jobs/job-detail", isJobSeeker, { job: job });
    })
    .catch((err) => console.log(err));
});

//GET EDIT JOB
router.get("/jobs/:jobId/edit-job", (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .then((job) => {
      console.log(job);
      res.render("jobs/edit-job", { editedJob: job });
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
