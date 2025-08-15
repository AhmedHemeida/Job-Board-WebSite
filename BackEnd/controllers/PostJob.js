const Job = require("../models/jobMode");

const Users = require("../models/UsersModel");
const Secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { nameOfJob, loc, Disc } = req.body;

    if (!nameOfJob || !loc || !Disc)
      return res.status(400).json({ msg: "required fields" });

    const job = new Job({
      IdOfCompany: req.id,
      nameOfCompany: req.username,
      CompanyPhoto: req.photo,
      nameOfJob: nameOfJob,
      Location: loc,
      Disc: Disc,
    });

    await job.save();

     const fullJob = await Job.findById(job._id, { Applicants: 0, IdOfCompany: 0, __v: 0 });

    // ابعت على الـ socket
    req.io.emit("new-job", fullJob);


    res.status(201).json({ msg: "job posted..", jobId: job._id });
  } catch (error) {
    res.status(500).send("errorr in server" + error);
  }
};
