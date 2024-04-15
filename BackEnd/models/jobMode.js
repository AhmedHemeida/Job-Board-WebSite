const mongoose =require("mongoose") ;
const ObjectId=mongoose.Types.ObjectId

const Job = new mongoose.Schema({

   IdOfCompany :{
      type: String,
      required: true,
  
         } ,

   nameOfCompany: {
      type: String,
      
  
         } ,

         CompanyPhoto: {
            type: String,
            default:"photo.Jpg"
        
               } ,

       nameOfJob: {
      type: String,
      required: true,

         } ,

       Location: {
        type: String,
        required: true,
    
           } ,

           Disc: {
            type: String,
            required: true,
        
               } ,

               Applicants :{
                type : [ObjectId] ,
                ref : 'user' ,
                default : []
               }



   
     

    
    
}) ;



const cust = mongoose.model("job" ,Job) ;
module.exports = cust ;


