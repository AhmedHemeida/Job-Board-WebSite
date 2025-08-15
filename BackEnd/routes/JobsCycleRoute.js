const express = require ("express") ;
const router = express.Router() ;
const Applycontrol = require("../controllers/apply") ;
const PostControl = require("../controllers/PostJob") ;
const crudControl= require("../controllers/crud")
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage});
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/post-job" , authMiddleware, PostControl);

router.get("/get-postedjobs" ,authMiddleware ,crudControl.GetMyPostedJobs);

router.get("/get-alljobs" , crudControl.GetAllJobs);

router.post("/apply" , authMiddleware, upload.single('file'),  Applycontrol)

router.get("/get-applications/:id" , authMiddleware,crudControl.Applications);

router.get("/get-applicants/:id" ,authMiddleware, crudControl.GetApplicants);








module.exports=router ;