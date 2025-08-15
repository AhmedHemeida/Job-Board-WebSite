const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Job = new mongoose.Schema({
  IdOfCompany: {
    type: String,
    required: true,
  },

  nameOfCompany: {
    type: String,
  },

  CompanyPhoto: {
    type: String,
    default: "photo.Jpg",
  },

  nameOfJob: {
    type: String,
    required: true,
  },

  Location: {
    type: String,
    required: true,
  },

  Disc: {
    type: String,
    required: true,
  },

  Applicants: {
    type: [
      {
        applicantID: {
          type: ObjectId,
          ref: "user", 
        },
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        Resume: {
          type: String,
        },
      },
    ],
    default: [], 
  },
});

const JobModel = mongoose.model("job", Job);
module.exports = JobModel;


const cust = mongoose.model("job", Job);
module.exports = cust;
