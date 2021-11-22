const router = require("express").Router();
const Job = require("../models/job.model");

//Routes

//GET panel job
router.get("/jobs/job-panel", (req, res) => {
  res.render("jobs/job-panel");
});

//POST panel JOB

router.post("/jobs/job-panel", (req, res) => {
  const { addedBy, position, remote, location, wage, description } = req.body;

  Job.find()
    .then((findedAll) => {
      res.render("jobs/job-panel", findedAll);
    })
    .catch((err) => console.log(err));
});

//GET ADD-JOB

router.get("/jobs/add-job", (req, res) => {
  res.render("jobs/add-job");
});

//POST add-job
router.post("/jobs/add-job", (req, res) => {
  const { addedBy, position, remote, location, wage, description } = req.body;

  Job.create({
    addedBy,
    position,
    remote,
    location,
    wage,
    description,
  })

    .then((createdJob) => {
      // Redirect to the page with the job details
      res.redirect(`/jobs/job-panel/${createdJob._id}`);
    })
    .catch((err) => console.log(err));
});

//GET edit-job

router.get("/jobs/:jobId/edit-job", (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .then((jobs) => {
      res.render("jobs/edit-job", { editedJob: jobs });
    })
    .catch((err) => console.log(err));
});

//Post edit-job
// POST
router.post("/jobs/:jobId/edit", (req, res) => {
  const jobId = req.params.jobId;
  const { addedBy, position, remote, location, wage, description } = req.body;

  Job.findByIdAndUpdate(
    jobId,
    {
      addedBy,
      position,
      remote,
      location,
      wage,
      description,
    },
    { new: true }
  )
    .then((updatedJob) => {
      res.redirect(`/jobs/job-panel/${jobId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
