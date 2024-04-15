const mongoose =require("mongoose") ;
const users = new mongoose.Schema({


  username: {
    type: String,
    required: true,

       } ,

       email: {
        type: String,
        required: true,
    
           } ,

   
      password : {
        type : String ,
        required :true  ,
      
      } ,
      photo: {
        
        type : String ,
        default:"myphoto.jpg"
      } ,

      JobTitle :{

        type : String ,
        required: true

      } ,

      IsEmployer : {
        type : Boolean ,
      } 

    
    
}) ;



const cust = mongoose.model("user" ,users) ;
module.exports = cust ;


