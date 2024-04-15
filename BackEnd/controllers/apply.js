
const Apply=require('../models/ApplyForJob')
const Job=require('../models/jobMode')
const nodemailer = require('nodemailer');
const Secret=process.env.JWT_SECRET
const jwt = require('jsonwebtoken') ;
const cloudinary = require('cloudinary').v2;
const dotenv =require("dotenv") ;
dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aelhosary787@gmail.com', 
      pass: process.env.Pass
      
    },
  });


module.exports = async (req,res)=>{

    try {


      const token = req.header("Authorization") ;
      const {  jobId,name , phone ,email }  = req.body ;
        
      let data =jwt.verify(token,Secret) ;

      if(data){


        if (!name || !phone  || !email  || !jobId ) {
          return res.status(400).json({ msg: "Required fields are missing" });
        }


        

        
      
        const form =  new Apply(

            {
                name              : name ,
                phone             : phone ,
                email             : email ,
                Resume            : 'www',  
                applicantId       : data.id ,
                applicantPhoto    : data.photo ,
                applicantJobTitle : data.JobTitle ,
                jobId             :jobId
              

            }

        ) ;
        

        await form.save() ;

        const job= await Job.findOne({_id:jobId}) ;

        job.Applicants.push(data.id) ;
        
        await job.save() ;




        const mailOptions = {
            from: 'aelhosary787@gmail.com',
            to: email,
            subject: 'Your Application for job',
            html: `
              <html>
                <body>
                  <h1>Hello!</h1>
                  <p>Your application was successfully sent.</p>
                  <p>Here's some additional information:</p>
                  <ul>
                    <li>Application ID: 12345</li>
                    <li>Submission Date: October 8 , 2023</li>
                  </ul>
                  <p>Thank you for using our service.</p>
                </body>
              </html>
            `,
          };
          
         
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email: ', error);
            } else {
              console.log('Email sent successfully: ', info.response);
            }
          });

        res.status(201).json({ msg: "apply Done.." });    }
        
    } catch (error) {
        
        res.status(500).send("errorr in server") ;
        console.log(error) ;
    }

}



