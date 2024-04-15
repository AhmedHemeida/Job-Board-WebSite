const mongoose =require("mongoose") ;
const ObjectId=mongoose.Types.ObjectId

const apply = new mongoose.Schema({


    applicantId: String ,
    jobId : {
      type :ObjectId ,
      ref  : 'job' ,

    } ,

     name: {

     type: String,
        required: true,

       } ,

       phone: {
        type: String,
        required: true,
    
           } ,
           email: {
            type: String,
            required: true,
        
               } ,

           Resume: {
            type: String,
        
               } ,

               applicantPhoto:{
                  type:String
               } ,
               applicantJobTitle :{
                  type :String
               }



   
     

    
    
}) ;



const cust = mongoose.model("applicants" ,apply) ;
module.exports = cust ;


