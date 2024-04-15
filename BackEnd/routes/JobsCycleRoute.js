const express = require ("express") ;
const router = express.Router() ;
const Applycontrol = require("../controllers/apply") ;
const PostControl = require("../controllers/PostJob") ;
const crudControl= require("../controllers/crud")
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage});


router.post("/post-job" , PostControl);

router.get("/get-postedjobs" , crudControl.GetMyPostedJobs);

router.get("/get-alljobs" , crudControl.GetAllJobs);

router.post("/apply" ,  upload.single('file') ,   Applycontrol)

router.get("/get-applications" , crudControl.Applications);

router.get("/get-applicants/:id" , crudControl.GetApplicants);








module.exports=router ;