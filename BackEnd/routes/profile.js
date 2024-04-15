const express = require ("express") ;
const router = express.Router() ;
const cloudinary = require('cloudinary').v2;
const Users= require ("../models/UsersModel") ;
const dotenv =require("dotenv") ;
dotenv.config();

const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage});


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});



router.get("/providers/get-profile" ,async (req,res)=>{

  try{

    const userId = req.body.userId ;
    let userData = await Provider.findById(userId) ;
    res.status(200).send(userData) ;


  }
  catch (err) {
    
    res.status(500).json({msg:'Error get profile ' ,error:err});
    console.log(err);
  }


}) ;


router.post('/upload-photo', upload.single('photo'), async (req, res) => {
 
 
 
    try {
      
     
        const token = req.header("Authorization") ;


        let data =jwt.verify(token,Secret) ;

        if(data){
      
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'providerimg' });
  
     
         await   Users.updateOne ({_id:data.id} ,{photo:result.secure_url})  ;
     
      res.status(200).json({msg:'Profile photo updated successfully'});  }


    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating profile photo');
    }
  }); 
  


 

  


  
  






  module.exports=router ;