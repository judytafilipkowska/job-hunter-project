const router = require("express").Router();
const Job = require("../models/job.model");

//GET JOB PANEL -> needs get cause its first display of the page
router.get("/jobs/job-panel", (req, res) => {
  const { addedBy, position, remote, location, wage, description } = req.body;

  Job.find().then((foundedAll) => {
    res.render("jobs/job-panel", foundedAll).catch((err) => console.log(err));
  });
});

//GET ADD JOB
router.get("/jobs/add-job", (req, res) => {
  res.render("jobs/add-job");
});

//POST ADD JOB
router.post("/jobs/add-job", (req, res) => {
  const { addedBy, position, remote, location, wage, description } = req.body;

  Job.create({ addedBy, position, remote, location, wage, description })
    .then((createdJob) => {
      // Redirect to the page with the job details
      res.redirect(`/jobs/job-panel/${createdJob._id}`);
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
  const { addedBy, position, remote, location, wage, description } = req.body;
  Job.findByIdAndUpdate(
    { addedBy, position, remote, location, wage, description },
    { new: true }
  )

    .then((updatedJob) => {
      res.redirect(`/jobs/details-job/${jobId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
