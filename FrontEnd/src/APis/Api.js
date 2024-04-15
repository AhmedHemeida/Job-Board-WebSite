import axios from 'axios';


let base="https://job-9swc.onrender.com/api";


const token = localStorage.getItem('token');

const headers = {
    Authorization: `${token}`,
  };

let Login    = (data)=> axios.post( `${base}/signin`,data ) ;
let Register = (data)=> axios.post( `${base}/signup`,data ) ;


let Applications = ()=> axios.get(`${base}/signin` , {
    headers:headers 
}) ;


let AddJob =  (data)=> axios.post( `${base}/post-job`,data , {
    headers:headers
}) ;


let ApplyJob =  (data)=> axios.post( `${base}/apply`,data , {
    headers:headers ,
    
}) ;

export default   {

    Login ,
    Register ,
    Applications ,
    AddJob  ,
    ApplyJob


}
