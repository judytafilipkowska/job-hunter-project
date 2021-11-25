const router = require("express").Router();
const Job = require("../models/job.model");

router.get("/", (req, res) => {
    const jobId = req.params.jobId;
    Job.find()
        .then((allJobs) => {
            res.json[allJobs]

        })
})



module.exports = router; 