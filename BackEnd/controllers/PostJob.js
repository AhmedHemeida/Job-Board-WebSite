
const Job = require("../models/jobMode") ;

const Users = require("../models/UsersModel") ;
const Secret=process.env.JWT_SECRET
const jwt = require('jsonwebtoken') ;

module.exports =  async(req,res)=>{
   


        try {


            const { nameOfJob , loc ,Disc}  = req.body ;
            const token = req.header("Authorization") ;
        
            let data =jwt.verify(token,Secret) ;

            if(data){

            if (!nameOfJob || !loc || !Disc) return res.status(400).json({ msg: "required fields" });
          
            const job =  new Job(
    
                {
                    IdOfCompany:data.id,
                    nameOfCompany:data.username ,
                    CompanyPhoto : data.photo ,
                    nameOfJob : nameOfJob ,
                    Location : loc ,
                    Disc:Disc
    
                }
    
            ) ;
            
    
            await job.save() ;
    
            res.status(201).json({ msg: "job posted.." , jobId :job._id });   }
            
        } catch (error) {
            
            res.status(500).send("errorr in server"+error) ;
        }
    
    
    }

