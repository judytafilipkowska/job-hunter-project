const router = require("express").Router();
const Job = require("../models/job.model");
const isLoggedIn = require("../middleware/isLoggedin");
const isEmployer = require("../middleware/isEmployer");
const isJobSeeker = require("../middleware/isJobSeeker");

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

//GET APPLIED JOBS

router.get("/jobs/applied-jobs", isLoggedIn, isJobSeeker, (req, res) => {
  const { user } = req.session;
  Job.find({ appliedBy: user._id })
    .then((appliedJobs) => {
      res.render("jobs/applied-jobs", { appliedJobs });
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
  const { position, remote, address, wage, description, companyName } =
    req.body;

  Job.create({
    addedBy: user._id,
    position,
    remote,
    address,
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
  // const { user } = req.session;
  const jobId = req.params.jobId;
  // let isJobSeeker = false;

  // console.log(user);

  // if (user.accountType === "Job seeker") {
  //   isEmployer = true;
  // }

  Job.findById(jobId)
    .then((job) => {
      res.render("jobs/job-detail", { job });
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
    address,
    wage,
    description,
    companyName,
  } = req.body;
  Job.findByIdAndUpdate(
    { addedBy, position, remote, address, wage, description, companyName },
    { new: true }
  )

    .then((updatedJob) => {
      res.redirect(`/jobs/details-job/${jobId}`);
    })
    .catch((err) => console.log(err));
});


router.get("/jobs/display-all", (req, res) => {
  Job.find()
      .then((allJobs) => {
          res.json(allJobs)

      })
})

module.exports = router;
