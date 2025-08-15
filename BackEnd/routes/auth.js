const express = require ("express") ;
const router = express.Router() ;
const User =require("../models/UsersModel") ;
const Token = require("../controllers/Jwt")
const bcrypt = require ("bcrypt") ;
const dotenv =require("dotenv") ;
dotenv.config();




router.post("/signup"  , async(req,res)=> {

    try {
   let usr = await User.findOne( { email : req.body.email }).exec() ;
  if(usr) {
    return res.status(400).send("user already exist..") ;
  } 

      let salt = await bcrypt.genSalt(10) ;
         console.log("pasword" , req.body.password) ; 

     let hashedPassword = await bcrypt.hash(req.body.password , salt) ;
     usr = new User({

        username   : req.body.username ,
        email      : req.body.email   ,
        password   : hashedPassword  ,
        JobTitle   : req.body.JobTitle ,
        IsEmployer : req.body.IsEmployer

    }) ;
      await usr.save() ;

      res.status(201).json({msg:"User Regist Success.."}) ;

       

    }
    catch (err){
    res.status(500).json(err);
    console.log(err) ;
    }
}) ;




router.post("/signin" , async(req,res)=>{

    
    try {

           let usr = await User.findOne( { email : req.body.email }).exec() ; 
           if(!usr) return res.status(400).json("inValid email or password..") ;

           const validpswrd = await bcrypt.compare(req.body.password , usr.password) ;
           if(!validpswrd) return res.status(400).json("inValid email or password..") ;

        

           const token = Token.generateToken(usr) ;
           res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
            });
                          
        res.json({msg:"Loged in sucsessfully..",IsEmployer:usr.IsEmployer,username :usr.username , ID : usr._id  });
           

       
                   
     }
     catch(err){
        res.status(500).json({msg:"error Bro"});
        console.log(err) ;
    }



}) ;






module.exports=router ;