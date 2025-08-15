const Job = require("../models/jobMode");
const Applic = require("../models/ApplyForJob");
const Users = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const Secret = process.env.JWT_SECRET;

const GetMyPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find(
      { IdOfCompany: req.id },
      { CompanyPhoto: 1, nameOfJob: 1, Disc: 1, Location: 1 }
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
};




const GetAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}, { Applicants: 0, IdOfCompany: 0, __v: 0 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
};



const GetApplicants = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id)
       .populate({
        path: "Applicants.applicantID",
        select: "photo JobTitle" 
      });
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if(req.id !== job.IdOfCompany)
        return res
        .status(403)
        .json({ msg: "Not authorized to view applications" });

    res.json(job.Applicants);
  } catch (error) {
    res.status(500).send("error ):");
    console.error(error);
  }
};





const Applications = async (req, res) => {
  try {
    if (req.id !== req.params.id)
      return res
        .status(403)
        .json({ msg: "Not authorized to view applications" });

    const AppliedJobs = await Job.find(
      { "Applicants.applicantID": req.id } ,  { nameOfJob: 1, Disc: 1, Location: 1, nameOfCompany: 1, CompanyPhoto: 1, Applicants: 1 }
       
    )

    res.status(200).json(AppliedJobs);
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
};

module.exports = { GetAllJobs, GetMyPostedJobs, Applications, GetApplicants };
